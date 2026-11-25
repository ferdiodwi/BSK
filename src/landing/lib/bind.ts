export function bind(obj: unknown, path: string, fallback = ""): string {
  if (!obj || typeof obj !== "object") return fallback;
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return fallback;
    }
  }
  return typeof current === "string" || typeof current === "number" ? String(current) : fallback;
}
