import { revalidatePath } from 'next/cache'
import { purgeCdnCache } from '@/lib/cdn'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

// The admin and the sites are one app, so a save can drop the cached pages
// directly — no webhook, no shared secret. Cloudflare holds a second copy of the
// HTML whenever the domain is proxied, so it is purged too.
function revalidateSite(req: PayloadRequest) {
  if (req.context.disableRevalidate) return

  try {
    // 'layout' also clears every page nested under it, across all sites.
    revalidatePath('/', 'layout')
  } catch (err) {
    req.payload.logger.warn({ err, msg: 'Could not revalidate the sites' })
  }

  // Fire-and-forget: a CDN problem must never fail someone's save.
  void purgeCdnCache().then(({ purged, reason }) => {
    if (!purged && reason !== 'no Cloudflare credentials') {
      req.payload.logger.warn(`Cloudflare purge skipped: ${reason}`)
    }
  })
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidateSite(req)
  return doc
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req)
  return doc
}
