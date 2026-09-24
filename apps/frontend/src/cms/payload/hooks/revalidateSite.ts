import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

// The admin and the site are one app, so a save can drop the site's cached pages
// directly — no webhook, no shared secret.
function revalidateSite(req: PayloadRequest) {
  if (req.context.disableRevalidate) return

  try {
    // 'layout' also clears every page nested under it.
    revalidatePath('/', 'layout')
  } catch (err) {
    req.payload.logger.warn({ err, msg: 'Could not revalidate the site' })
  }
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
