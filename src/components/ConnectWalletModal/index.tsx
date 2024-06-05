"use client";

import { useIsTablet } from '@/hooks/useMediaQuery';
import useAppStore from '@/stores/app.store';
import Modal from '../common/Modal';
import { CosmosWallets } from './CosmosWallets';
import { Dispatch } from 'react';
import { WalletRepo } from '@cosmos-kit/core';
import Image from 'next/image';
import Button from '../common/Button';
import { cn } from '@/utils';

export interface WalletModalProps {
  isOpen?: boolean;
  setOpen?: Dispatch<boolean>;
  walletRepo?: WalletRepo;
}
export const ConnectWalletModal = () => {
  const { isOpenConnectWallet, toggleConnectWalletModal } = useAppStore((state) => state);
  const handleCloseModal = () => {
    toggleConnectWalletModal(false);
  };
  const isTablet = useIsTablet();
  if (!isTablet) return (
    <>
      <Modal
        isOpen={isOpenConnectWallet}
        isMobileFullHeight
        modal={true}
        onRequestClose={handleCloseModal}
        className="text-title-24 text-typo-primary"
        descriptionClassName="!min-h-0"
      >
        <>
          <p className="text-title-24 text-typo-primary text-center">Connect Wallet</p>
          <CosmosWallets closeModal={handleCloseModal} />
        </>
      </Modal>
    </>
  );

};

export default ConnectWalletModal;
