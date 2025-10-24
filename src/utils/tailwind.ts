import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @description 클래스 병합
 * @param {ClassValue[]} inputs - 클래스 값
 * @returns {string} 병합된 클래스
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @description 서버 여부 확인
 * @returns {boolean} 서버 여부
 */
export function isServer() {
  return typeof window === "undefined";
}
