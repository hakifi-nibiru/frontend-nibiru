"use client";

import { Notifications } from "@/components/common/Notification";
import { NibijsContextProvider } from "@/context/NibiruJS";
// import { ThemeProvider } from "next-themes";

import { ChainProvider } from '@cosmos-kit/react';
import { chains, assets } from 'chain-registry/mainnet';
import { wallets as leapWallets } from '@cosmos-kit/leap-extension';
import { wallets as keplrWallet } from '@cosmos-kit/keplr-extension';

import dynamic from "next/dynamic";
import React from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ProgressBar = dynamic(
  () => import("next-nprogress-bar").then((result) => result.AppProgressBar),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode; }) {
  return (
    // Uncomment khi làm light and dark mode
    // <ThemeProvider attribute="class">

    <Notifications>
      <ProgressBar
        height="2px"
        color="#F37B23"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <ChainProvider
        chains={chains} // supported chains
        assetLists={assets} // supported asset lists
        wallets={[...leapWallets, ...keplrWallet]} // supported wallets
      >
        <NibijsContextProvider>
          {children}
        </NibijsContextProvider>
      </ChainProvider>

    </Notifications>
    // </ThemeProvider>
  );
}
