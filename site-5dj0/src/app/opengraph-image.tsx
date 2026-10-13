import { ImageResponse } from 'next/og'
import { palette } from '@/config/palette'
import { site } from '@/content/site'
import { LOGO_RATIO, logoDataUri, ringDataUri } from '@/lib/ogArt'

export const alt = `${site.name} — logotype dans son anneau gradué`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function OpenGraphImage() {
  const logoW = 640
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: palette.chalk,
          color: palette.ink,
          fontFamily: 'sans-serif',
        }}
      >
        <img src={ringDataUri(900)} width={900} height={900} alt="" style={{ position: 'absolute', left: 340, top: -130 }} />
        <img src={logoDataUri()} width={logoW} height={Math.round(logoW * LOGO_RATIO)} alt="" style={{ position: 'absolute', left: 470, top: 150 }} />
        <div style={{ position: 'absolute', left: 64, bottom: 56, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 18, letterSpacing: 3, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: 8, background: palette.vermilion }} />
            Une seule matière
          </div>
          <div style={{ fontSize: 28, maxWidth: 300, lineHeight: 1.2 }}>{site.shortDescription}</div>
        </div>
      </div>
    ),
    size,
  )
}
