"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _Accordion = _interopRequireDefault(require("./Accordion.scss?module"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Accordion {
  static getMethods() {
    const h = this.$createElement;
    return {
      drawAccordion() {
        let accordion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        const h = this.$createElement;
        var {
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
                "aria-expanded": "true",
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
            var head_id = head.id;
            var content_id = content.id;
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
              "class": "card"
            }, [renderHead(params), renderContent(params)]);
          };
        }
        if (!render || typeof render != "function") {
          render = function render() {
            let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var {
              cards = []
            } = params;
            var accordion_id = "accordion-".concat(Date.now());
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
              }
            }, [cards]);
          };
        }
        return render({
          cards
        });
      }
    };
  }
}
var _default = Accordion;
exports.default = _default;