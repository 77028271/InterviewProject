---
inclusion: always
---

# Polyfill 安全规则

## 规则 1：禁止用 Polyfill 覆盖原生 API

**指令**：不要编写或引入会覆盖原生 `Map`、`Set`、`Promise`、`Symbol` 等内置对象的 Polyfill 代码。只补真正缺失的能力，不覆盖已有原生实现。

**原因**：支付宝小程序在 `enablePolyfillWorker=true` 时注入的 Polyfill 会覆盖原生 `Map`，导致 `class X extends Map` 报错 `TypeError: Constructor Map requires 'new'`。

**反例（Bad）**：
```js
if (!global.Map) {
  global.Map = function () {
    // 覆盖原生 Map，危险
  };
}
```

**正例（Good）**：
```js
if (!global.Promise) {
  global.Promise = require('promise-polyfill');
}
```

## 规则 2：需要 Map 功能时，使用组合而非继承

**指令**：不要使用 `class X extends Map`，改用组合模式，在类内部持有 `Map` 实例。

**原因**：继承依赖 `Map` 构造函数的完整语义，Polyfill 覆盖后会破坏 `new` 和 `super()` 的行为。

**反例（Bad）**：
```js
class EventSource extends Map {
  constructor() {
    super();
  }
}
```

**正例（Good）**：
```js
class EventSource {
  constructor() {
    this._map = new Map();
  }

  get(key) {
    return this._map.get(key);
  }

  set(key, val) {
    return this._map.set(key, val);
  }
}
```

## 规则 3：多端项目必须显式隔离平台代码

**指令**：涉及 Polyfill、平台 API 或条件编译的代码，必须用 Taro 条件编译标注目标平台。

**原因**：不同小程序平台的 Polyfill 注入策略和原生 API 支持差异巨大，支付宝的 JS 引擎不保证提供 Polyfill，需要规避不支持的内置对象。

**示例**：
```js
// #ifdef ALIPAY
// 支付宝专属逻辑，避免依赖可能被 Polyfill 覆盖的 API
// #endif

// #ifdef WEAPP
// 微信专属逻辑
// #endif
```

## 规则 4：优先使用原生 API，按需引入 Polyfill

**指令**：优先使用原生 API；只补真正缺失的能力；按需引入，不要全局无脑覆盖。

**原因**：Polyfill 是模拟实现，质量参差不齐，可能破坏原生语义或注入顺序。

**反例（Bad）**：
```js
// 无脑全局覆盖
global.Map = require('some-map-polyfill');
```

**正例（Good）**：
```js
// 只补缺失的 Promise
if (!global.Promise) {
  global.Promise = require('promise-polyfill');
}
```

## 规则 5：遇到 Polyfill 相关报错，优先关闭有问题的 Polyfill

**指令**：遇到类似 `Map` 被覆盖的问题，优先考虑关闭 `enablePolyfillWorker` 或对应 Polyfill，而不是直接升级 Taro 版本。关闭前需评估是否影响 Worker 等功能。

**原因**：Taro 4.x 仍可能遇到相同问题，根源在支付宝注入的 Polyfill，不在 Taro 框架版本。

**正例（Good）**：
```js
// 在支付宝小程序编译配置中评估关闭
// enablePolyfillWorker: false
```


## 操作手册：如何关闭支付宝 Polyfill Worker

**报错特征**：`TypeError: Constructor Map requires 'new'` 或 `TypeError: Cannot set properties of undefined (setting 'miniGlobal')`，堆栈定位在 `taro.js` 里 `class X extends Map` 附近。

### 方法 A：IDE 侧关闭（最快）
1. 支付宝小程序开发者工具 → 右上角「详情」/「设置」
2. 找到「本地设置」→ 关闭「ES6 转 ES5」或「使用 ES6 Polyfill」相关开关
3. 基础库版本至少升到 `2.14+`（推荐 `2.20+`），太旧的引擎本身就不支持 class 语法

### 方法 B：产物侧关闭
在 `dist/alipay/mini.project.json` 中显式声明：

```json
{
  "format": 2,
  "enablePolyfillWorker": false,
  "compileType": "mini",
  "minPlatformVersion": 2014
}
```

**注意**：改 `mini.project.json` 后必须重新编译，否则 IDE 会用缓存。

### 方法 C：源码侧规避（长期方案）
- 业务代码禁止 `class X extends Map` / `class X extends Set`
- 需要缓存语义时用组合：`this._cache = new Map()`
- 升级 Taro 到 4.x **不解决此问题**（根因在支付宝 IDE，不在 Taro 版本）

### 常见误区
- ❌ 升级 Taro 到 4.x —— 无效，Polyfill 由支付宝 IDE 注入
- ❌ 升级 react/react-dom 到 18.3.2+ —— 无效，问题不在 React
- ❌ 在 `package.json` 加 `resolutions` 锁版本 —— 无效，同样与版本无关
