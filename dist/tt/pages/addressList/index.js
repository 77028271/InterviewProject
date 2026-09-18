"use strict";
(tt["webpackJsonp"] = tt["webpackJsonp"] || []).push([["pages/addressList/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/addressList/index!./src/pages/addressList/index.tsx":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/addressList/index!./src/pages/addressList/index.tsx ***!
  \****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_www_interviewProject_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/cjs/react.production.min.js");
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-tt/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_icons_check_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/icons/check.png */ "./src/assets/icons/check.png");
/* harmony import */ var _assets_icons_edit_icon_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/icons/edit-icon.png */ "./src/assets/icons/edit-icon.png");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");









/**
 * 标签分类
 * - system：系统判定标签（常用 / 上次下单 / 距离最近）
 * - custom：用户备注标签（父母家 / 家 / 公司 …）
 */

/**
 * 收货地址
 * - systemLabels：系统判断出的标签
 * - customLabels：用户自己写/选的备注标签
 * - closesIn：距离餐厅停止接收订单的剩余秒数（倒计时）
 */

/** 秒 → "HH:MM:SS"；已过 0 显示 "已停止" */
function formatCountdown(total) {
  if (total <= 0) return '已停止';
  var h = Math.floor(total / 3600);
  var m = Math.floor(total % 3600 / 60);
  var s = total % 60;
  var pad = function pad(n) {
    return n < 10 ? "0".concat(n) : "".concat(n);
  };
  return "".concat(pad(h), ":").concat(pad(m), ":").concat(pad(s));
}

/**
 * 倒计时标签显示策略：
 * - 0 秒        → 显示"已停止"（红）
 * - 0 < t <= 5 分钟 → 显示"剩 HH:MM:SS"（红，紧迫感）
 * - t > 5 分钟  → 不显示
 * 返回 null 表示隐藏标签。
 */

function getCountdownView(total) {
  if (total <= 0) return {
    theme: 'gray',
    text: '已停止'
  };
  if (total <= 5 * 60) return {
    theme: 'red',
    text: "".concat(formatCountdown(total), " \u540E\u9910\u5385\u505C\u6B62\u63A5\u5355")
  };
  return null;
}

/**
 * 系统标签 → 蓝色（信息中性，系统判断）
 * 用户备注 → 橙色（用户输入，暖色区分）
 * 倒计时   → 红/灰（紧迫感 vs 充裕）
 */
/**
 * 系统标签 → 淡粉（系统判定专属，与用户备注橙色/倒计时红色视觉区分）
 * 用户备注 → 橙色（用户输入，暖色区分）
 * 倒计时   → 红（< 5min 或已停止时的紧迫感）
 */
function themeForSystemLabel(_label) {
  return 'system';
}
function themeForCustomLabel(_label) {
  return 'orange';
}
var MOCK_ADDRESSES = [{
  id: 1,
  name: '小明',
  phone: '138****8888',
  address: '北京市 朝阳区 建国路 88 号 SOHO 现代城 3-1205',
  systemLabels: ['常用'],
  customLabels: ['公司'],
  isDefault: true,
  closesIn: 2 * 3600 + 15 * 60 + 30 // 2:15:30
}, {
  id: 2,
  name: '小红',
  phone: '139****6666',
  address: '上海市 浦东新区 张江高科技园区 科苑路 88 号上海市 浦东新区 张江高科技园区 科苑路 88 号8 号上海市 浦东新区 张江高科技园区 科苑路 88 号',
  systemLabels: ['上次下单', '距离最近'],
  customLabels: ['父母家'],
  isDefault: false,
  closesIn: 45 * 60 + 12 // 00:45:12，触发紧急红
}, {
  id: 3,
  name: '小王',
  phone: '137****2222',
  address: '广州市 天河区 珠江新城 华穗路 406 号 富力盈泰大厦',
  systemLabels: ['常用'],
  customLabels: ['家'],
  isDefault: false,
  closesIn: 0 * 3600 + 5 * 60 // 4:08:00
}, {
  id: 4,
  name: '小赵',
  phone: '136****3333',
  address: '深圳市 南山区 科技园 深南大道 10000 号 阿里中心 T4 栋',
  systemLabels: [],
  customLabels: ['健身房'],
  isDefault: false,
  closesIn: 0 // 已停止接单
}, {
  id: 5,
  name: '小小',
  phone: '136****3333',
  address: '深圳市 南山区 科技园 深南大道 10000 号 阿里中心 T4 栋圳市 南山区 科技园 深南大道 10000 号 阿里中心 T4 栋圳市 南山区 科技园 深南大道 10000 号 阿里中心 T4 栋',
  systemLabels: [],
  customLabels: [],
  isDefault: false,
  closesIn: 1 * 3600 + 5 * 60 // 4:08:00
}];
var LabelBadge = function LabelBadge(_ref) {
  var theme = _ref.theme,
    children = _ref.children,
    extraClass = _ref.extraClass;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
    className: "label label--".concat(theme).concat(extraClass ? " ".concat(extraClass) : ''),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
      children: children
    })
  });
};
var Radio = function Radio(_ref2) {
  var checked = _ref2.checked;
  return checked ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
    className: "radio radio--checked",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Image, {
      className: "radio__icon",
      src: _assets_icons_check_png__WEBPACK_IMPORTED_MODULE_2__,
      mode: "aspectFit"
    })
  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
    className: "radio radio--empty"
  });
};
var AddressItem = function AddressItem(_ref3) {
  var item = _ref3.item,
    onSelect = _ref3.onSelect,
    onEdit = _ref3.onEdit;
  // 每个条目独立倒计时；用局部 state 避免整表刷新
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(item.closesIn),
    _useState2 = (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState, 2),
    seconds = _useState2[0],
    setSeconds = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (seconds <= 0) return;
    var t = setInterval(function () {
      setSeconds(function (s) {
        return s > 0 ? s - 1 : 0;
      });
    }, 1000);
    return function () {
      return clearInterval(t);
    };
  }, [seconds]);
  var countdownView = getCountdownView(seconds);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
    className: "address-item".concat(item.isDefault ? ' address-item--active' : ''),
    onClick: function onClick() {
      return onSelect(item.id);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: "address-item__radio-wrap",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Radio, {
        checked: item.isDefault
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: "address-item__body",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
        className: "address-item__content",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
          className: "address-item__labels",
          children: [item.systemLabels.map(function (l, i) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(LabelBadge, {
              theme: themeForSystemLabel(l),
              children: l
            }, "s-".concat(i));
          }), item.customLabels.map(function (l, i) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(LabelBadge, {
              theme: themeForCustomLabel(l),
              children: l
            }, "c-".concat(i));
          }), countdownView ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(LabelBadge, {
            theme: countdownView.theme,
            extraClass: "label--countdown",
            children: countdownView.text
          }) : null]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
          className: "address-item__address",
          children: item.address
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
          className: "address-item__name-row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
            className: "address-item__name",
            children: item.name
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
            className: "address-item__phone",
            children: item.phone
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
        className: "address-item__edit-wrap",
        onClick: function onClick() {
          return onEdit(item.id);
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Image, {
          className: "address-item__edit-icon",
          src: _assets_icons_edit_icon_png__WEBPACK_IMPORTED_MODULE_3__,
          mode: "aspectFit"
        })
      })]
    })]
  });
};
var AddressListPage = function AddressListPage() {
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(MOCK_ADDRESSES),
    _useState4 = (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState3, 2),
    list = _useState4[0],
    setList = _useState4[1];
  var handleSelect = function handleSelect(id) {
    setList(function (prev) {
      return prev.map(function (a) {
        return (0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,D_www_interviewProject_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({}, a), {}, {
          isDefault: a.id === id
        });
      });
    });
  };
  var handleEdit = function handleEdit(id) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: "\u7F16\u8F91\u5730\u5740 #".concat(id),
      icon: 'none'
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
    className: "address-page",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.ScrollView, {
      scrollY: true,
      className: "address-list",
      children: list.map(function (item) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(AddressItem, {
          item: item,
          onSelect: handleSelect,
          onEdit: handleEdit
        }, item.id);
      })
    })
  });
};
/* harmony default export */ __webpack_exports__["default"] = (AddressListPage);

/***/ }),

/***/ "./src/pages/addressList/index.tsx":
/*!*****************************************!*\
  !*** ./src/pages/addressList/index.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/runtime.esm.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_addressList_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/addressList/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/addressList/index!./src/pages/addressList/index.tsx");


var config = {"navigationBarTitleText":"收货地址"};


var inst = Page((0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_addressList_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/addressList/index', {root:{cn:[]}}, config || {}))


/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_addressList_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/assets/icons/check.png":
/*!************************************!*\
  !*** ./src/assets/icons/check.png ***!
  \************************************/
/***/ (function(module) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADQSURBVEhL7ZIhEsIwFESRSCSSIyCRSI6ARCKRSBySoyA5AhIJN0AiUX3LBJI28wkQSgWiTzXJZrfzs51OS8s3SOrbvcaQNAauwNye/YykAXBRxdJqaiOpBxyDM3B2gVZXG2AXmbsRjaymNsCmHMojYGo1SSQN7Z7FPaYxX1tNEkkzf2dlzwKhMZH51mqSAJPqn+48hdjGAAdJXatL4oTxo3nKkEYa8y6kscakQoC9Wec15hWpkEB2Yz4RhxRFcfLmeY3JxYcs3LcbS3ZjWv6GGykgc23g2SfAAAAAAElFTkSuQmCC";

/***/ }),

/***/ "./src/assets/icons/edit-icon.png":
/*!****************************************!*\
  !*** ./src/assets/icons/edit-icon.png ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/icons/edit-icon.png";

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors"], function() { return __webpack_exec__("./src/pages/addressList/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map