import th from "./dict/th";
import en from "./dict/en";
import workshopTH from "./dict/workshop/th";
import workshopEN from "./dict/workshop/en";

export const getDict = (lang: "th" | "en") => (lang === "th" ? th : en);
export const getWorkshopDict = (lang: "th" | "en") => (lang === "th" ? workshopTH : workshopEN);

export type TDict = ReturnType<typeof getDict>;
export type TWorkshopDict = ReturnType<typeof getWorkshopDict>;
