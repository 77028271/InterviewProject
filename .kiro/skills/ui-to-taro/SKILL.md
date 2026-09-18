---
name: ui-to-taro
description: 这是一个购物项目
---

# UI 图片 → Taro 页面还原

## 触发场景
- 用户丢进一张图片（`image.png` / 截图 / 设计稿）并要求"实现这个页面"。
- 用户说"参考这张图做一个页面"、"按这个 UI 复现"。

## 工作流程

### Step 1：视觉拆解
用 `read_file` 打开图片（工具会自动以 base64 传给模型），逐项识别：
- **布局结构**：flex 方向、对齐方式、是否 grid、是否有固定底部栏
- **可复用组件**：单选圈、复选框、标签胶囊、头像、图标按钮、渐变按钮等
- **文本层级**：标题 / 正文 / 辅助 / 提示，标注字号与颜色
- **状态态**：默认态、选中态、禁用态、空态

### Step 2：色板与尺寸提取
- 主色：肉眼抓一个近似的十六进制色号，写进 SCSS 顶部注释
- 尺寸按 750 设计稿用 `rpx`，不做 px → rpx 的换算表
- 间距遵循 4 的倍数：`8 / 12 / 16 / 20 / 24 / 32 / 40`

### Step 3：数据契约
- 定义 `interface Xxx` 描述列表项字段
- 字段全部小驼峰：`id / name / phone / address / extra? / labels`
- 可选字段用 `?`
- 联合类型字段用 `type`：`type LabelTheme = 'orange' | 'green' | ...`

### Step 4：组件拆分（单文件）
一个页面文件里定义多个小组件，遵循"先小后大"：

```tsx
function Radio({ checked }: { checked: boolean }) { ... }
function LabelBadge({ text, theme }: { text: string; theme: LabelTheme }) { ... }
function AddressItem({ item, checked, onToggle, onEdit }) { ... }
function AddressListPage() { ... }   // 默认导出
```

### Step 5：样式实现要点
- 选中态：类名切换（`.address-item--active`），不用 inline style
- 单选圈：CSS 圆 + `align-self: center` 垂直居中（父容器 `align-items: flex-start`）
- 图标：优先内联 SVG dataURL，其次 `import icon from '@/assets/icons/xxx.png'`
- 底部安全区：`padding-bottom: calc(20rpx + env(safe-area-inset-bottom))`
- 卡片间距：`margin-bottom` 而非 `gap`（小程序端兼容更好）

### Step 6：交互
- 点击条目切换选中：`setSelectedId(id)`
- 点击图标按钮 `stopPropagation` 阻止冒泡
- 占位交互用 `Taro.showToast({ title, icon: 'none' })`

### Step 7：路由注册
在 `src/app.config.ts` 的 `pages` 数组加入新页面路径。

### Step 8：验证
跑 `npx taro build --type weapp`，确认无编译错误。

## 示例产物

参考本项目的 `src/pages/addressList/index.tsx` + `index.scss`，从 `image.png` 还原。

## 常见坑
1. **Babel 不识别 TSX**：确认 `.babelrc` 有 `presets: [["taro", { ts: true }]]`
2. **H5 缺 Fast Refresh**：devDependencies 加 `@pmmmwh/react-refresh-webpack-plugin` + `react-refresh`
3. **webpack 5.88 + prebundle 崩溃**：`config/index.ts` 里 `compiler.prebundle.enable = false`
4. **`defineAppConfig` 未定义**：在 `src/taro.d.ts` 里 `declare function defineAppConfig(config: any): any`
5. **PNG 导入类型报错**：`src/taro.d.ts` 里 `declare module '*.png'`
