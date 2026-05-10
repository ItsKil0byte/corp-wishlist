import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Нагло скопировано из интернета

export function getContrastColor(hexColor) {
  if (!hexColor) return "text-gray-900"; // Цвет по умолчанию

  const hex = hexColor.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "text-gray-900" : "text-white";
}

export function getBorderColor(hexColor, percentage = 20) {
  if (!hexColor) return "border-gray-200"; // Цвет по умолчанию

  const hex = hexColor.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const factor = (100 - percentage) / 100;

  const newR = Math.round(r * factor);
  const newG = Math.round(g * factor);
  const newB = Math.round(b * factor);

  const newHex = (n) => n.toString(16).padStart(2, "0");

  return `#${newHex(newR)}${newHex(newG)}${newHex(newB)}`;
}
