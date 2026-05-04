import presetIcons from '@unocss/preset-icons'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({ /* options */ }),
    // ...other presets
  ],
  shortcuts: {
    'letter-list': 'list-alpha ml-1 [&>li]:list-alpha',
  },
})