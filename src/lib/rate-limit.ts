import { getStore } from '@netlify/blobs'

type WindowRecord = { count: number; resetAt: number }

const memoryStore = new Map<string, WindowRecord>()

function useMemoryFallback(): boolean {
  return !process.env.NETLIFY && !process.env.NETLIFY_BLOBS_CONTEXT
}

export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const now = Date.now()
  const windowMs = windowSeconds * 1000

  if (useMemoryFallback()) {
    const existing = memoryStore.get(key)
    if (!existing || existing.resetAt <= now) {
      const resetAt = now + windowMs
      memoryStore.set(key, { count: 1, resetAt })
      return { allowed: true, remaining: limit - 1, resetAt }
    }
    existing.count += 1
    const allowed = existing.count <= limit
    return { allowed, remaining: Math.max(0, limit - existing.count), resetAt: existing.resetAt }
  }

  try {
    const store = getStore('rate-limits')
    const existing = (await store.get(key, { type: 'json' })) as WindowRecord | null

    if (!existing || existing.resetAt <= now) {
      const resetAt = now + windowMs
      await store.setJSON(key, { count: 1, resetAt })
      return { allowed: true, remaining: limit - 1, resetAt }
    }

    const updated = { count: existing.count + 1, resetAt: existing.resetAt }
    await store.setJSON(key, updated)
    const allowed = updated.count <= limit
    return { allowed, remaining: Math.max(0, limit - updated.count), resetAt: updated.resetAt }
  } catch {
    return { allowed: true, remaining: limit, resetAt: now + windowMs }
  }
}

export function getClientIp(request: Request): string {
  const nfIp = request.headers.get('x-nf-client-connection-ip')
  if (nfIp) return nfIp

  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()

  return 'unknown'
}