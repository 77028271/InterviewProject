import path from 'path'

const root = path.resolve(__dirname, '..')

const config = {
  projectName: 'interview-taro-app',
  date: '2026-9-17',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  // 按平台拆分输出目录，避免多端 build 产物相互覆盖
  // 微信：dist/weapp/  | 支付宝：dist/alipay/  | 抖音：dist/tt/  | H5：dist/h5/
  outputRoot: process.env.TARO_ENV === 'weapp'
    ? 'dist/weapp'
    : process.env.TARO_ENV === 'alipay'
      ? 'dist/alipay'
      : process.env.TARO_ENV === 'tt'
        ? 'dist/tt'
        : 'dist/h5',
  plugins: [],
  framework: 'react',
  compiler: {
    type: 'webpack5',
    // 关闭依赖预编译，规避 webpack5 + webpack-virtual-modules 版本不兼容
    // 导致的 "finalInputFileSystem._writeVirtualFile is not a function" 崩溃
    prebundle: {
      enable: false
    }
  },

  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    devServer: {
      port: 10086,
      hot: true,
      compress: false
    },
    staticConfig: {
      router: {
        mode: 'hash'
      }
    },
    postcss: {
      autoprefixer: {
        enable: true
      },
      cssModules: {
        enable: false
      }
    }
  },
  // 通过 Taro 的 webpackChain 提升 H5 的 asset/entrypoint 体积阈值
  // Taro H5 编译配置里没有 h5.performance 字段（仅 mini 有），只能通过 chain 改
  // H5 打包了完整 React + ReactDOM + Taro runtime，天然超 244 KiB 阈值，
  // 这里抬到 2 MiB 消除每次编译的 WARNING 噪音（这是提示，不是错误）
  webpackChain (chain) {
    chain.performance
      .maxAssetSize(2048 * 1024)
      .maxEntrypointSize(2048 * 1024)
  }
}

export default config
