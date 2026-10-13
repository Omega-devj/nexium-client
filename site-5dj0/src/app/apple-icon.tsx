import { ImageResponse } from 'next/og'
import { ICON_SVG } from '@/lib/icon.generated'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function AppleIcon() {
  const src = `data:image/svg+xml;base64,${Buffer.from(ICON_SVG).toString('base64')}`
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        <img src={src} width={180} height={180} alt="" />
      </div>
    ),
    size,
  )
}
