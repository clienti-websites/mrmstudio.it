const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

// In-memory: resets per server instance/deploy. Acceptable for the MVP's
// traffic volume; revisit with a shared store if abuse becomes a problem.
//
// `ip` of `null`/`undefined` means the caller could not determine a client
// IP at all (see app/api/contatti/route.ts). Rather than collapsing every
// such visitor into one shared "unknown" bucket — where a handful of
// concurrent submissions from unrelated people would block everyone — we
// fail OPEN and never rate-limit an unidentifiable caller. The honeypot
// remains the primary spam defence either way.
export function isRateLimited(ip: string | null | undefined): boolean {
  if (!ip) return false;

  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  pruneStaleEntries(now);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

// Without this, an IP that stops submitting keeps its (now-empty-after-
// filtering) entry in the map forever, growing it unbounded over the life
// of the server instance.
function pruneStaleEntries(now: number): void {
  for (const [key, timestamps] of hits) {
    if (timestamps.every((timestamp) => now - timestamp >= WINDOW_MS)) {
      hits.delete(key);
    }
  }
}
