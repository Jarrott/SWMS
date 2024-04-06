import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import inject from '@rollup/plugin-inject';
import postcssPxtoRem from 'postcss-pxtorem'

// @ts-ignore
import { resolve } from 'path';

// 请勿修改，请至该目录查看 readme 了解更多
const autoImportsDir = 'auto-import';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      // @ts-ignore
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
  },
  // css全局处理
  css: {
    preprocessorOptions: {
      scss: {
        // 这里路径自己改，找到自己定义的scss文件
        additionalData: `@use "@/assets/styles/element.scss" as *;`,
      },
    },
    postcss: {
      plugins: [
        postcssPxtoRem({
          rootValue: 192, // 按照自己的设计稿修改 1920/10
          unitPrecision: 5, // 转换后的精度，即小数点位数 保留到5位小数
          // selectorBlackList: ['ignore'],  // ignore 忽略转换正则匹配项, ['norem']过滤掉.norem-开头的class，不进行rem转换
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          replace: true, // 是否转换后直接更换属性值
          mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          // landscape: false, // 是否处理横屏情况
        })
      ]
    }
  },
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router'],
      dirs: ['src/service'],
      eslintrc: {
        enabled: true,
        filepath: `${autoImportsDir}/.eslint-auto-import.json`,
        globalsPropValue: true,
      },
      dts: `${autoImportsDir}/globals-auto-import.d.ts`,
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: [],
      dts: `${autoImportsDir}/components-auto-import.d.ts`,
    }),
    inject({
      'window.Quill': ['@vueup/vue-quill', 'Quill'],
      Quill: ['@vueup/vue-quill', 'Quill'],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'js/[name]-[hash].js',
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: 'js/[name]-[hash].js',
        // 用于输出静态资源的命名放到dist中的static文件夹下，[ext]表示文件扩展名
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      }
    }
  },
  server: {
    proxy: {
      '^/api': {
        // 匹配请求路径，
        target: 'http://47.104.177.123:88/api', // 代理的目标地址--通用
        // target: 'http://218.78.6.209:8888', // 代理的目标地址--通用
        // 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
        changeOrigin: true,
        // secure: true, // 是否https接口
        // ws: true, // 是否代理websockets

        // 路径重写，**** 如果你的后端有统一前缀(如:/api)，就不开启；没有就开启
        //简单来说，就是是否改路径 加某些东西
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '^/url-tmpl': {
        target: 'https://qc-import-template.oss-cn-beijing.aliyuncs.com', // 代理下载模板地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/url-tmpl/, ''),
      },
      '^/qqmap': {
        target: 'https://apis.map.qq.com', // 代理的腾讯地图地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/qqmap/, ''),
      },
      '^/url-aliapy': {
        target: 'https://qc-import-template.oss-cn-beijing.aliyuncs.com', // 代理的目标地址 模板下载
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/url-aliapy/, ''),
      },
      '^/url-cw': {
        target: 'http://192.168.101.19:8085', // 代理的目标地址 陈武
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/url-cw/, ''),
      },
      '^/url-llf': {
        target: 'http://192.168.3.65:8081', // 代理的目标地址 李龙飞
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/url-llf/, ''),
      },
      '^/url-yt': {
        target: 'http://192.168.3.251:8082', // 代理的目标地址 颜通
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/url-yt/, ''),
      },
      '^/url-hzj': {
        target: 'http://192.168.3.21:8082', // 代理的目标地址 胡子健
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/url-hzj/, ''),
      },
    },
  },
});

