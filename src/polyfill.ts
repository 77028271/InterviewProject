/**
 * 支付宝小程序 Worker 环境 polyfill 修复
 *
 * 问题描述：
 * 支付宝小程序在 enablePolyfillWorker=true 时会注入有问题的 ES6 polyfill，
 * 把原生 Map 覆盖为一个不兼容的构造函数，导致 Taro 运行时报错：
 * "TypeError: Constructor Map requires 'new'"
 *
 * 根本原因：
 * Taro 的 EventSource 类 extends Map，支付宝注入的 polyfill Map 不支持 class 继承。
 *
 * 解决策略：
 * 1. 立即保存当前环境的原生 Map（此时可能还是原生实现）
 * 2. 设置定时器，在支付宝 polyfill 注入后恢复原生 Map
 * 3. 通过劫持 Object.defineProperty 阻止后续覆盖
 */

// @ts-nocheck
;(function () {
  // 只在支付宝小程序环境中执行（my 是支付宝小程序全局对象）
  if (typeof my === 'undefined') return

  const g = typeof globalThis !== 'undefined'
    ? globalThis
    : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
        ? self
        : window

  // 保存当前环境的 Map（希望此时还是原生实现）
  const _originalMap = g.Map
  const _originalSet = g.Set
  const _originalPromise = g.Promise

  if (!_originalMap) return

  // 验证是否是原生 Map（通过检查 toString 结果）
  const isNativeMap = _originalMap.toString().indexOf('native code') !== -1 ||
    _originalMap.name === 'Map'

  // 存储到全局，供后续检查使用
  g.__TARO_NATIVE_MAP__ = _originalMap
  g.__TARO_NATIVE_SET__ = _originalSet
  g.__TARO_NATIVE_PROMISE__ = _originalPromise

  /**
   * 恢复原生构造函数
   */
  function restoreNatives() {
    try {
      if (g.Map !== _originalMap) {
        g.Map = _originalMap
      }
      if (g.Set !== _originalSet) {
        g.Set = _originalSet
      }
      if (g.Promise !== _originalPromise) {
        g.Promise = _originalPromise
      }
    } catch (e) {
      // 静默失败
    }
  }

  // 立即恢复一次（应对已经注入的情况）
  restoreNatives()

  // 通过 MutationObserver 或定时轮询持续恢复
  let checkCount = 0
  const maxChecks = 20

  const timer = setInterval(function () {
    checkCount++
    restoreNatives()

    if (checkCount >= maxChecks) {
      clearInterval(timer)
    }
  }, 10)

  // 尽快再恢复一次
  if (typeof setTimeout !== 'undefined') {
    setTimeout(restoreNatives, 0)
    setTimeout(restoreNatives, 50)
    setTimeout(function () {
      clearInterval(timer)
      restoreNatives()
    }, 200)
  }

  // 尝试劫持 Object.defineProperty 来阻止覆盖
  try {
    const _origDefineProperty = Object.defineProperty
    Object.defineProperty = function (obj, prop, descriptor) {
      if (obj === g && (prop === 'Map' || prop === 'Set' || prop === 'Promise')) {
        // 如果是恢复原生值的调用，允许通过
        if (descriptor && descriptor.value === _originalMap) {
          return _origDefineProperty.call(Object, obj, prop, descriptor)
        }
        // 否则阻止覆盖
        return obj
      }
      return _origDefineProperty.call(Object, obj, prop, descriptor)
    }
  } catch (e) {
    // 静默失败
  }

  // 尝试劫持 Object.defineProperties
  try {
    const _origDefineProperties = Object.defineProperties
    Object.defineProperties = function (obj, props) {
      if (obj === g && props) {
        const filteredProps = {}
        for (const key in props) {
          if (key !== 'Map' && key !== 'Set' && key !== 'Promise') {
            filteredProps[key] = props[key]
          }
        }
        return _origDefineProperties.call(Object, obj, filteredProps)
      }
      return _origDefineProperties.call(Object, obj, props)
    }
  } catch (e) {
    // 静默失败
  }
})()