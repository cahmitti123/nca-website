import "server-only";

const PEXELS_API_BASE = "https://api.pexels.com/v1";

export type PexelsPhotoSource = {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
};

export type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  alt: string;
  src: PexelsPhotoSource;
};

export type PexelsSearchResponse = {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  next_page?: string;
};

type SearchOptions = {
  perPage?: number;
  page?: number;
  orientation?: "landscape" | "portrait" | "square";
  size?: "small" | "medium" | "large";
  /**
   * Filter by dominant color. Examples: "blue", "white", "gray" or hex like "ff0000".
   * See Pexels API docs.
   */
  color?: string;
  locale?: string;
  revalidateSeconds?: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" ? value : null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return isRecord(value) ? value : null;
}

function parsePhotoSource(value: unknown): PexelsPhotoSource | null {
  const r = asRecord(value);
  if (!r) return null;

  const original = asString(r.original);
  const large2x = asString(r.large2x);
  const large = asString(r.large);
  const medium = asString(r.medium);
  const small = asString(r.small);
  const portrait = asString(r.portrait);
  const landscape = asString(r.landscape);
  const tiny = asString(r.tiny);

  if (!original || !large2x || !large || !medium || !small || !portrait || !landscape || !tiny) {
    return null;
  }

  return { original, large2x, large, medium, small, portrait, landscape, tiny };
}

function parsePhoto(value: unknown): PexelsPhoto | null {
  const r = asRecord(value);
  if (!r) return null;

  const id = asNumber(r.id);
  const width = asNumber(r.width);
  const height = asNumber(r.height);
  const url = asString(r.url);
  const photographer = asString(r.photographer);
  const photographer_url = asString(r.photographer_url);
  const alt = asString(r.alt) ?? "";
  const src = parsePhotoSource(r.src);

  if (!id || !width || !height || !url || !photographer || !photographer_url || !src) return null;

  return { id, width, height, url, photographer, photographer_url, alt, src };
}

function parseSearchResponse(value: unknown): PexelsSearchResponse | null {
  const r = asRecord(value);
  if (!r) return null;

  const page = asNumber(r.page);
  const per_page = asNumber(r.per_page);
  const total_results = asNumber(r.total_results);
  const next_page = asString(r.next_page) ?? undefined;

  const photosRaw = r.photos;
  if (!Array.isArray(photosRaw)) return null;

  const photos: PexelsPhoto[] = [];
  for (const p of photosRaw) {
    const parsed = parsePhoto(p);
    if (parsed) photos.push(parsed);
  }

  if (!page || !per_page || !total_results) return null;

  return { page, per_page, total_results, next_page, photos };
}

function getApiKey(): string | null {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return null;
  const trimmed = key.trim();
  return trimmed.length ? trimmed : null;
}

export async function searchPexelsPhotos(
  query: string,
  {
    perPage = 1,
    page = 1,
    orientation = "landscape",
    size = "large",
    color,
    locale = "fr-FR",
    revalidateSeconds = 60 * 60 * 24 * 7,
  }: SearchOptions = {},
): Promise<PexelsSearchResponse | null> {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const url = new URL(`${PEXELS_API_BASE}/search`);
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("page", String(page));
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("size", size);
  if (color) url.searchParams.set("color", color);
  url.searchParams.set("locale", locale);

  const res = await fetch(url.toString(), {
    headers: { Authorization: apiKey },
    next: { revalidate: revalidateSeconds },
  });

  if (!res.ok) return null;
  const data: unknown = await res.json();
  return parseSearchResponse(data);
}

export async function getPexelsImageUrl(
  query: string,
  {
    orientation = "landscape",
    size = "large",
    color,
    locale = "fr-FR",
    revalidateSeconds,
  }: Pick<SearchOptions, "orientation" | "size" | "color" | "locale" | "revalidateSeconds"> = {},
): Promise<string | null> {
  const result = await searchPexelsPhotos(query, {
    perPage: 1,
    page: 1,
    orientation,
    size,
    color,
    locale,
    revalidateSeconds,
  });

  const first = result?.photos[0];
  if (!first) return null;
  return first.src.large2x ?? first.src.large;
}

export async function getPexelsImageUrls(
  query: string,
  {
    perPage = 6,
    page = 1,
    orientation = "landscape",
    size = "large",
    color,
    locale = "fr-FR",
    revalidateSeconds,
  }: SearchOptions = {},
): Promise<string[]> {
  const result = await searchPexelsPhotos(query, {
    perPage,
    page,
    orientation,
    size,
    color,
    locale,
    revalidateSeconds,
  });

  const urls = (result?.photos ?? [])
    .map((p) => p.src.large2x ?? p.src.large)
    .filter((u): u is string => typeof u === "string" && u.length > 0);

  return urls;
}


