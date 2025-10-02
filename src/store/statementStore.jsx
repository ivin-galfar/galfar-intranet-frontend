import { create } from "zustand";

export const useStatementupdated = create((set) => ({
  showupdated: false,
  setshowupdated: () => set(() => ({ showupdated: true })),
  resetshowupdated: () => set(() => ({ showupdated: false })),
}));

export const useDeleteStatement = create((set) => ({
  deleted: false,
  setDeleted: () => set(() => ({ deleted: true })),
  resetDeleted: () => set(() => ({ deleted: false })),
}));

export const useClearStatementTable = create((set) => ({
  cleartable: false,
  setClearTable: () => set(() => ({ cleartable: true })),
  resetCleartable: () => set(() => ({ cleartable: false })),
}));

export const useUpdateQuantity = create((set) => ({
  quantity: 0,
  setQuantity: (newquantity) => set(() => ({ quantity: newquantity })),
}));

export const useSortVendors = create((set) => ({
  sortvendors: false,
  setSortVendors: () => set(() => ({ sortvendors: true })),
  resetSortVendors: () => set(() => ({ sortvendors: false })),
}));
