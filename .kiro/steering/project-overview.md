# 项目总览

## 项目定位
`interview-taro-app`：基于 `image.png` 还原的收货地址列表示例。用于面试作品展示与团队内部 UI 组件验证。

## 技术栈
- **框架**：Taro 3.6.28
- **语言**：TypeScript 5
- **UI**：React 18（函数组件 + Hooks）
- **样式**：SCSS + rpx（750 设计稿）
- **构建**：webpack 5
- **平台**：微信小程序 + H5

## 页面清单
| 路径 | 职责 |
| --- | --- |
| `pages/index` | 首页，跳转入地址列表 |
| `pages/addressList` | 收货地址列表（核心业务页） |

## 目录约定
- `src/pages/<page>/index.tsx`：页面组件
- `src/pages/<page>/index.scss`：页面样式
- `src/pages/<page>/index.config.ts`：页面配置（`definePageConfig`）
- `src/assets/`：静态资源（图片放子目录 `icons/`、`images/`）
- `config/index.ts`：Taro 编译配置（改动需谨慎）

## 开发命令
```bash
npm run dev:h5          # H5 开发 (localhost:10086)
npm run dev:weapp       # 微信小程序 watch
npm run build:h5        # H5 生产构建
npm run build:weapp     # 微信小程序生产构建
```
