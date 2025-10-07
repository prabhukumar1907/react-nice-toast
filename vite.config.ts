import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ include: ['src/lib'] })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/toast/index.ts'),
      name: 'ReactToast',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});