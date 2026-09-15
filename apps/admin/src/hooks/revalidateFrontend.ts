import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

// Tells the frontend to drop its cached CMS responses. Fire-and-forget: a
// frontend that's down must never block saving content.
async function notifyFrontend(req: PayloadRequest) {
  if (req.context.disableRevalidate) return

  const frontendUrl = process.env.FRONTEND_URL
  const secret = process.env.REVALIDATE_SECRET
  if (!frontendUrl || !secret) return

  try {
    const res = await fetch(`${frontendUrl}/api/revalidate`, {
      method: 'POST',
      headers: { 'x-revalidate-secret': secret },
    })
    if (!res.ok) {
      req.payload.logger.warn(`Frontend revalidation failed with status ${res.status}`)
    }
  } catch (err) {
    req.payload.logger.warn({ err, msg: 'Frontend revalidation request failed' })
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  void notifyFrontend(req)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  void notifyFrontend(req)
  return doc
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc, req }) => {
  void notifyFrontend(req)
  return doc
}
