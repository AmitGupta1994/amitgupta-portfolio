import type { Access } from 'payload'

// Portfolio content is public; creating, updating and deleting stay behind login.
export const publicRead: Access = () => true
