import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // NOTE: a crawler obeys only its most specific User-Agent group, not `*` plus
  // the specific one. The Googlebot/Bingbot groups below therefore have to
  // repeat the disallow list, otherwise Googlebot would ignore the `/admin/`,
  // `/api/` and `/auth/` exclusions entirely.
  const disallow = ['/api/', '/admin/', '/auth/'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow,
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow,
        crawlDelay: 0,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}