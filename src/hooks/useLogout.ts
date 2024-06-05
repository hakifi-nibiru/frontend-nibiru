import { logout as logoutApi } from "@/apis/auth.api";
import useWalletStore from "@/stores/wallet.store";
import { CHAIN_NAME } from "@/web3/constants";
import { useChain } from "@cosmos-kit/react";

const useLogout = () => {
  const { disconnect } = useChain(CHAIN_NAME);
  const reset = useWalletStore((state) => state.reset);

  const logout = async () => {
    try {
      await disconnect();
      reset();
      await logoutApi();
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };
  return logout;
};

export default useLogout;
