import { create } from "zustand";

const toggleNewUser = create((set) => ({
  newuser: false,
  setNewuser: () => set((state) => ({ newuser: !state.newuser })),
}));

export default toggleNewUser;
