import { widget } from '@/public/assets/tradingview/charting_library';
import { Window as KeplrWindow } from "@keplr-wallet/types";
export { };

declare global {
  interface Window {
    BinanceChain?: any; // 👈️ turn off type checking
    coin98?: any;
    trustwallet?: any;
    tvWidget?: widget;
    KeplrWallet: KeplrWindow;
  }
}
