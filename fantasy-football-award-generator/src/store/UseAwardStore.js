import { create } from "zustand";

export const useAwardStore = create((set) => ({
  leagueName: "Fantasy Football League",
  teamName: "",
  coachName: "",
  description: "",
  year: new Date().getFullYear(),
  awardName: "",
  leagueLogo: null,
  leagueLogoFilename: "",
  awardLogo: null,
  awardLogoFilename: "",

  // setField supports legacy leftLogo/rightLogo keys by mapping them to leagueLogo
  setField: (field, value) =>
    set((state) => {
      if (field === "leftLogo" || field === "rightLogo") {
        return { ...state, leagueLogo: value };
      }
      if (field === "leftLogoFilename" || field === "rightLogoFilename") {
        return { ...state, leagueLogoFilename: value };
      }
      if (field === "leagueLogo") {
        // allow directly setting URL or null
        return { ...state, leagueLogo: value };
      }
      if (field === "leagueLogoFilename") {
        return { ...state, leagueLogoFilename: value };
      }
      if (field === "awardLogo") {
        return { ...state, awardLogo: value };
      }
      if (field === "awardLogoFilename") {
        return { ...state, awardLogoFilename: value };
      }
      return { ...state, [field]: value };
    }),
}));