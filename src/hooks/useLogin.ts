import { getNonce, login as loginApi } from "@/apis/auth.api";
import { useNotification } from "@/components/common/Notification";
import useWalletStore from "@/stores/wallet.store";
import { CHAIN_NAME } from "@/web3/constants";
import { useChain, useChainWallet, useWallet } from "@cosmos-kit/react";
import { useCallback } from "react";
import useLogout from "./useLogout";

const getSignMessage = (nonce: string) => {
  return `Please sign this message to verify your address. Nonce: ${nonce}`;
};

const useLogin = () => {
  const notification = useNotification();

  const [wallet, setWallet, isLogging, setAccessToken, setIsLogging, reset] =
    useWalletStore((state) => [
      state.wallet,
      state.setWallet,
      state.isLogging,
      state.setAccessToken,
      state.setIsLogging,
      state.reset,
    ]);

  const {
    connect,
    address,
    isWalletConnected,
    disconnect,
    signArbitrary,
    getAccount,
  } = useChainWallet(CHAIN_NAME, "leap-extension");

  const logout = useLogout()

  const login = async () => {
    setIsLogging(true);
    let addr = address;
    if (!address || !isWalletConnected) {
      // @ts-ignore
      await connect();
      const account = await getAccount();
      addr = account.address;
    }

    if (!addr) {
      setIsLogging(false);
      return;
    }

    try {
      const nonce = await getNonce(addr);
      const result = await signArbitrary(addr, getSignMessage(nonce));

      const data = await loginApi({
        walletAddress: addr,
        signature: result?.signature,
        publicKey: result?.pub_key.value,
      });
      setWallet(data.user);
      setAccessToken(data.accessToken);
    } catch (error) {
      console.error("Login error: ", error);
      await logout();
      reset();
      let message = "common:connect_error.default";
      if (error instanceof Error) {
        message = error.message;
      }
      notification.error(message);
      console.error("Connect error: ", error);
    } finally {
      setIsLogging(false);
    }
  };

  return {
    login,
    address,
    isWalletConnected,
    isLogging,
    wallet,
  };
};

export default useLogin;
