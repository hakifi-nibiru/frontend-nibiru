"use client";

import { useIsTablet } from '@/hooks/useMediaQuery';
import useAppStore from '@/stores/app.store';
// import Profile from './Profile';
// import { SuiWallets } from '@/components/ConnectWalletModal/SuiWallets';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { CosmosWallets } from '@/components/ConnectWalletModal/CosmosWallets';
// import useWallet from '@/hooks/useWallet';
import { cn } from '@/utils';
import { forwardRef } from 'react';
import Profile from './Profile';
import useWallet from '@/hooks/useWallet';

type ConnectWalletProps = {
    className?: string;
    onClick?: () => void;
};

const ConnectWallet = forwardRef<HTMLButtonElement, ConnectWalletProps>(({
    className,
    onClick,
}, forwardRef) => {
    const isTablet = useIsTablet();
    const { connected } = useWallet();
    
    const { isOpenConnectWallet, toggleConnectWalletModal } = useAppStore();
    const handleCloseModal = () => toggleConnectWalletModal(!isOpenConnectWallet);

    if (connected) {
        return <Profile />;
    }

    const handleToggleConnectModal = () => {
        toggleConnectWalletModal(true);
        onClick?.();
    };

    if (isTablet) {
        return <>
            <Button
                ref={forwardRef}
                size="lg"
                onClick={handleCloseModal}
                variant="primary"
                className={cn('px-6 py-2', className)}
            >
                Connect Wallet
            </Button>
            <Modal
                isOpen={isOpenConnectWallet}
                onRequestClose={handleCloseModal}
                isMobileFullHeight
                useDrawer={false}
                modal={true}
            // contentClassName="px-4"
            >
                <section className="">
                    {/* <Wallets closeModal={handleCloseModal} /> */}
                    {/* <SuiWallets closeModal={handleCloseModal} /> */}
                    <CosmosWallets closeModal={handleCloseModal} />
                </section>
            </Modal>
        </>;
    }

    return (
        <>
            <Button
                size="lg"
                onClick={handleToggleConnectModal}
                variant="primary"
                className={cn('px-6 py-2', className)}
            >
                Connect Wallet
            </Button>
        </>
    );
});

export default ConnectWallet;
