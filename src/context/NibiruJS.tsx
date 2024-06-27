import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import {
    Testnet,
    Mainnet,
    NibiruQuerier,
    CustomChain
} from "@nibiruchain/nibijs";

export type NibiruContextType = {
    querier: NibiruQuerier | null,
    chain: CustomChain
};

const NibijsContext = createContext<NibiruContextType | null>(null);

const NibijsContextProvider = ({ children }: { children: ReactNode; }) => {
    const [querier, setQuerier] = useState<NibiruQuerier | null>(null);
    const chain = useMemo(() => Mainnet(), []);

    useEffect(() => {
        const initQuerier = async () => {
            const chain = Mainnet();
            const querier = await NibiruQuerier.connect(chain.endptTm);
            setQuerier(querier);
        }
        initQuerier()
    }, []);

    return (
        <NibijsContext.Provider
            value={{
                querier,
                chain
            }}
        >
            {children}
        </NibijsContext.Provider>
    );
};

export { NibijsContext, NibijsContextProvider };
