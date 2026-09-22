export function normalizeQueryParam(val: unknown, allowed: readonly string[], fallback: string) {
  return typeof val === 'string' && allowed.includes(val) ? val : fallback
}
