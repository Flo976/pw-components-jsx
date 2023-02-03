"use strict";

require("core-js/modules/es.array.push.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _V01Component = require("../../vue/helper/V01Component");
var _PwModal = _interopRequireDefault(require("./PwModal.scss?module"));
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
var _PwModalMethodes = require("./PwModalMethodes/PwModalMethodes");
var _PwLoading = _interopRequireDefault(require("../PwLoading/PwLoading"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = _V01Component.C.make(_objectSpread(_objectSpread({}, _PwModalMethodes.PwModalMethodes.getMethodsJsx()), {}, {
  $render() {
    const h = this.$createElement;
    var {
      user = {}
    } = this.config;
    var {
      id = "",
      firstname = ""
    } = user;
    var isVisible = id ? false : true;
    var onClick = e => {
      alert("Vous avez modifi\xE9 ".concat(firstname, " ?"));
    };
    return h("div", {
      "class": "modal fade",
      "ref": "modal",
      "attrs": {
        "tabindex": "-1",
        "role": "dialog",
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
      "class": "modal-title"
    }, ["Modal de modification"]), h("button", {
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
    }, [h("p", ["Modification de l'utilisateur ", id, " ", firstname]), h("input", {
      "attrs": {
        "type": "text"
      },
      "domProps": {
        "value": firstname
      }
    }), h(_PwLoading.default, {
      "attrs": {
        "config": {
          isVisible,
          hasConfig: true
        }
      }
    })]), h("div", {
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
      "class": "btn btn-primary",
      "on": {
        "click": onClick
      }
    }, ["Save changes"])])])])]);
  }
}));
exports.default = _default;