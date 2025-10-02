import { create } from "zustand";

const useToggleAsset = create((set) => ({
  Asset: false,
  toggleasset: () => set((state) => ({ Asset: !state.Asset })),
  resetasset: () => set(() => ({ Asset: false })),
}));

export default useToggleAsset;
