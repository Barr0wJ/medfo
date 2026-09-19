export type SemanticScholarAuthor = {
  name?: string;
};

export type SemanticScholarPaperResult = {
  paperId: string | null;
  title: string | null;
  year: number | null;
  venue: string | null;
  abstract: string | null;
  url: string | null;
  authors: string[];
  externalIds: Record<string, string> | null;
};

export type SemanticScholarSearchResponse = {
  query: string;
  total: number;
  results: SemanticScholarPaperResult[];
};

export async function searchSemanticScholar(
  query: string,
  limit = 10
): Promise<SemanticScholarSearchResponse> {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    throw new Error("Query parameter 'q' is required");
  }

  const safeLimit = Math.max(1, Math.min(Number(limit) || 10, 20));
  const url = new URL("https://api.semanticscholar.org/graph/v1/paper/search");
  url.searchParams.set("query", cleanQuery);
  url.searchParams.set("limit", String(safeLimit));
  url.searchParams.set(
    "fields",
    "paperId,title,abstract,year,authors,venue,url,externalIds"
  );

  const apiKey = "s2k-Cr3USDO3GiH2ylL4myQHzgVkWnWThhjXit9lFFZ9";//process.env.APIKEY;
  const response = await fetch(url.toString(), {
    headers: {
      ...(apiKey ? { "x-api-key": apiKey } : {}),
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Semantic Scholar request failed (${response.status}): ${details}`);
  }

  const data = await response.json();
  const results = (data.data ?? []).map((paper: any) => ({
    paperId: paper.paperId ?? null,
    title: paper.title ?? null,
    year: paper.year ?? null,
    venue: paper.venue ?? null,
    abstract: paper.abstract ?? null,
    url: paper.url ?? null,
    authors: (paper.authors ?? []).map((author: SemanticScholarAuthor) => author.name ?? "Unknown author"),
    externalIds: paper.externalIds ?? null,
  }));

  return {
    query: cleanQuery,
    total: typeof data.total === "number" ? data.total : results.length,
    results,
  };
}