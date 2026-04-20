---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: Übung1
info: |
  ## RO Übung 1
# apply UnoCSS classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable Comark Syntax: https://comark.dev/syntax/markdown
comark: true
# duration of the presentation
duration: 90min
---

# Gruppenübung 1
## Assembler & Speicher

---
clicks: 8
---

# Aufgabe 1.1 - Theoriefragen {class=title-accent}

<AnimatedList>
  <AnimatedListEntry when="current % 2 === 0 || current === 0 * 2 + 1">

  Wofür stehen die Abkürzungen _RISC_ und _CISC_?  
  __Nennen Sie Vor- und Nachteile einer _RISC_-Architektur.__

  </AnimatedListEntry>
  <AnimatedListEntry when="current % 2 === 0 || current === 1 * 2 + 1">
  
  Gegeben sei ein Wort-adressierter Speicher.
  __Wie viele Wörter lassen sich maximal adressieren, wenn die Adresse vier Byte groß ist?__

  </AnimatedListEntry>
  <AnimatedListEntry when="current % 2 === 0 || current === 2 * 2 + 1">
  
  Was unterscheidet einen __logischen Rechtsshift__ von einem __arithmetischen Rechtsschift__?

  </AnimatedListEntry>
  <AnimatedListEntry when="current % 2 === 0 || current === 3 * 2 + 1">
  
  Mit I-Typ Befehlen können `12` bit Direktwerte (Immediates) verwendet werden.  
  __Wie können auch größere Konstanten im Programm verwendet werden?__

  </AnimatedListEntry>
</AnimatedList>