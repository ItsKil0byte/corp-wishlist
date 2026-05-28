import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Объединяет классы Tailwind CSS
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Форматирует дату в формат "d MMMM yyyy" на русском языке
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Удаляет HTML-теги из строки и обрезает её до указанного лимита
 * @param {string} html
 * @param {number} [limit]
 * @returns {string}
 */
export function stripHtml(html, limit) {
  if (!html) return "";
  const text = html.replace(/<[^>]*>/g, "");
  if (limit && text.length > limit) {
    return text.substring(0, limit).trim() + "...";
  }
  return text.trim();
}
