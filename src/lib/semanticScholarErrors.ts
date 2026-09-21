import { SemanticScholarError } from "./apicall";

export function handleSemanticScholarError(error: unknown): Response {
  if (error instanceof SemanticScholarError) {
    console.error("Semantic Scholar request failed:", {
      url: error.url,
      status: error.status,
      error: error.message,
    });

    const messages: Record<number, string> = {
      400: "The search request is invalid.",
      401: "The API key is invalid.",
      403: "Access to the API is forbidden.",
      404: "The requested resource was not found.",
      429: "Traffic is heavy. Try again in one second.",
      500: "Semantic Scholar is experiencing technical difficulties.",
      503: "Semantic Scholar is temporarily unavailable.",
    };

    return Response.json(
      { error: messages[error.status] ?? "Unable to complete the search right now." },
      {
        status: error.status >= 400 && error.status < 600 ? error.status : 500,
        ...(error.status === 429
          ? { headers: { "Retry-After": "1" } }
          : {}),
      }
    );
  }

  console.error("Unexpected Semantic Scholar error:", error);

  return Response.json(
    { error: "Unable to complete the search right now." },
    { status: 500 }
  );
}