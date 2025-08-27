import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * CSSクラス名をマージする
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
