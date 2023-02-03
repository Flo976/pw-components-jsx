"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _V02Component = require("vue/helper/V02Component.jsx");
var _PwSpan = _interopRequireDefault(require("./PwSpan.scss?module"));
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
      className
    } = $config;
    return h("div", {
      "class": className
    }, ["SPAN"]);
  }
});
exports.default = _default;