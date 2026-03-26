const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || "";

interface FetchOptions {
  path: string;
  query?: Record<string, string>;
}

function buildStrapiUrl({ path, query }: FetchOptions): string {
  const url = new URL(`/api${path}`, STRAPI_URL);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  return url.toString();
}

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
  }
  return headers;
}

export async function fetchFromStrapi<T>(options: FetchOptions): Promise<T> {
  const url = buildStrapiUrl(options);
  const response = await fetch(url, {
    headers: buildHeaders(),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(
      `Strapi API error: ${response.status} ${response.statusText} for ${url}`
    );
  }

  return response.json();
}

export function strapiImageUrl(imageUrl: string | undefined | null): string {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${STRAPI_URL}${imageUrl}`;
}
