<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  when: { type: String, requried: true }
})

const current = inject('al:current')
const register = inject('al:register')

const index = register()

const visible = computed(() => {
  try {
    return new Function('current', `return !!(${props.when})`)(
      current.value
    )
  } catch {
    return false
  }
})
</script>


<template>
<li :value=index v-if=visible :key=index :style="`view-transition-name: item-al-${index}`">

<slot></slot>

</li>
</template>