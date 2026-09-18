# interview-taro-app

基于 **Taro 3.6 + React 18 + TypeScript 5** 的收货地址列表示例。UI 参考 `image.png` 还原。

## 技术栈

- **框架**：Taro 3.6.28
- **语言**：TypeScript 5
- **UI**：React 18（函数组件 + Hooks）
- **样式**：SCSS + rpx（750 设计稿）
- **构建**：webpack 5
- **目标端**：微信小程序 / H5 / 支付宝小程序 / 抖音小程序 / React Native
  - 多端兼容性规范见 `.kiro/steering/cross-platform.md`
  - 核心原则：**一份 `src/` 编译到所有端，视觉一致 ≥ 95%**

## 快速开始

前置要求：Node.js ≥ 16，推荐 18 / 20。

```bash
# 安装依赖
npm install

# H5 开发（浏览器预览）
npm run dev:h5          # http://localhost:10086/

# 微信小程序开发（编译产物到 dist/，用微信开发者工具打开）
npm run dev:weapp

# 生产构建
npm run build:h5
npm run build:weapp
```

## 目录结构

```
interview-taro-app/
├── config/index.ts              # Taro 编译配置（designWidth=750，prebundle 关闭）
├── project.config.json          # 微信小程序项目配置
├── tsconfig.json
├── .babelrc                     # babel-preset-taro (ts: true)
├── package.json
├── image.png                    # 需求 UI 原图
├── prompt.md                    # 还原这份 UI 的 AI 提示词
├── README.md
├── .kiro/                       # Kiro harness（steering / skills / mcp 配置）
│   ├── steering/
│   │   ├── project-overview.md  # 项目总览与技术栈
│   │   ├── coding-standards.md  # 编码规范
│   │   ├── ui-guidelines.md     # UI 视觉规范
│   │   └── cross-platform.md    # 多端兼容性规范（RN/微信/H5/支付宝/抖音）
│   ├── skills/
│   │   └── ui-to-taro/          # 图片 → Taro 页面的还原技能
│   └── settings/
│       └── mcp.json             # MCP 服务器配置
└── src/
    ├── app.tsx                  # 应用入口
    ├── app.config.ts            # 全局路由与窗口配置
    ├── app.scss                 # 全局样式
    ├── taro.d.ts                # defineAppConfig / definePageConfig 声明
    ├── index.html               # H5 入口
    ├── assets/icons/            # 静态资源
    │   └── edit-icon.png
    └── pages/
        ├── index/               # 首页（跳转入口）
        │   ├── index.tsx
        │   ├── index.scss
        │   └── index.config.ts
        └── addressList/         # 收货地址列表页
            ├── index.tsx
            ├── index.scss
            └── index.config.ts
```

## 页面说明

### 首页 `pages/index`
- 单按钮页，点击"进入收货地址列表"跳转到 addressList。

### 地址列表页 `pages/addressList`
核心业务页，还原了 `image.png` 里的收货地址列表：

| 元素 | 实现 |
| --- | --- |
| 单选圈 | `Radio` 组件，选中态粉色实心 + 白色勾（内联 SVG），未选中描边空心圆 |
| 标签胶囊 | `LabelBadge`，6 种色（常用/公司/学校/上次下单/距离最近/父母家/家） |
| 内容块 | 姓名 + 电话 + 完整地址 + 可选备注（如"后餐厅停止接单"） |
| 编辑按钮 | 圆形图标按钮（`src/assets/icons/edit-icon.png`） |
| 选中态 | 整条 `background: #fff2f3`（淡粉） |
| 底部新增 | 渐变胶囊按钮，点击 `Taro.showToast` 占位 |

数据源：`MOCK_ADDRESSES` 7 条 mock 数据（`index.tsx` 顶部）。

## 常见问题

### Q1：`Cannot find module '@pmmmwh/react-refresh-webpack-plugin'`
Taro React + H5 强制启用 Fast Refresh，需要以下依赖（已加入 devDependencies）：
```
@pmmmwh/react-refresh-webpack-plugin@^0.5.10
react-refresh@^0.14.0
```

### Q2：`finalInputFileSystem._writeVirtualFile is not a function`
`webpack-virtual-modules@0.5.0` 与 webpack 5.88 不兼容。修复方式二选一：
- 升级 `webpack-virtual-modules` 到 `^0.6.1`（已加入 devDependencies）
- 在 `config/index.ts` 里关闭 prebundle：
```ts
compiler: {
  type: 'webpack5',
  prebundle: { enable: false }
}
```
本项目已同时应用两者，最稳妥。

### Q3：`options.roots.map is not a function`
`@tarojs/webpack5-prebundle` 内部的 `enhanced-resolve` 版本冲突。通过关闭 prebundle 规避（见 Q2）。

### Q4：修改 SCSS / TSX 不生效
`dev:*` 是 watch 模式，改动会自动重编；如果 dev server 崩了，Ctrl+C 后重跑。

### Q5：`npm install @tarojs/plugin-platform-xxx` 报 ERESOLVE
Taro 生态所有 `@tarojs/*` 包必须版本对齐。不带版本号会拉最新 4.x，与项目锁定的 3.6.28 冲突。

正确写法：
```bash
npm install @tarojs/plugin-platform-alipay@3.6.28
npm install @tarojs/plugin-platform-tt@3.6.28
```

本项目已安装 alipay + tt 两个 plugin，可直接：
```bash
npm run build:alipay
npm run build:tt
```

### Q6：RN 端如何构建
React Native 端需要额外安装：
```bash
npm install @tarojs/plugin-platform-rn@3.6.28 react-native
npx taro build --type rn
```
产物是给 Metro 消费的 JS bundle，最终要在 Xcode / Android Studio 里编译原生壳。Windows 本地无法完整验证，需 Linux/Mac 或 CI。

### Q7：支付宝 IDE 报"访问的页面不存在"
产物本身正确，但 IDE 打开了错误的目录。项目按 `TARO_ENV` 拆分输出：

| 端 | 产物目录 | IDE 打开路径 |
| --- | --- | --- |
| 微信开发者工具 | `dist/weapp/` | `dist/weapp` |
| 支付宝 IDE | `dist/alipay/` | `dist/alipay` |
| 抖音开发者工具 | `dist/tt/` | `dist/tt` |
| H5 | `dist/h5/` | 静态部署到 CDN |

⚠️ **不要用 IDE 打开 `dist/` 根目录**，那里面没有具体的平台产物，只有子目录。

排查步骤：
1. 关闭 IDE 当前项目
2. `Remove-Item -Recurse -Force dist` 清空旧产物
3. `npm run build:alipay` 重新编译
4. IDE 里"新建/导入项目"，路径填 `dist/alipay`（**不要漏 `alipay`**）
5. 用测试 AppID

## 后续可扩展
- 表单：地址新增 / 编辑页面
- 状态管理：接 redux / zustand 持久化"选中地址"
- API：mock 换成真实请求（`Taro.request`）
- 单元测试：Vitest + @testing-library/react
