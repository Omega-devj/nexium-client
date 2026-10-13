'use client'

import { MotionProvider } from '@/director/motion'
import { useAtmosphereSync, usePointer, useViewportUnit } from '@/director/shell'
import { Closing } from './chapters/Closing'
import { Lab } from './chapters/Lab'
import { MatterChapter } from './chapters/MatterChapter'
import { Origin } from './chapters/Origin'
import { Signal } from './chapters/Signal'
import { Systems } from './chapters/Systems'
import { Works } from './chapters/Works'
import { Cursor } from './Cursor'
import { Header } from './Header'
import { Ruler } from './Ruler'
import { SceneLoader } from './SceneLoader'

function Shell() {
  useViewportUnit()
  usePointer()
  useAtmosphereSync()
  return (
    <>
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <SceneLoader />
      <Header />
      <Ruler />
      <main id="contenu">
        <Origin />
        <MatterChapter />
        <Systems />
        <Signal />
        <Works />
        <Lab />
        <Closing />
      </main>
      <Cursor />
    </>
  )
}

/** L'expérience complète : une scène persistante et sept chapitres qui la pilotent. */
export function Experience() {
  return (
    <MotionProvider>
      <Shell />
    </MotionProvider>
  )
}
