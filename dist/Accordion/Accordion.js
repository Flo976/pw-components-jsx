"use strict";

require("core-js/modules/es.array.push.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _classnames = _interopRequireDefault(require("classnames"));
var _Accordion = _interopRequireDefault(require("./Accordion.scss?module"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Accordion {
  static saveFunctions() {
    let accordion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let functions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (accordion.functions && !accordion.savedFunc) {
      accordion.savedFunc = true;
      accordion.functions = _objectSpread(_objectSpread({}, accordion.functions), functions);
    }
  }
  static getMethods() {
    const h = this.$createElement;
    return {
      drawAccordion() {
        let accordion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        const h = this.$createElement;
        var {
          id,
          key,
          cards = [],
          functions = {}
        } = accordion;
        var {
          renderHead,
          renderContent,
          renderCard,
          render
        } = functions;
        if (!cards || !cards.length) {
          return null;
        }
        if (!renderHead || typeof renderHead != "function") {
          renderHead = function renderHead() {
            let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var {
              card = {},
              card_index,
              accordion_id,
              head_id,
              content_id
            } = params;
            var {
              head: {
                text = "",
                render: renderLocal
              }
            } = card;
            if (!renderLocal || typeof renderLocal != "function") {
              renderLocal = () => {
                return text;
              };
            }
            return h("div", {
              "class": "card-header",
              "attrs": {
                "id": head_id
              }
            }, [h("a", {
              "attrs": {
                "href": "#",
                "data-toggle": "collapse",
                "data-target": "#".concat(content_id),
                "aria-controls": content_id
              },
              "class": "btn btn-link"
            }, [renderLocal()])]);
          };
        }
        if (!renderContent || typeof renderContent != "function") {
          renderContent = function renderContent() {
            let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var {
              card = {},
              card_index,
              accordion_id,
              head_id,
              content_id
            } = params;
            var {
              content: {
                text = "",
                render: renderLocal
              }
            } = card;
            if (!renderLocal || typeof renderLocal != "function") {
              renderLocal = () => {
                return text;
              };
            }
            return h("div", {
              "attrs": {
                "id": content_id,
                "aria-labelledby": "#".concat(head_id),
                "data-parent": "#".concat(accordion_id)
              },
              "class": "collapse"
            }, [h("div", {
              "class": "card-body"
            }, [renderLocal()])]);
          };
        }
        if (!renderCard || typeof renderCard != "function") {
          renderCard = function renderCard() {
            let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var {
              card = {},
              card_index,
              accordion_id
            } = params;
            var {
              head = {},
              content = {}
            } = card;
            var card_key = card.key;
            var head_id = head.id;
            var content_id = content.id;
            if (!card_key) {
              card_key = "card-".concat(card_index);
            }
            if (!head_id) {
              head_id = "heading-".concat(card_index);
            }
            if (!content_id) {
              content_id = "collapse-".concat(card_index);
            }
            params = {
              card,
              card_index,
              accordion_id,
              head_id,
              content_id
            };
            return h("div", {
              "class": "card",
              "key": card_key,
              "attrs": {
                "data-index": card_index
              }
            }, [renderHead(params), renderContent(params)]);
          };
        }
        if (!render || typeof render != "function") {
          render = function render() {
            let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var {
              cards = [],
              accordion_id,
              accordion_key
            } = params;
            if (!accordion_id || !accordion_id.length) {
              accordion_id = "accordion-".concat(Date.now());
            }
            if (!accordion_key || !accordion_key.length) {
              accordion_key = "accordion-".concat(Date.now());
            }
            var cards = cards.map((card, i) => {
              params = {
                card,
                card_index: i,
                accordion_id
              };
              return renderCard(params);
            });
            return h("div", {
              "attrs": {
                "id": accordion_id
              },
              "key": accordion_key
            }, [cards]);
          };
        }
        Accordion.saveFunctions(accordion, {
          renderHead,
          renderContent,
          renderCard,
          render
        });
        return render({
          cards,
          accordion_id: id,
          accordion_key: key
        });
      }
    };
  }
}
var _default = Accordion;
exports.default = _default;