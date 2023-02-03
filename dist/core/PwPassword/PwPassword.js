"use strict";

require("core-js/modules/es.array.push.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _V02Component = require("../../vue/helper/V02Component");
var _PwPassword = _interopRequireDefault(require("./PwPassword.scss?module"));
var _classnames = _interopRequireDefault(require("classnames"));
var _inputmask = _interopRequireDefault(require("inputmask"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
var _PwInput = _interopRequireDefault(require("../PwInput/PwInput"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = _V02Component.C.make({
  getLocalData() {
    var {
      $config
    } = this;
    var {
      showPassword: showPasswordDefault = false
    } = $config;
    var {
      showPassword = showPasswordDefault
    } = this.getData();
    this.getData().showPassword = showPassword;
    return this.getData();
  },
  renderEyeOff() {
    const h = this.$createElement;
    var {
      $config
    } = this;
    var {
      eyeOff = () => {
        return null;
      }
    } = $config;
    if (eyeOff()) {
      return eyeOff();
    }
    return h("svg", {
      "attrs": {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "24",
        "height": "24",
        "viewBox": "0 0 24 24",
        "fill": "none",
        "stroke": "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      },
      "class": "feather feather-eye-off"
    }, [h("path", {
      "attrs": {
        "d": "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
      }
    }), h("line", {
      "attrs": {
        "x1": "1",
        "y1": "1",
        "x2": "23",
        "y2": "23"
      }
    })]);
  },
  renderEyeOn() {
    const h = this.$createElement;
    var {
      $config
    } = this;
    var {
      eyeOn = () => {
        return null;
      }
    } = $config;
    if (eyeOn()) {
      return eyeOn();
    }
    return h("svg", {
      "attrs": {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "24",
        "height": "24",
        "viewBox": "0 0 24 24",
        "fill": "none",
        "stroke": "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      },
      "class": "feather feather-eye"
    }, [h("path", {
      "attrs": {
        "d": "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      }
    }), h("circle", {
      "attrs": {
        "cx": "12",
        "cy": "12",
        "r": "3"
      }
    })]);
  },
  renderEye() {
    var {
      showPassword
    } = this.getLocalData();
    if (showPassword) {
      return this.renderEyeOff();
    } else {
      return this.renderEyeOn();
    }
  },
  getType() {
    var {
      showPassword
    } = this.getLocalData();
    if (showPassword) {
      return "text";
    } else {
      return "password";
    }
  },
  toggleType() {
    var {
      showPassword
    } = this.getLocalData();
    this.getData().showPassword = !showPassword;
    this.refresh();
  },
  $render() {
    const h = this.$createElement;
    var {
      $config
    } = this;
    var {
      params = {},
      delay,
      placeholder = "",
      name,
      onInput = () => {},
      onChange = () => {},
      onBlur = () => {},
      onKeypress = () => {},
      onError = () => {},
      onSuccess = () => {},
      onTyping = () => {},
      className,
      value,
      disabled = false,
      readonly = false,
      required = true,
      mask,
      params = {
        attrs: {}
      },
      getParams = () => {}
    } = $config;
    return h("label", {
      "class": (0, _classnames.default)("field_pwd", className)
    }, [h(_PwInput.default, {
      "attrs": {
        "config": {
          delay,
          type: this.getType(),
          name,
          placeholder,
          required,
          value,
          disabled,
          readonly,
          onChange,
          onInput,
          onBlur,
          onKeypress,
          onError,
          onSuccess,
          onTyping,
          mask,
          params: _objectSpread(_objectSpread({}, params), {}, {
            attrs: _objectSpread({
              autocomplete: "current-password"
            }, params.attrs)
          }),
          getParams
        }
      }
    }), h("span", {
      "class": "eye",
      "on": {
        "click": this.toggleType
      }
    }, [this.renderEye()])]);
  }
});
exports.default = _default;