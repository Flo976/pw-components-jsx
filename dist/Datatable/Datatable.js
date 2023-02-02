"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _Datatable = _interopRequireDefault(require("./Datatable.scss?module"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Datatable {
  static getMethods() {
    const h = this.$createElement;
    return {
      draw() {
        const h = this.$createElement;
        return h("div", {
          "class": (0, _classnames.default)(_Datatable.default.red)
        }, ["Hello Table"]);
      }
    };
  }
}
var _default = Datatable;
exports.default = _default;