# 编码规范

## TypeScript
- `strict: true`，允许 `noImplicitAny: false` 以兼容 Taro 内部类型。
- 页面组件默认导出，业务子组件在同一文件内定义即可（不强行拆分）。
- 类型命名：`interface Xxx` 用于对象，`type Xxx = ...` 用于联合类型（如 `LabelTheme`）。
- 组件 Props 若简单，直接内联 `{ x, y }: { x: number; y: number }`；复杂则抽 `interface`。

## React 组件
- 一律使用函数组件 + Hooks，禁止 class 组件。
- 状态更新用 `useState`，副作用用 `useEffect`（避免在 render 里发请求）。
- 事件处理函数命名 `handleXxx`，props 命名用动词短语（如 `onToggle`、`onEdit`）。
- 列表渲染必须带 `key`，用稳定 id，不用 index。
- 条件渲染：单行用 `&&`，多分支用三元，超三分支抽组件。

## 样式（SCSS）
- 尺寸一律 `rpx`，颜色用十六进制（不使用变量文件，除非项目超过 5 页）。
- BEM 命名：`.address-item` / `.address-item--active` / `.address-item__name`。
- 单个页面样式写在页面同级 `.scss`，不做全局样式文件（`app.scss` 只放 `page {}` 兜底）。
- 布局优先 flex，避免 absolute 定位。
- 使用 `env(safe-area-inset-bottom)` 处理底部安全区。

## Taro API
- 只用官方 `@tarojs/components`（`View/Text/Image/Button/ScrollView`），不引第三方 UI 库。
- API 走 `@tarojs/taro`（`Taro.showToast` / `Taro.navigateTo`）。
- 页面配置写在 `index.config.ts`，通过 `definePageConfig` 声明。
- 页面跳转用 `Taro.navigateTo({ url: '/pages/xxx/index' })`。

## 静态资源
- 图标放 `src/assets/icons/`，图片放 `src/assets/images/`。
- TS 引入：`import icon from '../../assets/icons/xxx.png'`，webpack 自动打包。
- 简单图标可内联 SVG dataURL，避免资源加载开销。

## 代码风格
- 2 空格缩进，无尾随空格。
- 单文件不超过约 300 行；超过考虑拆组件或抽工具函数。
- 中文注释允许，注释解释"为什么"，不解释"做什么"。
- 提交前确保 `npm run build:weapp` 通过。
