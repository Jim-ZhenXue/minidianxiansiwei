import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 确保在任何环境下资源路径都是相对路径
  build: {
    // 生产环境配置
    assetsDir: '',
    minify: 'esbuild', // 使用 esbuild 进行压缩（Vite 默认值）
    sourcemap: true, // 启用 sourcemap 便于调试
    rollupOptions: {
      input: {
        main: './index.html',
        txt: './public/kE9LyVjiV0.txt'
      },
      output: {
        manualChunks: undefined // 禁用代码分割
      }
    }
  },
  server: {
    // 开发服务器配置
    watch: {
      usePolling: true
    },
    host: true, // 允许外部访问
    port: 5173, // 固定端口号
    strictPort: true, // 端口被占用时报错而不是自动切换
  },
  preview: {
    // 预览服务器配置（与开发服务器保持一致）
    port: 5173,
    strictPort: true,
    host: true
  }
})
