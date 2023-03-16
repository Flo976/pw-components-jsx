"use strict";

require("core-js/modules/es.array.push.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _V02Component = require("../../vue/helper/V02Component");
var _classnames = _interopRequireDefault(require("classnames"));
var _PwDatepicker = _interopRequireDefault(require("./PwDatepicker.scss?module"));
var _indexation = require("../../tools/indexation/indexation.js");
require("bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js");
require("bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css");
require("bootstrap-datepicker/dist/locales/bootstrap-datepicker.fr.min.js");
var _pwComponentsJsxDev = require("pw-components-jsx-dev");
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
_moment.default.locale("fr-ca");
var _default = _V02Component.C.make({
  initDatepicker() {
    var {
      $config
    } = this;
    var {
      format = "dd/mm/yyyy",
      language = "fr",
      autoclose = true,
      startView = "years",
      datepickerParams = {},
      onChange = () => {},
      onInit = () => {},
      value
    } = $config;
    var {
      input
    } = this.$refs;
    var datepicker = $(input.$el).datepicker(_objectSpread({
      language,
      format,
      autoclose,
      startView
    }, datepickerParams));
    this.getData().datepicker = datepicker;
    datepicker.datepicker("setDate", value);
    onInit(this);
    datepicker.on("changeDate", event => {
      var value = $(input.$el).val();
      onChange({
        value,
        input: input.$el,
        event
      });
    });
  },
  getValue() {
    return $(this.$refs.input.$el).val();
  },
  setValue(value) {
    var {
      $config
    } = this;
    var {
      setValue = () => {}
    } = $config;
    this.getData().datepicker.datepicker("setDate", value);
    setValue({
      value: $(this.$refs.input.$el).val(),
      instance: this
    });
  },
  handleClickIco(e) {
    e.preventDefault();
    this.getData().datepicker.datepicker("show");
  },
  onReady() {
    var {
      ready
    } = this.getData();
    if (!ready) {
      this.getData().ready = true;
      setTimeout(() => {
        this.initDatepicker();
      }, 100);
    }
  },
  renderIcon() {
    const h = this.$createElement;
    var {
      $config = {}
    } = this;
    var {
      showIcon = true,
      icon = h("svg", {
        "attrs": {
          "viewBox": "0 0 24 24",
          "width": "24",
          "height": "24",
          "stroke": "currentColor",
          "stroke-width": "2",
          "fill": "none",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        },
        "class": "css-i6dzq1"
      }, [h("rect", {
        "attrs": {
          "x": "3",
          "y": "4",
          "width": "18",
          "height": "18",
          "rx": "2",
          "ry": "2"
        }
      }), h("line", {
        "attrs": {
          "x1": "16",
          "y1": "2",
          "x2": "16",
          "y2": "6"
        }
      }), h("line", {
        "attrs": {
          "x1": "8",
          "y1": "2",
          "x2": "8",
          "y2": "6"
        }
      }), h("line", {
        "attrs": {
          "x1": "3",
          "y1": "10",
          "x2": "21",
          "y2": "10"
        }
      })])
    } = $config;
    if (!showIcon) {
      return null;
    }
    return h("span", {
      "class": "icon",
      "on": {
        "click": this.handleClickIco
      }
    }, [icon]);
  },
  $render() {
    const h = this.$createElement;
    this.onReady();
    var {
      $config = {}
    } = this;
    var {
      format = "dd/mm/yyyy",
      label = ""
    } = $config;
    return h("label", {
      "class": "pw_datepicker"
    }, [label, h(_pwComponentsJsxDev.PwInput, {
      "ref": "input",
      "attrs": {
        "config": _objectSpread({
          mask: {
            alias: "datetime",
            inputFormat: format
          }
        }, $config)
      }
    }), this.renderIcon()]);
  }
});
exports.default = _default;