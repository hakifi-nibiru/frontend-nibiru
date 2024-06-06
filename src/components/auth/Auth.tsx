"use client";

import { getAuthUser } from '@/apis/users.api';
import useUserSocket from '@/hooks/useUserSocket';
import useAppStore from '@/stores/app.store';
import useWalletStore from '@/stores/wallet.store';
import useWallet from '@/hooks/useWallet';
import { useEffect } from 'react';
import useLogin from '@/hooks/useLogin';
import useLogout from '@/hooks/useLogout';
import SignModal from './SignModal';

const Auth = () => {
  const { isOpenConnectWallet } = useAppStore((state) => state);
  const { address } = useWallet()
  const [wallet, setWallet, isLogging, setAccessToken, setIsLogging, reset] =
    useWalletStore((state) => [
      state.wallet,
      state.setWallet,
      state.isLogging,
      state.setAccessToken,
      state.setIsLogging,
      state.reset
    ]);

  // useWatchChain();
  useUserSocket();
  const { login } = useLogin();
  const logout = useLogout()

  useEffect(() => {
    if (isLogging || !address || isOpenConnectWallet) return;

    const fetchWallet = async () => {
      try {
        const wallet = await getAuthUser();
        if (wallet.user.walletAddress === address) {
          setAccessToken(wallet.accessToken);
          setWallet(wallet.user);
        } else {
          await logout()
          throw new Error('wallet is not same address');
        }
      } catch (error) {
        console.error('getAuthWallet Failed', error);
        await login()
      }
    };

    if (address && wallet?.walletAddress !== address) {
      login();
    } else {
      fetchWallet();
    }

  }, [wallet?.walletAddress, isLogging, address]);

  return <>
    <SignModal
      isOpen={isLogging}
      onRequestClose={() => setIsLogging(false)}
    />
  </>;
};

export default Auth;
