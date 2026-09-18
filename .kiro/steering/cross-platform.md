# 多端兼容性规范

## 目标端
| 端 | Taro 命令 | 备注 |
| --- | --- | --- |
| 微信小程序 | `dev:weapp` / `build:weapp` | 主目标端 |
| H5 | `dev:h5` / `build:h5` | 浏览器 |
| 支付宝小程序 | `dev:alipay` / `build:alipay` | 需 `@tarojs/plugin-platform-alipay@<同 Taro 版本>` |
| 抖音小程序 | `dev:tt` / `build:tt` | 需 `@tarojs/plugin-platform-tt@<同 Taro 版本>` |
| React Native | `dev:rn` / `build:rn` | 需 `@tarojs/plugin-platform-rn` + `react-native` + 原生平台工具链 |

**要求**：同一份 `src/` 代码编译到上述所有端时，视觉与交互尽可能一致。视觉一致性 ≥ 95%（允许 1 处微调），交互一致性 100%。

### ⚠️ 依赖版本对齐规则
所有 `@tarojs/*` 包必须版本一致（本项目当前锁 3.6.28）。安装新 platform plugin 时**必须显式带版本号**：

```bash
# ✅ 正确
npm install @tarojs/plugin-platform-alipay@3.6.28

# ❌ 错误（会拉最新 4.x，触发 ERESOLVE peer dep 冲突）
npm install @tarojs/plugin-platform-alipay
```

升级 Taro 时同步升级全部 `@tarojs/*` 依赖，一次到位。

## 硬性约束（不允许违反）

### 1. 组件层
- 只用 `@tarojs/components` 的通用组件（`View/Text/Image/Button/ScrollView/Input` 等）
- **禁止**直接引入平台 API（如 `wx.xxx` / `my.xxx` / `tt.xxx`）
- 平台差异用 `Taro.getCurrentInstance().router` 或 `process.env.TARO_ENV` 判断
- 不允许 `typeof window !== 'undefined'` 判断端

### 2. 样式层
- 一律用 `rpx`，禁止 `px` / `%` / `vw` / `vh`（`100vh` 例外但仅限页面容器）
- 颜色用十六进制，禁止 `rgb(a)` / `hsl()`（支付宝小程序对 `rgba` 支持不完整）
- 圆角 `border-radius` 值不超过 50%（RN 需要百分比或数值）
- **禁止** `position: fixed`（RN 端不支持，支付宝小程序表现不一致），改用 `position: absolute` 在页面容器内定位
- **禁止** `position: sticky`（H5 独有）
- **禁止** `text-decoration: line-through` 之外的复合 `text-decoration`（RN 不支持）
- **禁止** `text-align: justify`（支付宝 / 抖音支持不完整）
- 阴影用 `box-shadow`，但降级：如果视觉不能接受，接受降级而不是强依赖

### 3. 交互层
- 阻止事件冒泡用 Taro 提供的 `catchtap`（TSX 里写 `onClickCapture` 或封装组件处理）
- **禁止**直接调 `e.stopPropagation()`（H5 语义，小程序端行为不可靠）
- 用 `Taro.showModal` / `Taro.showToast` 而不是原生 `alert` / `confirm`
- 用 `Taro.navigateTo` 而不是 `history.push`

### 4. 图标与图片
- **禁止**使用 SVG dataURL 作为 `<Image src>`（微信 / 支付宝小程序不支持）
- 图标必须落成 `src/assets/icons/*.png` 或 `*.svg`（Taro 会转成 base64）
- 简单勾、叉、箭头等 20 个以内的图标统一走 PNG 位图
- `mode` 属性用 `aspectFit`（跨端最稳），避免 `scaleToFill`

### 5. 尺寸与布局
- 页面容器：`display: flex; flex-direction: column; height: 100vh`
- 底部按钮区：`flex-shrink: 0`，用 `padding-bottom: calc(20rpx + env(safe-area-inset-bottom))` 处理刘海屏
- **禁止** `align-self` 单独居中（支付宝小程序支持不完整）—— 用嵌套 flex 或 `margin: auto`
- **禁止** `gap` 属性（老版微信 / 支付宝小程序不支持），用 `margin` 代替

### 6. 字体
- 字体家族只用系统字体栈：`-apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif`
- 字号最小 20rpx（iOS 无障碍缩放考虑）
- 字重用 400 / 500 / 600 / 700，不用 300 / 800（RN 端部分平台没有）

## 端差异速查表

| 特性 | 微信 | H5 | 支付宝 | 抖音 | RN |
| --- | --- | --- | --- | --- | --- |
| `gap` | ✅ 2022+ | ✅ | ⚠️ 部分 | ⚠️ | ✅ |
| `align-self` | ✅ | ✅ | ⚠️ | ⚠️ | ✅ |
| SVG dataURL | ❌ | ✅ | ⚠️ | ⚠️ | ❌ |
| `env(safe-area-inset-*)` | ✅ | ✅ | ✅ | ✅ | 用 `useSafeAreaInsets` |
| `position: fixed` | ✅ | ✅ | ⚠️ | ⚠️ | ❌ |
| `text-decoration` 复合 | ⚠️ | ✅ | ⚠️ | ⚠️ | ❌ |
| `box-shadow` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `stopPropagation` | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ |
| `Button` 默认样式 | 有 | 有 | 有 | 有 | 无 |

## 代码模式

### 按端分支渲染
```tsx
import Taro from '@tarojs/taro'

const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY

// 图片按端 fallback
const checkIcon = isWeapp || isAlipay
  ? require('../../assets/icons/check.png')
  : checkIconSvg
```

### 阻止冒泡的正确姿势
```tsx
// 推荐：外层 View 承担 toggle，内层按钮加 stopPropagation
<View onClick={onToggle}>
  <View onClick={(e) => e.stopPropagation() as unknown as void} onClickCapture={onEdit}>
    ...
  </View>
</View>

// 更稳的方式：用 Taro 原生 catchtap 通过自定义事件
<TaroView catchTap={onEdit}>...</TaroView>
```

### Button 去默认样式
```scss
.btn::after { border: none; }
.btn {
  padding: 0;
  margin: 0;
  border-radius: 44rpx;
  line-height: 88rpx;
  background: #ff4d6d;
  color: #fff;
}
```

## 检查清单（提交前必过）

- [ ] `npx taro build --type weapp` 通过
- [ ] `npx taro build --type h5` 通过
- [ ] 所有 `<Image>` 用 PNG 或位图，未使用 SVG dataURL
- [ ] 未使用 `position: fixed` / `sticky`
- [ ] 未使用 `e.stopPropagation()` 直接调用（有封装）
- [ ] 未使用 `gap` / `align-self`（有 fallback）
- [ ] 所有颜色为 hex，所有尺寸为 rpx
- [ ] Button 已重置默认样式（`::after` + 边距 + 圆角）
- [ ] 已按目标端做 `Button` 高度对齐
