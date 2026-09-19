import { searchSemanticScholar } from "../apicall";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const limit = Number(searchParams.get("limit") ?? "5");

  try {
    const data = await searchSemanticScholar(query, limit);
    return Response.json(data);
  } catch (error) {
    console.log(query, limit, error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json(
      { error: message },
      { status: 400 }
    );
  }
}
