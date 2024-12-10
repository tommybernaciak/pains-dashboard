import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PAINS_URL = "https://slowingpains.com/";
export const BUY_NFTS_URL = "https://www.jpg.store/collection/growingpains";
export const API_URL = "http://localhost:3000";
