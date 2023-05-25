import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
// @ts-ignore
import DefineOptions from 'unplugin-vue-define-options/vite';
import { resolve } from 'path';
export default defineConfig({
  build: {
    //打包文件目录
    outDir: 'iui',
    cssCodeSplit: true,
    emptyOutDir: true,
    //压缩
    //minify: false,
    rollupOptions: {
      //忽略打包vue文件
      external: ['vue'],
      input: ['index.ts'],
      output: [
        {
          //打包格式
          format: 'es',
          assetFileNames: (assetInfo: any) => {
            if (/(\.css|\.scss|\.less)/.test(assetInfo.name)) {
              return 'style/[name][extname]';
            } else {
              return 'assets/[name][extname]';
            }
          },
          //打包后文件名
          entryFileNames: '[name].mjs',
          //让打包目录和我们目录对应
          exports: 'named',
          preserveModules: true,
          //配置打包根目录
          dir: resolve('../../dist/iui', 'es'),
          manualChunks: {
            echarts: ['echarts', 'vue'],
          },
        },
        {
          //打包格式
          format: 'cjs',
          assetFileNames: (assetInfo: any) => {
            if (/(\.css|\.scss|\.less)/.test(assetInfo.name)) {
              return 'style/[name][extname]';
            } else {
              return 'assets/[name][extname]';
            }
          },
          //打包后文件名
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          exports: 'named',
          preserveModules: true,
          //配置打包根目录
          dir: resolve('../../dist/iui', 'lib'),
          manualChunks: {
            echarts: ['echarts', 'vue'],
          },
        },
      ],
    },
    lib: {
      entry: './index.ts',
      formats: ['es', 'cjs'],
    },
  },
  plugins: [
    vue(),
    dts({
      entryRoot: './src',
      outputDir: [
        resolve('../../dist/iui', 'es/src'),
        resolve('../../dist/iui', 'lib/src'),
      ],
      tsConfigFilePath: resolve('../../', 'tsconfig.json'),
    }),
    DefineOptions(),
  ],
});
