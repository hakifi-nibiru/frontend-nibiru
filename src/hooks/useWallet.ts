import { CHAIN_NAME } from "@/web3/constants";
import { useChain } from "@cosmos-kit/react";

const useWallet = () => {
  const { address, isWalletConnected, disconnect } = useChain(CHAIN_NAME);

  return {
    address,
    connected: isWalletConnected,
    disconnect,
  };
};

export default useWallet;
