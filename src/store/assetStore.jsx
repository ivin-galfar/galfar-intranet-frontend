import { create } from "zustand";

const useToggleAsset = create((set) => ({
  Asset: false,
  toggleasset: () => set(() => ({ Asset: true })),
  resetasset: () => set(() => ({ Asset: false })),
}));

export default useToggleAsset;
