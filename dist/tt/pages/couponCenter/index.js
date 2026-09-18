"use strict";
(tt["webpackJsonp"] = tt["webpackJsonp"] || []).push([["pages/couponCenter/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/couponCenter/index!./src/pages/couponCenter/index.tsx":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/couponCenter/index!./src/pages/couponCenter/index.tsx ***!
  \******************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_www_interviewProject_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_www_interviewProject_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_www_interviewProject_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-tt/dist/components-react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/cjs/react.production.min.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_icons_gt_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/icons/gt.png */ "./src/assets/icons/gt.png");
/* harmony import */ var _assets_icons_sale_card_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/icons/sale-card.png */ "./src/assets/icons/sale-card.png");
/* harmony import */ var _assets_icons_get_it_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assets/icons/get-it.png */ "./src/assets/icons/get-it.png");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");
/* provided dependency */ var window = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/runtime.esm.js")["window"];













var TABS = [{
  key: 'mine',
  label: '我的优惠券'
}, {
  key: 'member',
  label: '付费会员'
}, {
  key: 'voucher',
  label: '代金券'
}, {
  key: 'receive',
  label: '领券'
}];
var INITIAL_COUPONS = [{
  id: 'm2',
  title: '满减优惠券',
  amount: 20,
  threshold: 100,
  validFrom: '2026.09.01',
  validTo: '2026.10.01',
  ruleText: '规则说明',
  category: 'receive',
  isAppExclusive: false,
  isPlatinum: false
}, {
  id: 'pack1',
  title: '每月领券',
  kind: 'pack',
  amount: 0,
  threshold: 0,
  validFrom: '2026.09.01',
  validTo: '2026.09.30',
  ruleText: '每月可领 4 张专享优惠券',
  category: 'receive',
  isAppExclusive: false,
  isPlatinum: true
}, {
  id: 'm1',
  title: '香辣劲爆鸡米花小份10块',
  subTag: '甄选白羽鸡翅尖',
  amount: 10,
  threshold: 0,
  validFrom: '2025.10.29',
  validTo: '2026.11.29',
  ruleText: '规则说明',
  category: 'receive',
  isAppExclusive: true,
  isPlatinum: true
}, {
  id: 'mb1',
  title: '超级会员月卡',
  amount: 25,
  threshold: 0,
  validFrom: '2026.09.01',
  validTo: '2026.10.01',
  ruleText: '规则说明',
  category: 'receive',
  isAppExclusive: true,
  isPlatinum: true
}, {
  id: 'mb2',
  title: '家庭会员年卡',
  amount: 199,
  threshold: 0,
  validFrom: '2026.09.01',
  validTo: '2027.09.01',
  ruleText: '规则说明',
  category: 'receive',
  isAppExclusive: true,
  isPlatinum: true
}];
var AMOUNTS = [1, 3, 5, 10, 20, 50, 100];
var RULES = ['规则说明：全场通用，限 1 张。', '规则说明：限指定品类使用。', '规则说明：跨店叠加可用。', '规则说明：限今日下单使用。'];
var TITLES = ['限时优惠券', '新人专享券', '回馈礼券', '节日专享券', '积分兑换券'];
var newIdSeq = 1000;
function getNewCoupons(count) {
  var arr = [];
  for (var i = 0; i < count; i++) {
    newIdSeq += 1;
    var amount = AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)];
    var title = TITLES[Math.floor(Math.random() * TITLES.length)];
    arr.push({
      id: "n".concat(newIdSeq, "_").concat(Date.now(), "_").concat(i),
      title: title,
      amount: amount,
      threshold: Math.floor(Math.random() * 5) * 50 + amount * 5,
      validFrom: '2026.09.17',
      validTo: '2026.09.30',
      ruleText: RULES[Math.floor(Math.random() * RULES.length)],
      category: 'receive',
      isAppExclusive: true,
      isPlatinum: true,
      isNew: true
    });
  }
  return arr;
}
function CouponCenterPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('receive'),
    _useState4 = (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState3, 2),
    activeTab = _useState4[0],
    setActiveTab = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(INITIAL_COUPONS),
    _useState6 = (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState5, 2),
    coupons = _useState6[0],
    setCoupons = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState7, 2),
    newIds = _useState8[0],
    setNewIds = _useState8[1];
  // 已领取（永久标记）：控制水印 + "立即使用"按钮文字，不随闪烁结束而清除
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState0 = (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState9, 2),
    claimedIds = _useState0[0],
    setClaimedIds = _useState0[1];
  // 领取中的 pack id（非空则显示"领券中"）
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState10 = (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState1, 2),
    packClaiming = _useState10[0],
    setPackClaiming = _useState10[1];
  // 正在播放"消失动画"的 pack id（消失动画完成后从列表中移除）
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState12 = (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState11, 2),
    packLeaving = _useState12[0],
    setPackLeaving = _useState12[1];
  // 从 pack 飞出的 4 张红包卡片：起点、终点都是相对 lightbox 左上角的像素坐标
  // 运行时逐帧动画：current 是当前帧的 x/y，target 是终点
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState14 = (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState13, 2),
    flyCards = _useState14[0],
    setFlyCards = _useState14[1];
  // RAF 停止标志（防止组件卸载后仍更新）
  var rafStopRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var visibleList = coupons.filter(function (c) {
    return c.category === activeTab;
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return function () {
      rafStopRef.current = true;
    };
  }, []);
  var handleOpen = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    return setOpen(true);
  }, []);
  var handleClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    return setOpen(false);
  }, []);

  /** 查询一个元素相对 lightbox 的中心坐标 */
  var queryCenterRelative = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (selector) {
    return new Promise(function (resolve) {
      try {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().createSelectorQuery().select(selector).boundingClientRect().select('#coupon-lightbox').boundingClientRect().exec(function (res) {
          var el = res && res[0];
          var box = res && res[1];
          if (el && box && el.width > 0 && box.width > 0) {
            resolve({
              x: el.left - box.left + el.width / 2,
              y: el.top - box.top + el.height / 2
            });
          } else {
            resolve(null);
          }
        });
      } catch (e) {
        resolve(null);
      }
    });
  }, []);

  /** 查询一个元素相对 lightbox 的高度（用于计算 pack 消失后新券的位移） */
  var querySizeRelative = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (selector) {
    return new Promise(function (resolve) {
      try {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().createSelectorQuery().select(selector).boundingClientRect().exec(function (res) {
          var el = res && res[0];
          if (el && el.width > 0) {
            resolve({
              width: el.width,
              height: el.height + 20
            });
          } else {
            resolve(null);
          }
        });
      } catch (e) {
        resolve(null);
      }
    });
  }, []);

  /**
   * 抛物线动画：从 (sx, sy) 到 (ex, ey)，时长 duration ms
   * 使用 requestAnimationFrame 逐帧更新 flyCards 状态
   * peak = 抛物线顶点 y（负值 = 上抛）
   */
  var playParabola = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (cards, duration, peaks) {
    // 初始化 4 张卡片状态：全部在起点，opacity 0
    setFlyCards(cards.map(function (c) {
      return (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({}, c), {}, {
        cx: c.startX,
        cy: c.startY,
        scale: 0,
        opacity: 0,
        rotation: 0
      });
    }));
    var startTime = Date.now();
    var _tick = function tick() {
      if (rafStopRef.current) return;
      var elapsed = Date.now() - startTime;
      var t = Math.min(1, elapsed / duration);

      // 每张卡片走独立的抛物线：x 线性，y 抛物线
      var updated = cards.map(function (c, i) {
        var peak = peaks[i] || -100;
        var x = c.startX + (c.endX - c.startX) * t;
        // 抛物线：起点 -> 顶点(peak) -> 终点
        var y = c.startY + (c.endY - c.startY) * t + peak * Math.sin(Math.PI * t);
        // 缩放：0.4 -> 1 -> 0.4（拱形）
        var scale = 1;
        // 全程不旋转
        var rotation = 0;
        // 全程 opacity = 1（到达终点后停留 0.5s 再由外层清理）
        var opacity = 1;
        return (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({}, c), {}, {
          cx: x,
          cy: y,
          scale: scale,
          opacity: opacity,
          rotation: rotation
        });
      });
      setFlyCards(updated);
      if (t < 1) {
        // 使用 setTimeout 而不是 RAF 以兼容小程序
        // 目标帧率 ~60fps，16ms 一帧
        window.setTimeout ? null : null; // H5 only, 但小程序里 setTimeout 也存在
        setTimeout(_tick, 16);
      }
    };
    _tick();
  }, []);
  var handleReceive = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref = (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee2(packId) {
      var isFromPack, count, news, start, packSize, ids, _t, _t2;
      return (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (!packClaiming) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            rafStopRef.current = false; // 重置停止标志
            isFromPack = !!packId;
            count = isFromPack ? 4 : Math.floor(Math.random() * 4) + 1;
            news = getNewCoupons(count);
            if (!isFromPack) {
              _context2.n = 6;
              break;
            }
            setPackClaiming(packId);
            // 先测 pack 中心（作为动画起点，pack 放大用 scale 不改布局位置，所以坐标稳定）
            _context2.n = 2;
            return queryCenterRelative("#pack-".concat(packId));
          case 2:
            _t = _context2.v;
            if (_t) {
              _context2.n = 3;
              break;
            }
            _t = {
              x: 200,
              y: 500
            };
          case 3:
            start = _t;
            _context2.n = 4;
            return querySizeRelative("#pack-".concat(packId));
          case 4:
            _t2 = _context2.v;
            if (_t2) {
              _context2.n = 5;
              break;
            }
            _t2 = {
              width: 0,
              height: 180
            };
          case 5:
            packSize = _t2;
            // ===== 阶段 1：pack 放大动画 =====
            // 由 CSS 处理（.coupon-pack--zoom 0.2s 完成后保持 scale(1.04)）
            // pack 3s 后消失，sale-card 2s 后出现，见后续 setTimeout

            // ===== 阶段 2：点击后 0.5s，4 张 sale-card 出现 + 新券同时插入 =====
            // 新券插在 pack 之后（保持 pack 位置稳定，sale-card 起点坐标有效）
            setTimeout(function () {
              // 插入 4 张新券到 pack 之后
              setCoupons(function (prev) {
                var packIdx = prev.findIndex(function (c) {
                  return c.id === packId;
                });
                if (packIdx === -1) return [].concat((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(prev), (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(news.map(function (n) {
                  return (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({}, n), {}, {
                    isNew: true
                  });
                })));
                var newsCoupons = news.map(function (n) {
                  return (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({}, n), {}, {
                    isNew: true
                  });
                });
                return [].concat((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(prev.slice(0, packIdx + 1)), (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(newsCoupons), (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(prev.slice(packIdx + 1)));
              });
              var ids = news.map(function (n) {
                return n.id;
              });
              setNewIds(ids);
              setClaimedIds(function (prev) {
                return [].concat((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(prev), (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(ids));
              });

              // 等新券入场动画完全结束后（1000ms）再测量，避免 translateY 未归零时测得偏移位置
              setTimeout(/*#__PURE__*/(0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee() {
                var targets, i, t, peaks, packHeight, cardSpacing, offsetX, cards, fadeInStart, _fadeIn;
                return (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context) {
                  while (1) switch (_context.n) {
                    case 0:
                      targets = [];
                      i = 0;
                    case 1:
                      if (!(i < 4)) {
                        _context.n = 4;
                        break;
                      }
                      _context.n = 2;
                      return queryCenterRelative("#coupon-img-".concat(news[i].id));
                    case 2:
                      t = _context.v;
                      targets.push(t || {
                        x: start.x - 80,
                        y: start.y + 260 * i + 130
                      });
                    case 3:
                      i++;
                      _context.n = 1;
                      break;
                    case 4:
                      // 每张卡片不同的抛物线峰值（负值 = 上抛高度）
                      peaks = [-80, -60, -40, -20]; // pack 消失后新券列表整体上移 pack.height，终点 y 需要减去该值
                      // pack 从列表移除的时刻 = pack 消失动画开始时刻 + 动画时长 = t=1200ms + 700ms = t=1900ms
                      // 抛物线飞行期间（t=1260ms → t=3460ms）跨过了 pack 消失时刻，所以终点 y 必须修正
                      packHeight = packSize.height; // 4 张卡片初始位置扇形排成一排（横向间隔 60px，居中于 pack 中心）
                      cardSpacing = 25;
                      offsetX = 30; // 整组卡片向右偏移 60px
                      cards = targets.map(function (end, i) {
                        return {
                          id: i,
                          startX: start.x + offsetX + (i - 1.5) * cardSpacing,
                          startY: start.y,
                          endX: end.x,
                          endY: end.y - packHeight + 18
                        };
                      }); // ===== 阶段 3：4 张 sale-card 淡入（200ms） =====
                      // 全程不旋转（rotation 保持 0）
                      setFlyCards(cards.map(function (c) {
                        return (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({}, c), {}, {
                          cx: c.startX,
                          cy: c.startY,
                          scale: 0.05,
                          opacity: 0,
                          rotation: 0
                        });
                      }));
                      fadeInStart = Date.now();
                      _fadeIn = function fadeIn() {
                        if (rafStopRef.current) return;
                        var t = Math.min(1, (Date.now() - fadeInStart) / 200);
                        var scale = 0.05 + 0.6 * t;
                        var opacity = t;
                        setFlyCards(function (prev) {
                          return prev.length === 0 ? [] : prev.map(function (c) {
                            return (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({}, c), {}, {
                              scale: scale,
                              opacity: opacity
                            });
                          });
                        });
                        if (t < 1) setTimeout(_fadeIn, 16);
                      };
                      setTimeout(_fadeIn, 16);

                      // ===== 阶段 4：停留 0.5s 后启动抛物线 =====
                      // 停留期从 sale-card 出现时刻算起：200ms 淡入 + 500ms 停留 = 700ms 后开始抛物线
                      setTimeout(function () {
                        playParabola(cards, 1200, peaks);
                        // ===== 阶段 5：抛物线到达终点，停留后播放淡出动画再清空 =====
                        // 停留 0.8s 后开始 300ms 淡出（scale 1→0.4, opacity 1→0），淡出结束再清空数组
                        setTimeout(function () {
                          var fadeOutStart = Date.now();
                          var _fadeOut = function fadeOut() {
                            if (rafStopRef.current) return;
                            var t = Math.min(1, (Date.now() - fadeOutStart) / 300);
                            var scale = 1 - 0.6 * t; // 1 -> 0.4
                            var opacity = 1 - t; // 1 -> 0
                            setFlyCards(function (prev) {
                              return prev.length === 0 ? [] : prev.map(function (c) {
                                return (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({}, c), {}, {
                                  scale: scale,
                                  opacity: opacity
                                });
                              });
                            });
                            if (t < 1) {
                              setTimeout(_fadeOut, 16);
                            } else {
                              // 淡出完成后清空数组
                              setFlyCards([]);
                              setPackClaiming(null);
                            }
                          };
                          setTimeout(_fadeOut, 16);
                        }, 1000 + 800);
                      }, 100);

                      // ===== 阶段 6：新券闪烁图层 5.65s 后从 DOM 移除（水印/按钮不变） =====
                      setTimeout(function () {
                        setNewIds(function (prev) {
                          return prev.filter(function (id) {
                            return !ids.includes(id);
                          });
                        });
                      }, 5650);
                    case 5:
                      return _context.a(2);
                  }
                }, _callee);
              })), 500);
            }, 0);

            // ===== 阶段 7：点击后 3.46s，pack 开始消失动画（0.5s） =====
            // 抛物线飞行结束时刻（t=1260ms 开始 + 2200ms 飞行 = t=3460ms）
            // pack 消失必须延后到抛物线飞行结束之后，否则新券列表上移导致终点坐标失效
            setTimeout(function () {
              setPackLeaving(packId);
              setTimeout(function () {
                setPackLeaving(null);
                setCoupons(function (prev) {
                  return prev.filter(function (c) {
                    return c.id !== packId;
                  });
                });
              }, 700);
            }, 1200);
            _context2.n = 7;
            break;
          case 6:
            // 底部"一键领券"：无抛物线，无 pack 领取中状态
            setCoupons(function (prev) {
              var newsCoupons = news.map(function (n) {
                return (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({}, n), {}, {
                  isNew: true
                });
              });
              var idx = prev.findIndex(function (c) {
                return c.category === 'receive' && c.kind !== 'pack';
              });
              if (idx === -1) return [].concat((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(prev), (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(newsCoupons));
              return [].concat((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(prev.slice(0, idx)), (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(newsCoupons), (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(prev.slice(idx)));
            });
            ids = news.map(function (n) {
              return n.id;
            });
            setNewIds(ids);
            setClaimedIds(function (prev) {
              return [].concat((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(prev), (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(ids));
            });
            setTimeout(function () {
              setNewIds(function (prev) {
                return prev.filter(function (id) {
                  return !ids.includes(id);
                });
              });
            }, 3650);
          case 7:
            setActiveTab('receive');
          case 8:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [queryCenterRelative, playParabola, packClaiming]);
  var handleClaim = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (id) {
    setCoupons(function (prev) {
      return prev.map(function (c) {
        return c.id === id ? (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({}, c), {}, {
          isNew: false
        }) : c;
      });
    });
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
    className: "coupon-center",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: "coupon-center__bg"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: "coupon-center__main",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: "coupon-center__title",
        children: "\u6B22\u8FCE\u56DE\u6765"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: "coupon-center__subtitle",
        children: "\u8FD9\u91CC\u53EF\u4EE5\u67E5\u770B\u4E0E\u9886\u53D6\u4F60\u7684\u4F18\u60E0"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: "coupon-center__entry-btn",
        onClick: handleOpen,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: "coupon-center__entry-icon",
          children: "\uD83C\uDF81"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: "coupon-center__entry-text",
          children: "\u4F18\u60E0\u4E2D\u5FC3"
        })]
      })]
    }), open ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: "coupon-center__mask",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: "coupon-center__lightbox",
        id: "coupon-lightbox",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: "coupon-center__header",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: "coupon-center__header-title",
            children: "\u4F18\u60E0\u4E2D\u5FC3"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: "coupon-center__close",
            onClick: handleClose,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: "coupon-center__close-icon",
              children: "\xD7"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: "coupon-tabs",
          children: TABS.map(function (tab) {
            var count = coupons.filter(function (c) {
              return c.category === tab.key;
            }).length;
            var isActive = activeTab === tab.key;
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
              className: "coupon-tabs__item ".concat(isActive ? 'cc' : ''),
              onClick: function onClick() {
                return setActiveTab(tab.key);
              },
              children: [tab.key === 'receive' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                className: "coupon-tabs__badge",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                  className: "coupon-tabs__badge-text",
                  children: "\u6C14\u6CE1\u88C5\u9970"
                })
              }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                className: "coupon-tabs__label",
                children: tab.label
              })]
            }, tab.key);
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: "coupon-center__body",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.ScrollView, {
            className: "coupon-list",
            scrollY: true,
            showScrollbar: false,
            style: {
              height: '100%'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
              className: "coupon-list__inner",
              children: [visibleList.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                className: "coupon-empty",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                  className: "coupon-empty__icon",
                  children: "\uD83D\uDCED"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                  className: "coupon-empty__text",
                  children: "\u6682\u65E0\u4F18\u60E0\u5238\uFF0C\u53BB\u9886\u5238\u5427"
                })]
              }) : null, visibleList.map(function (c) {
                var isFlashing = newIds.indexOf(c.id) >= 0;
                var isClaimed = claimedIds.indexOf(c.id) >= 0;
                if (c.kind === 'pack') {
                  var isClaimingThis = packClaiming === c.id;
                  var isLeaving = packLeaving === c.id;
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                    id: "pack-".concat(c.id),
                    className: "coupon-pack ".concat(isClaimingThis ? 'coupon-pack--zoom' : '', " ").concat(isLeaving ? 'coupon-pack--leaving' : ''),
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                      className: "coupon-pack__body",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                        className: "coupon-pack__icon-wrap",
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                          className: "coupon-pack__icon",
                          children: "\uD83C\uDF81"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                          className: "coupon-pack__icon-tag",
                          children: "\u4E13\u4EAB\u5238\u5305"
                        })]
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                        className: "coupon-pack__info",
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                          className: "coupon-pack__title",
                          children: c.title
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                          className: "coupon-pack__desc",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                            className: "coupon-pack__count",
                            children: "2"
                          }), "\u5F20\u5238\u5F85\u9886\u53D6"]
                        })]
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                        className: "coupon-pack__btn",
                        onClick: function onClick() {
                          return handleReceive(c.id);
                        },
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                          className: "coupon-pack__btn-text",
                          children: isClaimingThis ? '领券中' : '领券'
                        })
                      })]
                    })
                  }, c.id);
                }
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                  className: "coupon-card ".concat(isFlashing ? 'coupon-card--slide-in' : ''),
                  children: [isFlashing ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                    className: "coupon-card__flash-overlay"
                  }) : null, isClaimed ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Image, {
                    className: "coupon-card__get-it-bg",
                    src: _assets_icons_get_it_png__WEBPACK_IMPORTED_MODULE_4__,
                    mode: "aspectFit"
                  }) : null, c.isAppExclusive || c.isPlatinum ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                    className: "coupon-card__app-vip",
                    children: [c.isAppExclusive ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                      className: "coupon-card__app-tag",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                        className: "coupon-card__app-tag-text",
                        children: "APP\u4E13\u4EAB"
                      })
                    }) : null, c.isPlatinum ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                      className: "coupon-card__platinum-tag",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                        className: "coupon-card__platinum-tag-text",
                        children: "\u767D\u91D1\u4F1A\u5458\u4EAB"
                      })
                    }) : null]
                  }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                    className: "coupon-card__top",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                      className: "coupon-card__image-wrap",
                      id: "coupon-img-".concat(c.id),
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                        className: "coupon-card__image-placeholder"
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                      className: "coupon-card__content",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                        className: "coupon-card__row",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                          className: "coupon-card__title",
                          children: c.title
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                        className: "coupon-card__detail",
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                          className: "coupon-card__detail-left",
                          children: [c.subTag ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                            className: "coupon-card__sub-tag",
                            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                              className: "coupon-card__sub-tag-text",
                              children: c.subTag
                            })
                          }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                            className: "coupon-card__amount-row",
                            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                              className: "coupon-card__amount-wrap",
                              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                                className: "coupon-card__amount",
                                children: c.amount
                              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                                className: "coupon-card__amount-unit",
                                children: "\u5143"
                              })]
                            })
                          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                            className: "coupon-card__date",
                            children: [c.validFrom, "\u2013", c.validTo]
                          })]
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                          className: "coupon-card__footer-row",
                          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                            className: "coupon-card__claim-btn ".concat(isClaimed ? 'coupon-card__claim-btn--used' : ''),
                            onClick: function onClick() {
                              return handleClaim(c.id);
                            },
                            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                              className: "coupon-card__claim-btn-text",
                              children: isClaimed ? '立即使用' : '领券'
                            })
                          })
                        })]
                      })]
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                    className: "coupon-card__rule",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                      className: "coupon-card__rule-text",
                      children: c.ruleText
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Image, {
                      className: "coupon-card__rule-icon",
                      src: _assets_icons_gt_png__WEBPACK_IMPORTED_MODULE_2__,
                      mode: "aspectFit"
                    })]
                  })]
                }, c.id);
              })]
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: "coupon-center__footer",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: "coupon-center__receive-btn",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: "coupon-center__receive-btn-text",
              children: packClaiming ? '领券中' : '一键领券'
            })
          })
        }), flyCards.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: "fly-cards",
          children: flyCards.map(function (card) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
              className: "fly-cards__item",
              style: {
                left: "".concat(card.cx, "px"),
                top: "".concat(card.cy, "px"),
                transform: "translate(-50%, -50%) scale(".concat(card.scale, ") rotate(").concat(card.rotation, "deg)"),
                opacity: card.opacity
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Image, {
                className: "fly-cards__img",
                src: _assets_icons_sale_card_png__WEBPACK_IMPORTED_MODULE_3__,
                mode: "aspectFit"
              })
            }, card.id);
          })
        }) : null]
      })
    }) : null]
  });
}
/* harmony default export */ __webpack_exports__["default"] = (CouponCenterPage);

/***/ }),

/***/ "./src/pages/couponCenter/index.tsx":
/*!******************************************!*\
  !*** ./src/pages/couponCenter/index.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/runtime.esm.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_couponCenter_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/couponCenter/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/couponCenter/index!./src/pages/couponCenter/index.tsx");


var config = {"navigationBarTitleText":"优惠中心"};


var inst = Page((0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_couponCenter_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/couponCenter/index', {root:{cn:[]}}, config || {}))


/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_couponCenter_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/assets/icons/get-it.png":
/*!*************************************!*\
  !*** ./src/assets/icons/get-it.png ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/icons/get-it.png";

/***/ }),

/***/ "./src/assets/icons/gt.png":
/*!*********************************!*\
  !*** ./src/assets/icons/gt.png ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/icons/gt.png";

/***/ }),

/***/ "./src/assets/icons/sale-card.png":
/*!****************************************!*\
  !*** ./src/assets/icons/sale-card.png ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/icons/sale-card.png";

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _arrayWithoutHoles; }
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _asyncToGenerator; }
/* harmony export */ });
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _iterableToArray; }
/* harmony export */ });
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _nonIterableSpread; }
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/regenerator.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/regenerator.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _regenerator; }
/* harmony export */ });
/* harmony import */ var _regeneratorDefine_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regeneratorDefine.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorDefine.js");

function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return (0,_regeneratorDefine_js__WEBPACK_IMPORTED_MODULE_0__["default"])(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function d(t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : ((0,_regeneratorDefine_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, (0,_regeneratorDefine_js__WEBPACK_IMPORTED_MODULE_0__["default"])(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, (0,_regeneratorDefine_js__WEBPACK_IMPORTED_MODULE_0__["default"])(u, "constructor", GeneratorFunctionPrototype), (0,_regeneratorDefine_js__WEBPACK_IMPORTED_MODULE_0__["default"])(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", (0,_regeneratorDefine_js__WEBPACK_IMPORTED_MODULE_0__["default"])(GeneratorFunctionPrototype, o, "GeneratorFunction"), (0,_regeneratorDefine_js__WEBPACK_IMPORTED_MODULE_0__["default"])(u), (0,_regeneratorDefine_js__WEBPACK_IMPORTED_MODULE_0__["default"])(u, o, "Generator"), (0,_regeneratorDefine_js__WEBPACK_IMPORTED_MODULE_0__["default"])(u, n, function () {
    return this;
  }), (0,_regeneratorDefine_js__WEBPACK_IMPORTED_MODULE_0__["default"])(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function _regenerator() {
    return {
      w: i,
      m: f
    };
  })();
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/regeneratorDefine.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/regeneratorDefine.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _regeneratorDefine; }
/* harmony export */ });
function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine = function regeneratorDefine(e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine(e, r, n, t);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _toConsumableArray; }
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(r) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(r) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(r) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors"], function() { return __webpack_exec__("./src/pages/couponCenter/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map