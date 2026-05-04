---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: Übung2
info: |
  ## RO Übung 2
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
# - fancy-arrow
#- cpp-runner
# - tldraw
# - typst
# - window-mockup
# - slidev-component-zoom
 - vuetify
 - "@katzumi/slidev-addon-qrcode"
---

# Gruppenübung 2
## Assembler & Speicher

---
clicks: 4
---

# Aufgabe 2.1 - Theoriefragen {class=title-accent}
<AnimatedList class="letter-list">
<!--c)-->
<AnimatedListEntry when="current % 2 === 0 || current === 0 * 2 + 1">

Was unterscheidet einen __logischen Rechtsshift__ von einem __arithmetischen Rechtsschift__?
</AnimatedListEntry>

<!--d)-->
<AnimatedListEntry when="current % 2 === 0 || current === 1 * 2 + 1">

Mit I-Typ Befehlen können __12 bit__ Direktwerte (Immediates) verwendet werden.  
__Wie können auch größere Konstanten im Programm verwendet werden?__
</AnimatedListEntry>

<!--lösung c)-->
<AnimatedListEntry style="list-style-type: none; !important" when="current === 0 * 2 + 1">
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
<AnimatedListEntry style="list-style-type: none; !important"  when="current === 1 * 2 + 1">
<v-card
  subtitle="1.1d"
  width="100%"
>
<template v-slot:prepend><v-icon><div class="i-streamline-plump-color:class-lesson-flat"></div></v-icon></template>
<template v-slot:title><span>Musterlösung</span></template>
<v-card-text>

Durch das Nutzen der Instruktionen _lui_ und _addi_ können beliebige __32 bit__ Werte mit 2 Befehlen geladen werden

```riscv
lui t0, value[31:12] # lade obere 20 bit
addi t0, t0, value[11:0] # lade untere 12 bit
li t0, value # Pseudo-Instruktion li wird im Hintergrund durch die beiden oberen Instruktionen ersetzt
```
</v-card-text>
</v-card>
</AnimatedListEntry>
</AnimatedList>

---
clicks: 21
---
# Aufgabe 2.2 Assemblerprogrammierung {class=title-accent}
### a) Ausdrücke und Zuweisungen

<div grid="~ cols-2">
<div>
<ul class="letter-list">
<li :class="($clicks === 0 || ($clicks > 0 && $clicks < 5)) ? 'opacity-100' : 'opacity-30'">
<code>b = ((b & 5) | 42) + c;</code>
</li>
<li :class="($clicks === 0 || ($clicks > 4 && $clicks < 9)) ? 'opacity-100' : 'opacity-30'">
<code>e = b >= (c + 5);</code>
</li>
<li :class="($clicks === 0 || ($clicks > 8 && $clicks < 12)) ? 'opacity-100' : 'opacity-30'">
<code>c = b + 123456;</code>
</li>
<li :class="($clicks === 0 || ($clicks > 11 && $clicks < 17)) ? 'opacity-100' : 'opacity-30'">
<code>b = b << (5 + 3);</code>
</li>
<li :class="($clicks === 0 || ($clicks > 16 && $clicks < 22)) ? 'opacity-100' : 'opacity-30'">
<code>d = (e == 0) ? c : (c + 1);</code>
</li>
</ul>
</div>
<div>

<div v-if="$clicks > 0 && $clicks < 5">

```riscv {*|1|2|3}{at:2}
andi t0, a2, 5 # t0 = b & 5
ori t0, t0, 42 # t0 = t0 | 42
add a2, t0, a3 # b = t0 + c
```
</div>
<div v-if="$clicks > 4 && $clicks < 9">

```riscv {*|1|2|3}{at:6}
addi t0, a3, 5 # t0 = c + 5
slt t0, a2, t0 # t0 = b < t0
xor a5, t0, 1 # e = t0 ^ 1 effektiv e = ~t0
```
</div>
<div v-if="$clicks > 8 && $clicks < 12">

```riscv {*|1|2}{at:10}
li t0, 123456 # t0 = 123456 (lui+addi)
add a3, a2, t0 # c = b + t0
```
</div>
<div v-if="$clicks > 11 && $clicks < 17">

```riscv {*|1|2|3|4}{at:13}
addi t0, zero, 5 # t0 = 5
addi t1, zero, 3 # t1 = 3
add t2, t0, t1 # t2 = t0 + t1
sll a2, a2, t2 # b = b << t2
```
</div>
<div v-if="$clicks > 16 && $clicks < 22">

```riscv {*|1,4,|5|2|3,6}{at:18}
bne a5, zero, label1 # jump if e != 0
add a4, a3, zero # d = c
jal zero, label2 # jump to end
label1:
addi a4, a3, 1 # d = c + 1
label2:
```
</div>
</div>
</div>

---
clicks: 4
---
# Aufgabe 2.2 Assemblerprogrammierung {class=title-accent}
### b) Load Immediate

<div grid="~ cols-2">
<div>
<ul class="letter-list">
<li :class="($clicks === 0 || $clicks === 1) ? 'opacity-100' : 'opacity-30'">
<code>li t0, 1536</code>
</li>
<li :class="($clicks === 0 || $clicks === 2) ? 'opacity-100' : 'opacity-30'">
<code>li a1, 2176</code>
</li>
<li :class="($clicks === 0 || $clicks === 3) ? 'opacity-100' : 'opacity-30'">
<code>li gp, -1</code>
</li>
<li :class="($clicks === 0 || $clicks === 4) ? 'opacity-100' : 'opacity-30'">
<code>li s1, -4096</code>
</li>
</ul>
</div>
<div>

<div v-if="$clicks === 1">

```riscv
addi t0, zero, 1536
```
</div>
<div v-if="$clicks === 2">

```riscv
# Rechne: a1 = 4096 - 1920
lui a1, 1
addi a1, a1, -1920
```
</div>
<div v-if="$clicks === 3">

```riscv
addi gp, zero, -1
```
</div>
<div v-if="$clicks === 4">

```riscv
lui s1, 0xfffff
```
</div>
</div>
</div>

---

# Aufgabe 2.2 Assemblerprogrammierung {class=title-accent}
<div grid="~ cols-[13em_auto]">
<div>

### Unteraufgabe c) 1.

```riscv {*|1|2|4,7|5|6,3|4,7|5|6,3|4,7|5|6,3|4,7|8|*}
addi t1, zero, 7
addi t0, zero, 1
start:
blt t1, t0, end
add t0, t0, t0
jal zero, start
end:
srli t0, t0, 1
```
</div>
<div class="decreased-line-height" style="margin-left:1em;">
<table>
<thead>
<tr>
<td>Takt</td>
<td>Instruktion</td>
<td>Zielregister</td>
<td>Neuer Programmzähler</td>
</tr>
</thead>
<tbody>
<tr v-click=1>
<td>0</td>
<td><code>addi t0, zero, 4</code></td>
<td><code>t1 = 7</code></td>
<td>4</td>
</tr>
<tr v-click=2>
<td>1</td>
<td><code>addi t0, zero, 1</code></td>
<td><code>t0 = 1</code></td>
<td>8</td>
</tr>
<tr v-click=3>
<td>2</td>
<td><code>blt t1, t0, end </code></td>
<td></td>
<td>12</td>
</tr>
<tr v-click=4>
<td>3</td>
<td><code>add t0, t0, t0</code></td>
<td><code>t0 = 2</code></td>
<td>16</td>
</tr>
<tr v-click=5>
<td>4</td>
<td><code>jal zero, start</code></td>
<td></td>
<td>8</td>
</tr>
<tr v-click=6>
<td>5</td>
<td><code>blt t1, t0, end</code></td>
<td></td>
<td>12</td>
</tr>
<tr v-click=7>
<td>6</td>
<td><code>add t0, t0, t0</code></td>
<td><code>t0 = 4</code></td>
<td>16</td>
</tr>
<tr v-click=8>
<td>7</td>
<td><code>jal zero, start</code></td>
<td></td>
<td>8</td>
</tr>
<tr v-click=9>
<td>8</td>
<td><code>blt t1, t0, end</code></td>
<td></td>
<td>12</td>
</tr>
<tr v-click=10>
<td>9</td>
<td><code>add t0, t0, t0</code></td>
<td><code>t0 = 8</code></td>
<td>16</td>
</tr>
<tr v-click=11>
<td>10</td>
<td><code>jal zero, start </code></td>
<td></td>
<td>8</td>
</tr>
<tr v-click=12>
<td>11</td>
<td><code>blt t1, t0, end</code></td>
<td></td>
<td>20</td>
</tr>
<tr v-click=13>
<td>12</td>
<td><code>srli t0, t0, 1</code></td>
<td><code>t0 = 4</code></td>
<td>24</td>
</tr>
</tbody>
</table>
</div>
</div>

---

# Aufgabe 2.2 Assemblerprogrammierung {class=title-accent}
<div grid="~ cols-[13em_auto]">
<div>

### Unteraufgabe c) 2.

```riscv {*|1|2|4,7|5|6|4,7|5|6|4,7|8|9,3|*}
addi a0, zero, 12
addi a1, zero, 8
label1:
bge a1, a0, label2
sub a0, a0, a1
jalr zero, a1, 0
label2:
sub a1, a1, a0
bne a1, zero, label1
```
</div>
<div class="decreased-line-height" style="margin-left:1em;">
<table>
<thead>
<tr>
<td>Takt</td>
<td>Instruktion</td>
<td>Zielregister</td>
<td>Neuer Programmzähler</td>
</tr>
</thead>
<tbody>
<tr v-click=1>
<td>0</td>
<td><code>addi a0, zero</code></td>
<td><code>a0 = 12</code></td>
<td>4</td>
</tr>
<tr v-click=2>
<td>1</td>
<td><code>addi a1, zero</code></td>
<td><code>a1 = 8</code></td>
<td>8</td>
</tr>
<tr v-click=3>
<td>2</td>
<td><code>bge a1, a0, label2</code></td>
<td></td>
<td>12</td>
</tr>
<tr v-click=4>
<td>3</td>
<td><code>sub a0, a0, a1</code></td>
<td><code>a0 = 4</code></td>
<td>16</td>
</tr>
<tr v-click=5>
<td>4</td>
<td><code>jalr zero, a1</code></td>
<td></td>
<td>8</td>
</tr>
<tr v-click=6>
<td>5</td>
<td><code>bge a1, a0, label2</code></td>
<td></td>
<td>20</td>
</tr>
<tr v-click=7>
<td>6</td>
<td><code>sub a1, a1, a0</code></td>
<td><code>a1 = 4</code></td>
<td>24</td>
</tr>
<tr v-click=8>
<td>7</td>
<td><code>bne a1, zero, label1</code></td>
<td></td>
<td>8</td>
</tr>
<tr v-click=9>
<td>8</td>
<td><code>bge a1, a0, label2</code></td>
<td></td>
<td>20</td>
</tr>
<tr v-click=10>
<td>9</td>
<td><code>sub a1, a1, a0</code></td>
<td><code>a1 = 0</code></td>
<td>24</td>
</tr>
<tr v-click=11>
<td>10</td>
<td><code>bne a1, zero, label1</code></td>
<td></td>
<td>28</td>
</tr>
</tbody>
</table>
</div>
</div>

---

# Aufgabe 2.3 Datenkonstrukte - Arrays {class=title-accent}
<div grid="~ cols-[13em_auto]">
<div>

### Unteraufgabe a) Fixer Index
<v-mark> </v-mark>

```c {*|none|none|none|1|2|2|2|*}
b = a[5];
a[4] = b + 42;
```
</div>
<div class="" style="margin-left:1em;">
<v-click at=1>

````md magic-move {lines: true, at: 1}
```riscv {*|*}
.text # text header

.data # data header

```

```riscv {4-5}
.text

.data
arraydata_a: # array definieren
  .word 10,9,8,7,6,5,4,3,2,1
```

```riscv {2}
.text
  la a1, arraydata_a # pointer in a1 laden

.data
arraydata_a:
  .word 10,9,8,7,6,5,4,3,2,1
```

```riscv {4}
.text
  la a1, arraydata_a
# Beginn der Lösung
  lw a0, 20(a1) # b = a[5]
# Ende der Lösung

.data
arraydata_a:
  .word 10,9,8,7,6,5,4,3,2,1
```

```riscv {5-6|5|6|*}
.text
  la a1, arraydata_a
# Beginn der Lösung
  lw a0, 20(a1) # b = a[5]
  addi t0, a0, 42 # b + 42
  sw t0, 16(a1) # a[4] = b + 42
# Ende der Lösung

.data
arraydata_a:
  .word 10,9,8,7,6,5,4,3,2,1
```
````

</v-click>
</div>
</div>

---

# Aufgabe 2.3 Datenkonstrukte - Arrays {class=title-accent}
<div grid="~ cols-[13em_auto]">
<div>

### Unteraufgabe b) Variabler Index
<v-mark> </v-mark>

```c {*|none|1|1|1|1|2|2|2|2|*}
b = a[i+1];
a[i] = b + i + 38;
```
</div>
<div class="" style="margin-left:1em;">
<v-click at=1>

````md magic-move {lines: true, at: 1}
```riscv {*|*}
.text
  la a1, arraydata_a

.data
arraydata_a:
  .word 10,9,8,7,6,5,4,3,2,1
```

```riscv {3,4-6,7|3,7,4|3,7,5|3,7,6}
.text
  la a1, arraydata_a
# Beginn der Lösung
  slli t1, a2, 2 # i*4
  add t1, t1, a1 # &a[i]
  lw a0, 4(t1) # b = a[i+1]
# Ende der Lösung

.data
arraydata_a:
  .word 10,9,8,7,6,5,4,3,2,1
```

```riscv {3,7-9,10|3,7,10|3,8,10|3,9,10|*}
.text
  la a1, arraydata_a
# Beginn der Lösung
  slli t1, a2, 2 # i*4
  add t1, t1, a1 # &a[i]
  lw a0, 4(t1) # b = a[i+1]
  add t0, a0, a2 # b + i
  addi t0, t0, 38 # b + i + 38
  sw t0, 0(t1) # a[i] = b + i + 38
# Ende der Lösung

.data
arraydata_a:
  .word 10,9,8,7,6,5,4,3,2,1
```

````

</v-click>
</div>
</div>

---

# Aufgabe 2.3 Datenkonstrukte - Arrays {class=title-accent}
<div grid="~ cols-[13em_auto]">
<div>

### Unteraufgabe c) Schleife
<v-mark> </v-mark>

```c {*|none|1,4|2-3|*}
for (int i = 0; i < 9; i++) {
  b = a[i+1];
  a[i] = b + i + 38;
}
```
</div>
<div class="" style="margin-left:1em;">
<v-click at=1>

````md magic-move {lines: true, at: 1}
```riscv {*|*}
.text
  la a1, arraydata_a

.data
arraydata_a:
  .word 10,9,8,7,6,5,4,3,2,1
```

```riscv {3,4-9,10}
.text
  la a1, arraydata_a
# Beginn der Lösung
  li a2, 0 # i = 0
  li s0, 9 #Anzahl Iterationen
loop:

  addi a2, a2, 1 # i++
  blt a2, s0, loop
# Ende der Lösung

.data
arraydata_a:
  .word 10,9,8,7,6,5,4,3,2,1
```

```riscv {3,7-13,17|*}
.text
  la a1, arraydata_a
# Beginn der Lösung
  li a2, 0 # i = 0
  li s0, 9 #Anzahl Iterationen
loop:
  # Exakt das gleiche wie in letzter aufgabe! 
  slli t1, a2, 2 # i*4
  add t1, t1, a1 # &a[i]
  lw a0, 4(t1) # b = a[i+1]
  add t0, a0, a2 # b + i
  addi t0, t0, 38 # b + i + 38
  sw t0, 0(t1) # a[i] = b + i + 38

  addi a2, a2, 1 # i++
  blt a2, s0, loop
# Ende der Lösung

.data
arraydata_a:
  .word 10,9,8,7,6,5,4,3,2,1
```

````

</v-click>
</div>
</div>

---

# Kontakt Für Fragen & co. {class=title-accent}
<div class="flex">
<QRCode
  value="https://discord.gg/geekhub"
  :width="180"
  :height="180"
  color="234253"
  image="./imgs/geekhub.png"
  class="bg-#aaaacc rounded-xl"
/>
<p class="text-2xl" style="padding-left:3em; padding-top:1em"><-- Geekhub</p>


![alt text](./imgs/gangshit.png) {class="absolute right-30 top-20" style="width: 200px"}

</div>

<div class="flex">
<div style="padding-top:2em">

**DISCORD:** `luh3119`
</div>
<p class="text-2xl" style="padding-left:3.5em; padding-top:1.5em"><-- Ich</p>
</div>