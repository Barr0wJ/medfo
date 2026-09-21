const globalState = globalThis as typeof globalThis & {
  medfoRateLimits?: Map<string, number>;
};

const lastRequestByClient =
  globalState.medfoRateLimits ?? new Map<string, number>();

globalState.medfoRateLimits = lastRequestByClient;

export function isRateLimited(
  clientId: string,
  intervalMs = 1000
): boolean {
  const now = Date.now();
  const lastRequest = lastRequestByClient.get(clientId);

  if (lastRequest !== undefined && now - lastRequest < intervalMs) {
    return true;
  }

  lastRequestByClient.set(clientId, now);
  return false;
}