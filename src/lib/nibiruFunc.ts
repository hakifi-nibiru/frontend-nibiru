export const signMessage = async (
    chainId: string,
    address: string,
    value: string,
) => {
    const anyWindow: any = window;

    if (!anyWindow.getOfflineSigner) {
        throw new Error('Keplr extension is not available');
    }
    
    const signed = await window.keplr?.signArbitrary(
        chainId,
        address,
       value,
    );

    return signed;
};