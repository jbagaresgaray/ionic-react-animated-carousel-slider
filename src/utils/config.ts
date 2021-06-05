import { isPlatform } from "@ionic/react";

export const API_KEY = "613a1a82113b94b6ce250a9d35622219";

const width = window.innerWidth;
const height = window.innerHeight;

export const SPACING = 10;
export const ITEM_SIZE = isPlatform("ios") ? width * 0.72 : width * 0.74;
export const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
export const BACKDROP_HEIGHT = height * 0.65;