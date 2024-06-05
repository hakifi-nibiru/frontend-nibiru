import { cn } from "@/utils";
import { Loader2 } from "lucide-react";
import Button from "../common/Button";
import Image from "next/image";
import useLogin from "@/hooks/useLogin";
import useWalletStore from "@/stores/wallet.store";

type WalletsProps = {
    closeModal: () => void;
};


export function CosmosWallets({ closeModal }: WalletsProps) {
    const { login, isLogging } = useLogin()
    const { } = useWalletStore(state => state.isLogging)
    const isInstallLeap = (() => !!window.leap);

    const handleConnect = async () => {
        if (isInstallLeap()) {
            console.log("Onclick connect wallet");
            // connectWallet();
            // window.keplr.enable("nibiru-testnet-1")
            await login();
            closeModal();
        } else {
            window.open(new URL("https://chromewebstore.google.com/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en"), "_blank");
        }
    };


    return (
        <div className={cn("flex flex-col gap-y-5 p-0 w-full duration-300 ease-linear mt-5", isLogging && "items-center")}>
            {
                isLogging && <Loader2 className="my-4 animate-spin text-typo-primary h-[98px]" />
            }
            {!isLogging &&
                <Button

                    size="md"
                    point={false}
                    variant="outline"
                    customHeight={true}
                    className={cn(
                        "p-3 justify-between text-typo-primary hover:text-typo-accent bg-support-black border border-divider-secondary",
                        // !disabled ? "hover:bg-background-secondary hover:text-typo-accent hover:border-divider-primary" : "",
                        // className
                    )}
                    // disabled={!wallet.installed}
                    onClick={handleConnect}
                >
                    <div className="flex items-center gap-2">
                        <Image
                            width={32}
                            height={32}
                            src="/assets/images/leap.png"
                            alt="leap"
                            className="size-6"
                        />
                        <div className="text-body-16">Leap</div>
                    </div>

                    {!isInstallLeap() && <p className="text-body-14">Install</p>}
                </Button>
            }
        </div >
    );
}





