'use client'

import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { registerLabel } from '@/lib/labels'

/**
 * Élément du DOM attaché à un point de la scène 3D. Il reste dans l'ordre de lecture
 * du document (clavier, lecteurs d'écran) ; la scène ne fait que le déplacer.
 */
export function Anchor({
  anchor,
  stage,
  className,
  children,
  as: Tag = 'div',
}: {
  anchor: string
  stage: RefObject<HTMLElement | null>
  className?: string
  children: ReactNode
  as?: 'div' | 'li'
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    return registerLabel(el, anchor, stage.current)
  }, [anchor, stage])
  return (
    <Tag ref={ref} className={`anchor ${className ?? ''}`}>
      {children}
    </Tag>
  )
}
