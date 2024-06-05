import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Store = {
  balances: Record<string, number>;
  setBalance: (tokenAdress: string, balance: number) => void;
};

const useBalanceStore = create<Store>()(
  immer((set) => ({
    balances: {},
    setBalance: (tokenAdress: string, balance: number) => {
      set((state) => {
        state.balances[tokenAdress] = balance;
      });
    },
  }))
);

export default useBalanceStore;
