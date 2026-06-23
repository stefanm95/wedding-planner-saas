export function createSlug(title: string, existingSlugs: string[]) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "event";

  let candidate = base;
  let index = 2;

  while (existingSlugs.includes(candidate)) {
    candidate = `${base}-${index}`;
    index += 1;
  }

  return candidate;
}
