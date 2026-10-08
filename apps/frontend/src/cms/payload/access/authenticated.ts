import type { Access } from 'payload'

// Private records (e.g. booking requests): only logged-in admins. The site writes
// them through the local API, which bypasses access control on the server.
export const authenticated: Access = ({ req }) => Boolean(req.user)
