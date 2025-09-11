import th from "./dict/th";
import en from "./dict/en";

export const getDict = (lang: "th" | "en") => (lang === "th" ? th : en);
