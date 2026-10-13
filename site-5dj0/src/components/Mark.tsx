import { LOGO_DOTS, LOGO_PATH, LOGO_VIEWBOX } from '@/lib/glyphs.generated'

/** Le logotype 5dj0, en SVG : mêmes contours que les lettres 3D. */
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <path d={LOGO_PATH} fill="currentColor" fillRule="evenodd" />
      {LOGO_DOTS.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="var(--vermilion)" />
      ))}
    </svg>
  )
}
