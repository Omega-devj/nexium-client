import type { Metadata, Viewport } from 'next'
import { Archivo, Martian_Mono } from 'next/font/google'
import type { CSSProperties, ReactNode } from 'react'
import { cssVariables, palette } from '@/config/palette'
import { site } from '@/content/site'
import './globals.css'

const display = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const mono = Martian_Mono({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-martian',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: palette.chalk,
  colorScheme: 'light',
}

// Préférence de mouvement appliquée avant le premier rendu : pas de flash d'animation.
const motionScript = `try{var m=localStorage.getItem('5dj0:motion');var r=m?m==='reduced':window.matchMedia('(prefers-reduced-motion: reduce)').matches;document.documentElement.dataset.motion=r?'reduced':'full'}catch(e){document.documentElement.dataset.motion='full'}`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={site.lang}
      className={`${display.variable} ${mono.variable}`}
      style={cssVariables as CSSProperties}
      data-motion="full"
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        {children}
      </body>
    </html>
  )
}
