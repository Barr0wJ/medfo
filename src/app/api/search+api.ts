import { searchSemanticScholar } from "../../lib/apicall";
import { handleSemanticScholarError } from "../../lib/semanticScholarErrors";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const limit = Number(searchParams.get("limit") ?? "5");

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientId =
    forwardedFor?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
/*
  if (isRateLimited(clientId)) {
    return Response.json(
      { error: "Traffic is heavy. Try again in one second." },
      {
        status: 429,
        headers: { "Retry-After": "1" },
      }
    );
  }
*/
  try {
    const data = await searchSemanticScholar(query, limit);
    return Response.json(data);
  } catch (error) {
    return handleSemanticScholarError(error);
  }
}
