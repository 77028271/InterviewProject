# Prompt：基于 image.png 实现 Taro3 收货地址列表页

> 本文件记录了还原 `image.png` → `src/pages/addressList` 的完整提示词与产出决策。可复制给 AI 助手继续迭代。

## 1. 任务描述（Original Prompt）

```
基于工作区的 image.png 中"收货地址列表"UI，在 Taro3 项目中实现对应页面。

约束：
- 技术栈：Taro 3 + React 18 + TypeScript
- 单文件页面路径：src/pages/addressList/index.tsx + index.scss
- 数据用 mock 数组，不需要真实请求
- 严格还原视觉：单选圈、标签胶囊、地址文本、编辑按钮、选中态底色
- 支持微信小程序端和 H5 端
- 项目从零开始，需要初始化骨架
```

## 2. UI 结构解析（视觉 → 组件）

从 `image.png` 逐条拆解后得到的组件映射：

| 视觉元素 | 组件 | 关键实现 |
| --- | --- | --- |
| 左侧单选圈（选中实心/未选中空心） | `<Radio checked>` | CSS 圆 + 内联 SVG 勾（白色） |
| 类型标签胶囊（常用/公司/…） | `<LabelBadge text theme>` | 6 种 `theme` 变体（orange/green/red/blue/pink/gray） |
| 姓名 + 电话 | `.address-item__name-row` | flex baseline，姓名加粗、电话灰色 |
| 完整地址 | `.address-item__address` | 多行换行、字重正常 |
| 额外备注（如"后餐厅停止接单"） | `.address-item__extra` | 可选字段，`extra` 存在才渲染 |
| 右侧编辑按钮 | `.address-item__edit` | 圆形按钮包 `<Image>`，指向 `edit-icon.png` |
| 选中态底色 | `.address-item--active` | `background: #fff2f3`（淡粉） |
| 底部新增按钮 | `.address-footer__btn` | 渐变胶囊，居中 |

## 3. 数据契约

```ts
type LabelTheme = 'orange' | 'green' | 'red' | 'blue' | 'pink' | 'gray'

interface Address {
  id: number
  name: string
  phone: string
  address: string
  extra?: string                          // 可选备注
  labels: Array<{ text: string; theme: LabelTheme }>
}
```

Mock 数据至少覆盖 image.png 里的 7 条：常用、公司、学校、上次下单、距离最近、父母家、家。第一条应含 `extra: "后餐厅停止接单，请勿配送"`。

## 4. 视觉规范（Design Tokens）

- 主题色：`#ff4d6d`（主红粉）
- 选中背景：`#fff2f3`
- 卡片圆角：`16rpx`
- 标签胶囊：字号 `22rpx`，padding `4rpx 14rpx`，border-radius `10rpx`
- 单选圈：`36rpx`，勾图标 `20rpx`
- 编辑按钮：`32rpx` 图标 + `8rpx` padding + `border-radius: 50%`
- 字号阶梯：标题 `30rpx`（600） / 正文 `26rpx` / 辅助 `22-24rpx`
- 颜色：文本 `#1a1a1a` / 次要 `#333` / 弱化 `#666` / 辅助 `#999`

## 5. 关键实现决策

1. **勾图标**：优先使用 `src/assets/icons/check.png`；如需内联 SVG dataURL 仅限 H5 场景，其他端 fallback 到 PNG。跨端策略详见 `.kiro/steering/cross-platform.md`。
2. **单选圈用 CSS 画圆**，选中态换 `background` 颜色 + 显示勾 PNG。
3. **选中态用类名切换**（`address-item--active`），不用 inline style。
4. **标签颜色拆成 6 个 `label--xxx` 修饰类**，避免每处都写完整色值。
5. **单选圈垂直居中**：外层 flex 顶对齐，用嵌套 flex + `margin: auto 0` 实现居中，不用 `align-self`（跨端不稳）。
6. **ScrollView + flex column 布局**：`address-list flex: 1`，`address-footer` 固定底部，安全区 `env(safe-area-inset-bottom)`。
7. **编辑按钮阻止冒泡**：用 `catchTap` 或 Taro 事件对象封装，不用 `e.stopPropagation()`（跨端不稳）。
8. **所有样式跨 RN / 微信 / H5 / 支付宝 / 抖音一致**，禁用清单见 `.kiro/steering/cross-platform.md`。

## 6. 交付清单

- [x] `package.json`（Taro 3.6.28 + React 18 + TS 5）
- [x] `.babelrc`（babel-preset-taro，`ts: true`）
- [x] `tsconfig.json`
- [x] `config/index.ts`（关闭 prebundle，规避 webpack 冲突）
- [x] `project.config.json`（微信小程序入口）
- [x] `src/app.{tsx,config.ts,scss}` + `src/taro.d.ts` + `src/index.html`
- [x] `src/pages/index/*`（首页跳转）
- [x] `src/pages/addressList/*`（核心业务页）
- [x] `src/assets/icons/edit-icon.png`（编辑图标）
- [x] 已通过 `taro build --type weapp` 编译
- [x] 已通过 `taro build --type h5` 编译

## 7. 迭代方向 Prompt

以下片段可继续投喂 AI 迭代：

```
# 添加新增/编辑地址表单页
- 路由：pages/addressForm
- 复用 addressList 里的 Address 类型
- 字段：姓名、电话、地区（三级）、详细地址、备注
- 手机号 11 位校验
- 支持"设为默认地址"复选框
- 保存后 Taro.navigateBack 回到列表并刷新
```

```
# 接入真实 API
- 抽 src/api/address.ts
- 使用 Taro.request + 拦截器封装
- 用 TanStack Query (QueryClientProvider) 管理请求缓存
- 保留 mock 作为 dev fallback
```

```
# 状态管理
- 用 zustand 存"当前选中的地址 id"
- 从 addressList 页面通过 Taro.setStorageSync 存最近地址
- 在 app.tsx 里做持久化 hydration
```

```
# 单元测试
- Vitest + @testing-library/react
- 覆盖 Radio、LabelBadge、AddressItem 三个组件
- Mock Taro.showToast 断言点击行为
```
