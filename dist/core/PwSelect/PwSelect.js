"use strict";

require("core-js/modules/es.array.push.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));
var _V02Component = require("../../vue/helper/V02Component");
var _PwSelect = _interopRequireDefault(require("./PwSelect.scss?modules"));
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = _V02Component.C.make({
  initSelect2() {
    var {
      $config
    } = this;
    var {
      showSearchBar = true,
      selectOption = {}
    } = $config;
    var {
      select
    } = this.$refs;
    var selectConfig = {
      //width: "400px",
      selectionCssClass: "pw_select2",
      dropdownCssClass: "pw_select2"
    };
    if (!showSearchBar) {
      selectConfig.minimumResultsForSearch = -1;
    }
    selectConfig = _objectSpread(_objectSpread({}, selectConfig), selectOption);
    $(select).select2(selectConfig);
    $(select).off("select2:select");
    $(select).off("select2:unselect");
    $(select).off("select2:clear");
    $(select).on("select2:select", this.handleSelect2);
    $(select).on("select2:unselect", this.handleSelect2);
    $(select).on("select2:clear", this.handleSelect2);
  },
  reinit() {
    var {
      select
    } = this.$refs;
    setTimeout(() => {
      this.setValue(this.getValue());
      $(select).select2("destroy");
      this.initSelect2();
    }, 100);
  },
  handleSelect2(event) {
    var {
      $config
    } = this;
    var {
      params = {},
      name = "",
      value = "",
      onChange = () => {},
      setValue = () => {},
      className,
      isDirect = false
    } = $config;
    var {
      select
    } = this.$refs;
    var value = $(select).val(); // recuperation value

    this.setValue(value);
    if (isDirect) {
      return onChange(event);
    }
    onChange({
      value,
      event,
      instance: this
    });
  },
  setValue(value) {
    var {
      $config
    } = this;
    var {
      setValue = () => {}
    } = $config;
    var {
      select
    } = this.$refs;
    $(select).val(value);
    $(select).trigger('change');
    setValue({
      value: $(select).val(),
      instance: this
    });
  },
  getValue() {
    var {
      select
    } = this.$refs;
    return $(select).val();
  },
  onReady() {
    var {
      ready = false
    } = this.getData();
    if (!ready) {
      ready = true;
      this.getData().ready = ready;
      setTimeout(() => {
        this.initSelect2();
        var {
          value
        } = this.$config;
        setTimeout(() => {
          this.setValue(value);
          this.reinit();
        }, 100);
      }, 100);
    }
  },
  $render() {
    const h = this.$createElement;
    this.onReady();
    var {
      $config
    } = this;
    var {
      params = {},
      name = "",
      options = [],
      onRender = () => {},
      className,
      multiple = false
    } = $config;
    onRender(this);
    var optionsElements = () => {
      return options.map(function () {
        let option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        let index = arguments.length > 1 ? arguments[1] : undefined;
        var {
          value,
          content,
          params = {}
        } = option;
        return h("option", (0, _babelHelperVueJsxMergeProps.default)([{
          "domProps": {
            "value": value
          }
        }, params]), [content]);
      });
    };
    return h("select", (0, _babelHelperVueJsxMergeProps.default)([{
      "ref": "select",
      "attrs": {
        "name": name,
        "multiple": multiple
      },
      "class": (0, _classnames.default)("pw_select", className)
    }, params]), [optionsElements()]);
  }
});
exports.default = _default;