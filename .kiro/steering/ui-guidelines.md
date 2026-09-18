# UI 视觉规范

## 色板

### 主题色
- 主色（品牌红粉）：`#ff4d6d`
- 主色渐变：`linear-gradient(90deg, #ff6b81, #ff4d6d)`

### 状态色
- 选中背景：`#fff2f3`
- 主文本：`#1a1a1a`
- 次要文本：`#333`
- 辅助文本：`#666`
- 弱化文本：`#999`

### 标签色（LabelBadge）
| theme | 文字 | 背景 | 边框 |
| --- | --- | --- | --- |
| orange | `#ff7a45` | `#fff3ec` | `#ffd3bf` |
| green | `#52c41a` | `#f0faeb` | `#c8eab5` |
| red | `#ff4d4f` | `#fff1f0` | `#ffccc7` |
| blue | `#1890ff` | `#e6f7ff` | `#bae7ff` |
| pink | `#eb2f96` | `#fff0f6` | `#ffadd2` |
| gray | `#666` | `#f5f5f5` | `#e0e0e0` |

## 尺寸阶梯（rpx）

### 字号
- 标题 / 姓名：`30rpx`（weight 600）
- 正文 / 地址：`26rpx`
- 辅助 / 电话 / 备注：`22-24rpx`
- 标签胶囊：`22rpx`
- 按钮文字：`28-32rpx`

### 间距
- 卡片内边距：`24rpx`
- 卡片间距：`16rpx`
- 内容行间距：`6-10rpx`

### 圆角
- 卡片：`16rpx`
- 按钮胶囊：`44rpx`（高度的一半）
- 标签胶囊：`10rpx`
- 图标按钮：`50%`（圆形）

## 关键组件尺寸
- 单选圈：`36rpx`（未选中描边 `2rpx`，勾选图标 `20rpx`）
- 编辑按钮图标：`32rpx`，容器 `padding: 8rpx`
- 底部按钮：宽 `100%`，高 `88rpx`

## 布局约定
- 页面容器 `display: flex; flex-direction: column; height: 100vh`
- 列表区 `flex: 1` + `ScrollView scrollY`
- 底部按钮区固定，加 `env(safe-area-inset-bottom)` 处理刘海屏
- 内容顶对齐用 `align-items: flex-start`，需要单独居中的元素用 `align-self: center`

## 动效
- 状态切换：`transition: background-color 0.2s ease`
- 不做入场动画（面试展示场景不需要）

## 可访问性
- 所有可点击区域最小点击热区 ≥ 80rpx × 80rpx
- 文本对比度：主文本对背景 ≥ 4.5:1（`#1a1a1a` on `#fff` 满足）
- 图标按钮，保留可见边框或高对比色
