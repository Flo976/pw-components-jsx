"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));
var _V02Component = require("../../vue/helper/V02Component");
var _PwCheckbox = _interopRequireDefault(require("./PwCheckbox.scss?modules"));
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
      onChange = () => {},
      className,
      checked = false
    } = $config;
    var change = event => {
      var input = event.currentTarget;
      onChange({
        input,
        instance: this,
        event
      });
    };
    return h("label", {
      "class": (0, _classnames.default)("field_checkbox", className)
    }, [h("input", (0, _babelHelperVueJsxMergeProps.default)([{
      "key": (0, _pwComponentsCoreDev.idGenerator)(),
      "ref": "input",
      "attrs": {
        "type": "checkbox",
        "name": name
      },
      "on": {
        "change": change
      },
      "domProps": {
        "checked": checked
      }
    }, params])), h("span", {
      "class": "checkbox_indicator"
    }), h("span", {
      "class": "checkbox_label"
    }, [label])]);
  }
});
exports.default = _default;