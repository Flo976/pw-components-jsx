"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));
var _V02Component = require("../../vue/helper/V02Component");
var _classnames = _interopRequireDefault(require("classnames"));
var _PwButton = _interopRequireDefault(require("./PwButton.scss?module"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _V02Component.C.make({
  $render() {
    const h = this.$createElement;
    var {
      $config
    } = this;
    var {
      params = {},
      onClick = () => {},
      disabled = false,
      content = null,
      className = "",
      title,
      tag: Tag = "button"
      //TO THINK : size
    } = $config;
    setTimeout(() => {
      var {
        $refs: {
          element
        }
      } = this;
      if ($(element).tooltip) {
        $(element).tooltip("dispose");
        $(element).tooltip();
      }
    }, 100);
    return h(Tag, (0, _babelHelperVueJsxMergeProps.default)([{
      "ref": "element",
      "attrs": {
        "name": name,
        "disabled": disabled,
        "title": title
      },
      "on": {
        "click": onClick
      },
      "class": (0, _classnames.default)("pw_button", className)
    }, params]), [content]);
  }
});
exports.default = _default;