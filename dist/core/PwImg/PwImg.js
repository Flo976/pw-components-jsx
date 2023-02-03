"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _V02Component = require("../../vue/helper/V02Component");
var _PwImg = _interopRequireDefault(require("./PwImg.scss?module"));
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
      url,
      className = ""
    } = $config;
    return h("img", {
      "class": (0, _classnames.default)(className, "pw_img"),
      "attrs": {
        "src": url
      }
    });
  }
});
exports.default = _default;