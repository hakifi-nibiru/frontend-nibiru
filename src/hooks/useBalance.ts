import { NibijsContext, NibiruContextType } from "@/context/NibiruJS";

import { useContext, useEffect, useState } from "react";
import useWallet from "./useWallet";
import useBalanceStore from "@/stores/balance.store";

const MAIN_TOKEN = "unibi";
const DECIMALS = 10 ** 6;

const useBalance = (contractAddress: string = MAIN_TOKEN) => {
  const [balance, setBalance] = useBalanceStore((state) => [
    state.balances[contractAddress] || 0,
    state.setBalance,
  ]);
  const { address } = useWallet();
  const { querier } = useContext(NibijsContext) as NibiruContextType;

  useEffect(() => {
    if (!!querier && !!address) {
      fetchBalance();
    }
  }, [querier, address]);

  const fetchBalance = async () => {
    if (!querier || !address) return;
    try {
      if (contractAddress === MAIN_TOKEN) {
        const nibi = await querier.wasmClient.getBalance(address, MAIN_TOKEN);
        setBalance(contractAddress, +nibi.amount / 10 ** 6);
      } else {
        const queryCw20 = { balance: { address } };

        const response = await querier.wasmClient.queryContractSmart(
          contractAddress,
          queryCw20
        );

        setBalance(contractAddress, +response.balance / DECIMALS);
      }
    } catch (error) {
      console.error("Failed to fetch balance", error);
    }
  };

  return { balance, refetch: fetchBalance };
};

export default useBalance;
