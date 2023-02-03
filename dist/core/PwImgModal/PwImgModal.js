"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _V02Component = require("../../vue/helper/V02Component");
var _PwImgModal = _interopRequireDefault(require("./PwImgModal.scss?module"));
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
var _modalFunction = require("../../functions/modalFunction.js");
var _PwImg = _interopRequireDefault(require("../PwImg/PwImg"));
var _Modal = _interopRequireDefault(require("./Modal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _V02Component.C.make({
  $render() {
    const h = this.$createElement;
    var {
      $config
    } = this;
    var {
      url,
      className = "",
      backdrop
    } = $config;
    var onClick = () => {
      (0, _modalFunction.showModal)(_Modal.default, {
        url,
        backdrop
      });
    };
    return h("img", {
      "class": (0, _classnames.default)(className, "pw_img"),
      "attrs": {
        "src": url
      },
      "on": {
        "click": onClick
      }
    });
  }
});
exports.default = _default;