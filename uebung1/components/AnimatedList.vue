<script setup>
import { ref, watch, provide } from 'vue'
import { useNav, onSlideEnter, onSlideLeave, sharedState } from '@slidev/client'

const { clicks, clicksDirection, navDirection, total } = useNav()
const current = ref(0)
const nextIndex = ref(1)
provide('al:current', current)
provide('al:register', () => nextIndex.value++)

function startTransition(val) {
  var clickCount = sharedState.clicksTotal
  var onLastClick = val === clickCount
  var onFirstClick = val === 0
  var positiveClick = clicksDirection.value == 1
  if (!(!positiveClick && onLastClick) && !(positiveClick && onFirstClick)) {
    document.startViewTransition(() => {
      current.value = val
    })
  }
}

var unwatch = null

onSlideEnter(() => {
  unwatch = watch(clicks, (val) => {
    startTransition(val)
  })
  //console.log(total.value)
  //if (navDirection.value > 1) startTransition(clicks.value)
}) 

onSlideLeave(() => {
  unwatch()
}) 
</script>

<template>
<ul>
  <slot></slot>
</ul>  
</template>