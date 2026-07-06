const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";
const SERVER_ORIGIN = API_URL.replace(/\/api\/?$/, "");

export function resolveImageUrl(imagePath: string | null): string | null {
  if (!imagePath) return null;
  return `${SERVER_ORIGIN}/uploads/${imagePath}`;
}
