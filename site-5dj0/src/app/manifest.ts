import type { MetadataRoute } from 'next'
import { palette } from '@/config/palette'
import { site } from '@/content/site'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: palette.chalk,
    theme_color: palette.chalk,
    lang: site.lang,
    icons: [{ src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }],
  }
}
