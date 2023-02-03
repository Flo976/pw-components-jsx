"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _V01Component = require("../../vue/helper/V01Component");
var _classnames = _interopRequireDefault(require("classnames"));
var _PwModalExample = _interopRequireDefault(require("./PwModalExample.scss?module"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _V01Component.C.make({
  getData() {
    var data = (0, _pwComponentsCoreDev.getData)(this);
    return (0, _pwComponentsCoreDev.getData)(this);
  },
  show() {
    var {
      modal
    } = this.$refs;
    $(modal).modal("show");
  },
  hide() {
    var {
      modal
    } = this.$refs;
    $(modal).modal("hide");
  },
  $render() {
    const h = this.$createElement;
    return h("div", {
      "class": "modal fade",
      "ref": "modal",
      "attrs": {
        "id": "exampleModal",
        "tabindex": "-1",
        "role": "dialog",
        "aria-labelledby": "exampleModalLabel",
        "aria-hidden": "true"
      }
    }, [h("div", {
      "class": "modal-dialog",
      "attrs": {
        "role": "document"
      }
    }, [h("div", {
      "class": "modal-content"
    }, [h("div", {
      "class": "modal-header"
    }, [h("h5", {
      "class": "modal-title",
      "attrs": {
        "id": "exampleModalLabel"
      }
    }, ["Modal title"]), h("button", {
      "attrs": {
        "type": "button",
        "data-dismiss": "modal",
        "aria-label": "Close"
      },
      "class": "close"
    }, [h("span", {
      "attrs": {
        "aria-hidden": "true"
      }
    }, ["\xD7"])])]), h("div", {
      "class": "modal-body"
    }, ["..."]), h("div", {
      "class": "modal-footer"
    }, [h("button", {
      "attrs": {
        "type": "button",
        "data-dismiss": "modal"
      },
      "class": "btn btn-secondary"
    }, ["Close"]), h("button", {
      "attrs": {
        "type": "button"
      },
      "class": "btn btn-primary"
    }, ["Save changes"])])])])]);
  }
});
exports.default = _default;