import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL('/', site.url).toString(), changeFrequency: 'monthly', priority: 1 }]
}
