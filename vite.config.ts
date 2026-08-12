import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // FSEvents doesn't reliably deliver writes here, so the dev server never
    // invalidated changed modules. Polling costs a little CPU but always sees them.
    watch: {
      usePolling: true,
      interval: 300
    }
  }
})
