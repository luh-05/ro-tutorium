<script setup>
import { ref, watch, provide } from 'vue'
import { useNav, onSlideEnter, onSlideLeave, sharedState } from '@slidev/client'

const { clicks, clicksDirection } = useNav()
const current = ref(0)
const nextIndex = ref(0)
provide('al:current', current)
provide('al:register', () => nextIndex.value++)

function startTransition(val) {
  var clickCount = sharedState.clicksTotal
  var onLastClick = val === clickCount
  var onFirstClick = val === 0
  var positiveClick = clicksDirection._value == 1
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