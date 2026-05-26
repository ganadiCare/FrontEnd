import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     babel({ presets: [reactCompilerPreset()] })
//   ],
// })

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://20.189.241.58:8080',
        changeOrigin: true,
      }
    }
  }
})