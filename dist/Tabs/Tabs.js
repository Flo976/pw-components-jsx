"use strict";

require("core-js/modules/es.array.push.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Tabs {
  static saveFunctions() {
    let tabs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let functions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (tabs.functions && !tabs.savedFunc) {
      tabs.savedFunc = true;
      tabs.functions = _objectSpread(_objectSpread({}, tabs.functions), functions);
    }
  }
  static getMethods() {
    const h = this.$createElement;
    return {
      renderHeads(tabs) {
        const h = this.$createElement;
        var {
          cards = [],
          functions = {},
          type = ""
        } = tabs;
        var {
          renderHeads
        } = functions;
        var drawHeader = () => {
          return cards.map((card, i) => {
            var {
              head = {},
              content = {},
              tabs_id = null
            } = card;
            var head_id = head.id;
            var {
              id: content_id = null
            } = content;
            var card_index = i;
            if (!tabs_id || !tabs_id.length) {
              tabs_id = "tabs-".concat(Date.now());
            }
            if (!head_id) {
              head_id = "heading-".concat(card_index);
            }
            if (!content_id) {
              content_id = "collapse-".concat(card_index);
            }
            var {
              head: {
                text = "",
                render: renderLocal,
                SELECTED = false
              }
            } = card;
            var isActive = "";
            if (SELECTED == true) {
              isActive = "active";
            }
            if (typeof renderLocal != "function") {
              return h("li", {
                "class": "nav-item"
              }, [h("a", {
                "class": (0, _classnames.default)("nav-link", isActive),
                "attrs": {
                  "id": head_id,
                  "data-toggle": "tab",
                  "href": "#".concat(content_id),
                  "role": "tab",
                  "aria-controls": content_id,
                  "aria-selected": SELECTED
                }
              }, [text])]);
            } else {
              return h("li", {
                "class": "nav-item"
              }, [h("a", {
                "class": (0, _classnames.default)("nav-link", isActive),
                "attrs": {
                  "id": head_id,
                  "data-toggle": "tab",
                  "href": "#".concat(id),
                  "role": "tab",
                  "aria-controls": content_id,
                  "aria-selected": SELECTED
                }
              }, [renderLocal()])]);
            }
          });
        };
        var navClass = "";
        if (type && type == "column") {
          navClass = "flex-column";
        }
        if (!renderHeads || typeof renderHeads != "function") {
          renderHeads = tabs => {
            return h("ul", {
              "class": (0, _classnames.default)("nav nav-tabs", navClass),
              "attrs": {
                "role": "tablist"
              }
            }, [drawHeader()]);
          };
        }
        return h("div", [renderHeads(tabs)]);
      },
      renderContents(tabs) {
        const h = this.$createElement;
        var {
          cards = [],
          functions = {}
        } = tabs;
        var {
          renderContents
        } = functions;
        var drawContent = cards => {
          return cards.map((card, i) => {
            var {
              head = {},
              content = {},
              type = "",
              tabs_id = null
            } = card;
            var head_id = head.id;
            var card_index = i;
            var {
              id: content_id = null
            } = content;
            if (!head_id) {
              head_id = "heading-".concat(card_index);
            }
            if (!content_id) {
              content_id = "collapse-".concat(card_index);
            }
            var {
              content: {
                text = "",
                render: renderLocal
              },
              head: {
                SELECTED = false
              }
            } = card;
            if (!renderLocal || typeof renderLocal != "function") {
              renderLocal = () => {
                return text;
              };
            }
            var isActive = "";
            if (SELECTED == true) {
              isActive = "show active";
            }
            return h("div", {
              "class": (0, _classnames.default)("tab-pane fade", isActive),
              "attrs": {
                "id": content_id,
                "role": "tabpanel",
                "aria-labelledby": "#".concat(head_id)
              }
            }, [renderLocal()]);
          });
        };
        if (!renderContents || typeof renderContents != "function") {
          renderContents = tabs => {
            return h("div", {
              "class": "tab-content"
            }, [drawContent(cards)]);
          };
        }
        return h("div", [renderContents(tabs)]);
      },
      drawTabs() {
        var _this = this;
        let tabs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        const h = this.$createElement;
        var {
          id,
          cards = [],
          functions = {}
        } = tabs;
        var {
          renderHead,
          renderContent,
          renderCard,
          render
        } = functions;
        if (!cards || !cards.length) {
          return null;
        }
        if (!render || typeof render != "function") {
          render = function render() {
            let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var {
              tabs_id,
              cards = []
            } = params;
            if (!tabs_id || !tabs_id.length) {
              tabs_id = "tabs-".concat(Date.now());
            }
            return h("div", {
              "attrs": {
                "id": tabs_id
              }
            }, [_this.renderHeads(tabs), _this.renderContents(tabs)]);
          };
        }
        Tabs.saveFunctions(tabs, {
          renderHeads,
          renderContents
        });
        return render({
          tabs_id: id,
          cards
        });
      }
    };
  }
}
var _default = Tabs;
exports.default = _default;