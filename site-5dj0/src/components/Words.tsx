import { Fragment } from 'react'

/**
 * Découpe un texte en mots masqués, pour les révélations typographiques.
 * Le texte reste lisible et sélectionnable ; sans JavaScript, il s'affiche tel quel.
 */
export function Words({ text, className, wordClass }: { text: string; className?: string; wordClass?: string }) {
  const words = text.split(/\s+/).filter(Boolean)
  return (
    <span className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="mask">
            <span className={`w ${wordClass ?? ''}`}>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  )
}

/** Repère de chapitre : « 03 — Signal ». */
export function ChapterTag({ index, title, className }: { index: string; title: string; className?: string }) {
  return (
    <p className={`t-mono flex items-center gap-3 ${className ?? ''}`}>
      <span className="inline-block h-[5px] w-[5px] rounded-full bg-vermilion" aria-hidden />
      <span>{index}</span>
      <span aria-hidden className="inline-block h-px w-8 bg-current opacity-50" />
      <span>{title}</span>
    </p>
  )
}
