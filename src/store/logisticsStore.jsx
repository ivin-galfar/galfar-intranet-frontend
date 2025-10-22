import { create } from "zustand";

export const useParticular = create((set) => ({
  particular: "",
  setParticular: (selectedparticular) =>
    set({ particular: selectedparticular }),
}));

export const useNewStatement = create((set) => ({
  newstatement: false,
  setNewStatement: () => set(() => ({ newstatement: true })),
  resetnewStatement: () => set(() => ({ newstatement: false })),
}));

export const useAllParticulars = create((set) => ({
  particulars: [],
  setParticulars: (fetchedparticulars) =>
    set(() => ({ particulars: fetchedparticulars })),
}));

export const useParticularValues = create((set) => ({
  particularvalue: [],
  setParticularValue: (response) => set(() => ({ particularvalue: response })),
}));

export const useStatement = create((set) => ({
  formData: {
    cargo_details: "",
    gross_weight: "",
    chargeable_weight: "",
    description: "",
    supplier: "",
    scopeofwork: "",
    mode: "",
    date: "",
    po: "",
    project: "",
  },
  tableData: [],

  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),

  // setTableData: (data) => set({ tableData: data }),
  setTableData: (updater) =>
    set((state) => ({
      tableData:
        typeof updater === "function" ? updater(state.tableData) : updater,
    })),
  reset: () =>
    set({
      formData: {
        cargo_details: "",
        gross_weight: "",
        chargeable_weight: "",
        description: "",
        supplier: "",
        scopeofwork: "",
        mode: "",
        date: "",
        po: "",
        project: "",
      },
      tableData: [],
    }),
}));
