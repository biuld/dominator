import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'


export default defineConfig({
  plugins: [
    svelte(),
  ],
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        panel: 'devtools/panel.html'
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  publicDir: 'public'
})