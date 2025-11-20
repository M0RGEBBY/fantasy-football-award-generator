import { create } from "zustand";

export const useAwardStore = create((set) => ({
  leagueName: "Fantasy Football League",
  teamName: "",
  coachName: "",
  description: "",
  year: new Date().getFullYear(),
  awardName: "",
  leftLogo: null,
  rightLogo: null,
  awardLogo: null,

  setField: (field, value) => set({ [field]: value }),
}));