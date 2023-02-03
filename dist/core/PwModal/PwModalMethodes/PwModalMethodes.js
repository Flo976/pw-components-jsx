"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PwModalMethodes = void 0;
class PwModalMethodes {
  static getMethodsJsx() {
    return {
      $$$show() {
        var {
          modal
        } = this.$refs;
        $(modal).modal("show");
      },
      $$$hide() {
        var {
          modal
        } = this.$refs;
        $(modal).modal("hide");
      }
    };
  }
}
exports.PwModalMethodes = PwModalMethodes;