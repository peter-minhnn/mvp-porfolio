/**
 * Canonical site origin (no trailing slash). Override per environment with
 * NEXT_PUBLIC_SITE_URL; on Vercel it falls back to the production deployment URL.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://nguyennhatminh.vercel.app")
).replace(/\/$/, "");
