"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));
var _V02Component = require("../../vue/helper/V02Component");
var _PwRadio = _interopRequireDefault(require("./PwRadio.scss?modules"));
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _V02Component.C.make({
  $render() {
    const h = this.$createElement;
    var {
      $config
    } = this;
    var {
      params = {},
      name = "",
      label = "",
      value = "",
      onChange = () => {},
      className,
      valueChecked = ""
    } = $config;
    var ischecked = false;
    if (valueChecked === value) {
      ischecked = true;
    }
    var change = event => {
      var input = event.currentTarget;
      var isChecked = $(input).prop("checked");
      onChange({
        input,
        instance: this,
        event,
        isChecked
      });
    };
    return h("label", {
      "class": (0, _classnames.default)("field_radio", className)
    }, [h("input", (0, _babelHelperVueJsxMergeProps.default)([{
      "key": (0, _pwComponentsCoreDev.idGenerator)(),
      "ref": "input",
      "attrs": {
        "type": "radio",
        "name": name
      },
      "domProps": {
        "value": value,
        "checked": ischecked
      },
      "on": {
        "change": change
      }
    }, params])), h("span", {
      "class": "radio_indicator"
    }), h("span", {
      "class": "radio_label"
    }, [label])]);
  }
});
exports.default = _default;