import { PairDetail } from "@/@type/pair.type";
import { createInsurance, saveInsuranceTxHashApi } from "@/apis/insurance.api";
import { NibijsContext, NibiruContextType } from "@/context/NibiruJS";
import useBalance from "@/hooks/useBalance";
import useBuyCoverStore from "@/stores/buy-cover.store";
import {
  CHAIN_NAME,
  INSURANCE_NIBIRU_ADDRESS,
  USDT_NIBIRU_ADDRESS,
} from "@/web3/constants";
import { useChain } from "@cosmos-kit/react";
import { NibiruTxClient } from "@nibiruchain/nibijs";
import { useCallback, useContext, useState } from "react";

type BuyCoverDto = {
  p_claim: number;
  q_covered: number;
  period: number;
  margin: number;
  periodUnit: string;
};

const useBuyCover = (
  pair: PairDetail
): {
  // handleOnConfirmBuyCover: (params: ConfirmBuyCover) => Promise<void>,
  buyCover: (params: BuyCoverDto) => Promise<void | null>;
} => {
  const { chain, querier } = useContext(NibijsContext) as NibiruContextType;
  const { balance, refetch } = useBalance(USDT_NIBIRU_ADDRESS);
  const { balance: nibiBalance } = useBalance();
  const { getOfflineSigner, address } = useChain(CHAIN_NAME);
  const updateParams = useBuyCoverStore((state) => state.updateParams);

  const setIsConfirming = (isConfirming: boolean) =>
    updateParams({ isConfirming });

  const buyCover = useCallback(
    async (params: BuyCoverDto) => {
      const decimal = 10 ** 6;
      if (!address || !querier) {
        return null;
      }

      const data = {
        asset: pair.asset,
        unit: pair.unit,
        margin: params.margin,
        period: params.period,
        periodUnit: params.periodUnit,
        p_claim: params.p_claim,
        q_covered: params.q_covered,
      };

      let insuranceId = "";
      try {
        if (nibiBalance === 0) {
          throw new Error("Insufficient Nibi balance");
        }

        // let approve;
        const offlineSigner = getOfflineSigner();

        const txClient = await NibiruTxClient.connectWithSigner(
          chain.endptTm,
          offlineSigner
        );

        // pre approve
        const msgPreApprove = {
          allowance: {
            owner: address,
            spender: INSURANCE_NIBIRU_ADDRESS,
          },
        };
        const isApprove = await querier.wasmClient.queryContractSmart(
          USDT_NIBIRU_ADDRESS,
          msgPreApprove
        );
        const needApprove = isApprove.allowance < data.margin;

        if (needApprove) {
          setIsConfirming(true);
          // approve token
          const msgApprove = {
            increase_allowance: {
              spender: INSURANCE_NIBIRU_ADDRESS,
              // amount: data.margin * decimal - isApprove.allowance + "",
              amount: (balance * decimal).toFixed(0),
            },
          };

          const approve = await txClient.wasmClient.execute(
            address,
            USDT_NIBIRU_ADDRESS,
            msgApprove,
            {
              amount: [
                {
                  denom: "unibi",
                  amount: "5000",
                },
              ],
              gas: "1000000",
            }
          );
          setIsConfirming(false);

          if (!approve || !approve.transactionHash) {
            return;
          }
        }

        const insurance = await createInsurance(data);

        // setting data
        const msgCreateInsurance = {
          create_insurance: {
            id_insurance: insurance.id,
            margin: (data.margin * decimal).toString(),
          },
        };

        setIsConfirming(true);

        // create contract
        const result = await txClient.wasmClient.execute(
          address,
          INSURANCE_NIBIRU_ADDRESS,
          msgCreateInsurance,
          {
            amount: [
              {
                denom: "unibi",
                amount: "5000",
              },
            ],
            gas: "1000000",
          }
        );

        console.log("executeMoveCall success", result);

        insuranceId = insurance.id;

        // Signed
        if (result) {
          // Save tx hash
          saveInsuranceTxHashApi(insuranceId, result.transactionHash);

          // usdtBalance.refetch();
          refetch();
          // if (status === "reverted") {
          //   throw new Error("Your trasaction is reverted");
          // }
        }
        setIsConfirming(false);
      } catch (error: any) {
        console.log(
          { error },
          error instanceof Error,
          error.message,
          typeof error
        );
        setIsConfirming(false);

        let reason = "";
        // if (error instanceof TransactionExecutionError) {
        //   if (error.cause instanceof UserRejectedRequestError) {

        //     await deleteInsuranceApi(insuranceId);

        //     reason = 'user_rejected_error';
        //   }
        //   // else if (error.cause instanceof ChainMismatchError) {
        //   //   reason = 'chain_miss_match';
        //   // }
        // } else if (error instanceof ContractFunctionExecutionError) {
        //   if (error.cause instanceof ContractFunctionRevertedError) {
        //     if (error.cause.reason === 'ERC20: insufficient allowance')
        //       reason = 'insufficient_allowance';
        //     else if (error.cause.reason) reason = error.cause.reason;
        //   }
        // } else if (error.response.data.message === "INVALID_PERIOD") {
        //   reason = "invalid_period";
        // } else
        if (error instanceof Error) {
          reason = error.message;
        } else {
          reason = "internal_server_error";
        }
        throw new Error(reason);
      }
    },
    [balance, pair.asset, pair.unit, nibiBalance]
  );

  return {
    // handleOnConfirmBuyCover,
    buyCover,
  };
};

export default useBuyCover;
