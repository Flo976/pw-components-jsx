"use strict";

require("core-js/modules/es.array.push.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _V01Component = require("../../vue/helper/V01Component");
var _classnames = _interopRequireDefault(require("classnames"));
var _PwInput = _interopRequireDefault(require("../PwInput/PwInput"));
var _PwTable = _interopRequireDefault(require("../PwTable/PwTable"));
var _PwPagination = _interopRequireDefault(require("../PwPagination/PwPagination"));
var _PwTableDescription = _interopRequireDefault(require("../PwTableDescription/PwTableDescription"));
var _PwDatatable = require("../../classes/PwDatatable.js");
var _pwComponentsCoreDev = require("pw-components-core-dev");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = _V01Component.C.make(_objectSpread(_objectSpread({}, _PwDatatable.PwDatatable.getMethodsJsx()), {}, {
  onReady() {
    var {
      ready = false
    } = this.getData();
    if (!ready) {
      this.getData().ready = true;
      this.loadTable();
    }
  },
  $render() {
    var _this = this;
    const h = this.$createElement;
    this.onReady();
    var {
      cols = [],
      hasCheckboxSelection = false,
      datatableOptions = instance => {}
    } = this.$config;
    var rows = this.getDatas();
    return h("div", {
      "class": "container"
    }, [h("div", {
      "class": "row"
    }, [h("div", {
      "class": "col-9"
    }, [datatableOptions(this)]), h("div", {
      "class": "col-3"
    }, [h(_PwInput.default, {
      "ref": "search",
      "attrs": {
        "config": {
          value: this.getKey(),
          delay: 0,
          onInput: function onInput() {
            let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var {
              value,
              event
            } = params;
            _this.changeSearch(value);
          }
        }
      }
    })]), h("div", {
      "class": "col-12"
    }, [h(_PwTable.default, {
      "ref": "table",
      "attrs": {
        "config": {
          hasConfig: true,
          cols,
          rows,
          isVisibleLoading: this.getLoading(),
          handleChangeOrder: this.handleChangeOrder,
          order: {
            rowKey: this.getOrderBy(),
            direction: this.getOrder()
          },
          hasCheckboxSelection,
          isAllRowsChecked: this.getIsAllRowChecked(),
          handleChangeCheckboxHead: this.handleChangeCheckboxHead,
          handleChangeCheckboxBody: this.handleChangeCheckboxBody,
          instance_table: this
        }
      }
    })]), h("div", {
      "class": "col-6"
    }, [h(_PwTableDescription.default, {
      "attrs": {
        "config": {
          page: this.getPage(),
          size: this.getNbrPagination()
        }
      }
    })]), h("div", {
      "class": "col-6"
    }, [h(_PwPagination.default, {
      "ref": "pagination",
      "attrs": {
        "config": {
          hasConfig: true,
          page: this.getPage(),
          size: this.getNbrPagination(),
          onChange: function onChange() {
            let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var {
              page,
              event
            } = params;
            _this.changePagination(page);
          }
        }
      }
    })])])]);
  }
}));
exports.default = _default;