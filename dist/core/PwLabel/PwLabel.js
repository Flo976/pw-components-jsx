"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));
var _V02Component = require("../../vue/helper/V02Component");
var _PwLabel = _interopRequireDefault(require("./PwLabel.scss?module"));
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
var _PwField = _interopRequireDefault(require("../PwField/PwField"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _V02Component.C.make({
  $render() {
    const h = this.$createElement;
    var {
      $config
    } = this;
    var {
      label,
      champ,
      className,
      params = {}
    } = $config;
    return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
      "class": (0, _classnames.default)(className, "pw_label")
    }, params]), [h("label", [label, champ])]);
  }
});
exports.default = _default;