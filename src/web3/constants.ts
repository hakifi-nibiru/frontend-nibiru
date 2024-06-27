import { Mainnet } from "@nibiruchain/nibijs";

export const VNST_ADDRESS: string = process.env
  .NEXT_PUBLIC_VNST_ADDRESS as string;

export const USDT_ADDRESS: string = process.env
  .NEXT_PUBLIC_USDT_ADDRESS as string;

export const USDT_NIBIRU_ADDRESS: string = process.env
  .NEXT_PUBLIC_USDT_NIBIRU_ADDRESS as string;

export const INSURANCE_ADDRESS: string = process.env
  .NEXT_PUBLIC_INSURANCE_ADDRESS as string;

export const INSURANCE_NIBIRU_ADDRESS: string = process.env
  .NEXT_PUBLIC_INSURANCE_NIBIRU_ADDRESS as string;

export const NIBIRU_HUSD_ADDRESS: string = process.env
  .NEXT_PUBLIC_NIBIRU_HUSD_ADDRESS as string;

export const INSURANCE_STRUCTURED_ADDRESS: string = process.env
  .NEXT_PUBLIC_INSURANCE_STRUCTURED_ADDRESS as string;

export const SCILABS_ADDRESS: string = process.env
  .NEXT_PUBLIC_SCI_FUND_ADDRESS as string;
export const isMainnet = process.env.NEXT_PUBLIC_IS_MAINNET === "true";

export const RATE_DECIMAL = 6;

export const VNST_DECIMAL = 18;

export const DISABLED_AUTO_CONNECT_KEY = "disabled_auto_connect";

export const CHAIN_NAME = "nibiru";
