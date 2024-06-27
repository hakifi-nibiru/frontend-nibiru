import { useNotification } from '@/components/common/Notification';
import { NibijsContext, NibiruContextType } from '@/context/NibiruJS';
import useBalance from '@/hooks/useBalance';
import { CHAIN_NAME, NIBIRU_HUSD_ADDRESS } from '@/web3/constants';
import { useChain } from '@cosmos-kit/react';
import { NibiruTxClient } from '@nibiruchain/nibijs';
import { useContext } from 'react';
const useFaucet = () => {
    const { chain, querier } = useContext(NibijsContext) as NibiruContextType;
    const { balance, refetch } = useBalance(NIBIRU_HUSD_ADDRESS);
    const { balance: nibiBalance } = useBalance();
    const { getOfflineSigner, address } = useChain(CHAIN_NAME);
    const notification = useNotification();
    const contractAddress = NIBIRU_HUSD_ADDRESS;
    const msg = { mint: { recipient: address, amount: "1000000000" } };

    const faucet = async () => {

        if (!address || !querier) {
            notification.error("Address is not valid");
            return null;
        }

        try {
            // let approve;
            const offlineSigner = getOfflineSigner();

            const txClient = await NibiruTxClient.connectWithSigner(
                chain.endptTm,
                offlineSigner
            );
            const result = await txClient.wasmClient.execute(
                address,
                contractAddress,
                msg,
                {
                    amount: [{
                        denom: "unibi",
                        amount: "50000",
                    }],
                    gas: "2000000",
                },
                undefined, []);


            if (!result || !result.transactionHash) {
                return;
            }
            notification.success("Faucet successfully!");
            refetch();
        } catch (error) {
            console.log(error)
            notification.error("You have faucet already or your action is invalid, please try again later");
        }
    };

    return { faucet };
};

export default useFaucet;