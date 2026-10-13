'use client'

import { useMotion } from '@/director/motion'
import { Mark } from './Mark'
import { goToChapter } from './Ruler'

/**
 * En-tête discret : la marque 5dj0 (qui ramène à l'origine) apparaît dès que le grand
 * nom de l'ouverture a quitté l'écran ; à droite, le réglage du mouvement.
 */
export function Header() {
  const { mode, setMode } = useMotion()
  const reduced = mode === 'reduced'
  return (
    <header className="site-header pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between text-fg transition-colors duration-700">
      <a
        href="#origine"
        className="header-mark pointer-events-auto block"
        onClick={(e) => {
          e.preventDefault()
          goToChapter(0, reduced)
        }}
        data-cursor="origine"
      >
        <Mark className="h-[22px] w-auto" />
        <span className="sr-only">5dj0 — revenir à l’origine</span>
      </a>
      <button
        type="button"
        className="t-mono pointer-events-auto flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
        aria-pressed={reduced}
        onClick={() => setMode(reduced ? 'full' : 'reduced')}
      >
        <span aria-hidden className={`inline-block h-[7px] w-[7px] rounded-full border border-current ${reduced ? '' : 'bg-current'}`} />
        Mouvement : {reduced ? 'réduit' : 'complet'}
      </button>
    </header>
  )
}
