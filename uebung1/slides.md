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
addons:
 - fancy-arrow
 - cpp-runner
 - tldraw
 - typst
 - window-mockup
 - slidev-component-zoom
 - vuetify
---

# Gruppenübung 1
## Assembler & Speicher

---
clicks: 8
---

# Aufgabe 1.1 - Theoriefragen {class=title-accent}

<AnimatedList class="letter-list">
<!--a)-->
<AnimatedListEntry when="current % 2 === 0 || current === 0 * 2 + 1">

Wofür stehen die Abkürzungen _RISC_ und _CISC_?  
__Nennen Sie Vor- und Nachteile einer _RISC_-Architektur.__
</AnimatedListEntry>

<!--b)-->
<AnimatedListEntry when="current % 2 === 0 || current === 1 * 2 + 1">

Gegeben sei ein Wort-adressierter Speicher.
__Wie viele Wörter lassen sich maximal adressieren, wenn die Adresse vier Byte groß ist?__
</AnimatedListEntry>


<!--c)-->
<AnimatedListEntry when="current % 2 === 0 || current === 2 * 2 + 1">

Was unterscheidet einen __logischen Rechtsshift__ von einem __arithmetischen Rechtsschift__?
</AnimatedListEntry>

<!--d)-->
<AnimatedListEntry when="current % 2 === 0 || current === 3 * 2 + 1">

Mit I-Typ Befehlen können __12 bit__ Direktwerte (Immediates) verwendet werden.  
__Wie können auch größere Konstanten im Programm verwendet werden?__
</AnimatedListEntry>


<!--lösung a)-->
<AnimatedListEntry style="list-style-type: none; !important" when="current === 0 * 2 + 1">
<v-card
  subtitle="1.1a"
  width="100%"
>
<template v-slot:prepend><v-icon><div class="i-streamline-plump-color:class-lesson-flat"></div></v-icon></template>
<template v-slot:title><span>Musterlösung</span></template>
<v-card-text>

__RISC__ steht für _Reduced Instruction Set Computing_  
__CISC__ steht für _Complex Instruction Set Computing_  

Vorteile:
- Hardware Entwurf einfacher durch einfachere Instruktionen.
- Schnellere Ausführung einzelner Instruktionen, da weniger Instruktionen optimiert werden müssen.

<br>Nachteile:
- Benötigt mehr Instruktionen für dieselbe Aufgabe (und mehr Programmspeicher)  
</v-card-text>
</v-card>
</AnimatedListEntry>

<!--lösung b)-->
<AnimatedListEntry style="list-style-type: none; !important" when="current === 1 * 2 + 1">
<v-card
  subtitle="1.1b"
  width="100%"
>
<template v-slot:prepend><v-icon><div class="i-streamline-plump-color:class-lesson-flat"></div></v-icon></template>
<template v-slot:title><span>Musterlösung</span></template>
<v-card-text>

$2^{32} = 4294967296$
</v-card-text>
</v-card>
</AnimatedListEntry>

<!--lösung c)-->
<AnimatedListEntry style="list-style-type: none; !important" when="current === 2 * 2 + 1">
<v-card
  subtitle="1.1c"
  width="100%"
>
<template v-slot:prepend><v-icon><div class="i-streamline-plump-color:class-lesson-flat"></div></v-icon></template>
<template v-slot:title><span>Musterlösung</span></template>
<v-card-text>

Bei logischen Rechtsshifts werden die linksseitigen Bits mit 0 aufgefüllt.
Bei arithmetischen Rechtsshifts werden die linksseitigen Bits mit dem Wert des Most Significant Bit (msb) aufgefüllt. Somit bleibt bei Zahlen, die als Zweier-Komplement dargestellt sind, das Vorzeichen erhalten.
</v-card-text>
</v-card>
</AnimatedListEntry>

<!--lösung d) -->
<AnimatedListEntry style="list-style-type: none; !important" when="current === 3 * 2 + 1">
<v-card
  subtitle="1.1d"
  width="100%"
>
<template v-slot:prepend><v-icon><div class="i-streamline-plump-color:class-lesson-flat"></div></v-icon></template>
<template v-slot:title><span>Musterlösung</span></template>
<v-card-text>

Durch das Nutzen der Instruktionen _lui_ und _addi_ können beliebige __32 bit__ Werte mit 2 Befehlen geladen werden

```asm 
lui t0, value[31:12] # lade obere 20 bit
addi t0, t0, value[11:0] # lade untere 12 bit
li t0, value # Pseudo-Instruktion li wird im Hintergrund durch die beiden oberen Instruktionen ersetzt
```
</v-card-text>
</v-card>
</AnimatedListEntry>
</AnimatedList>
