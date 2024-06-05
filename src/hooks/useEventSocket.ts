import useSocketStore from "@/stores/socket.store";
import { useEffect } from "react";
import useWallet from "./useWallet";

const useEventSocket = (
    event: string,
    callback: (data: any) => void,
) => {
    const { connected } = useWallet();
    const { socket, isSocketConnected } = useSocketStore();

    useEffect(() => {
        if (!connected) {
            return;
        }
        if (!isSocketConnected && !connected) {
            console.log("Log out disconnect");
            socket?.disconnect();
        }

        socket?.subscribe(event, callback);
        return () => {
            socket?.unsubscribe(event, callback);
        };
    }, [callback, connected, isSocketConnected]);
};

export default useEventSocket;