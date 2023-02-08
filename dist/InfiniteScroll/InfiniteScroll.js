"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _InfiniteScroll = _interopRequireDefault(require("./InfiniteScroll.scss?module"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class InfiniteScroll {
  static getMethods() {
    const h = this.$createElement;
    return {
      drawInfiniteScroll(infinitescroll) {
        const h = this.$createElement;
        if (!infinitescroll.ready) {
          infinitescroll.ready = true;
          infinitescroll.InitScroll();
          infinitescroll.load();
        }
        var {
          already_max = false,
          emptyText,
          textFullResult
        } = infinitescroll;
        if (!textFullResult || typeof textFullResult != "function") {
          textFullResult = () => {
            return h("div", {
              "class": "textFullResult"
            }, [textFullResult]);
          };
        }
        if (!emptyText || typeof emptyText != "function") {
          emptyText = () => {
            return h("div", {
              "class": "emptyText"
            }, [emptyText]);
          };
        }
        var content = () => {
          var {
            content = {},
            fieldsScroll
          } = infinitescroll;
          var {
            data = []
          } = content;
          if (!fieldsScroll || typeof fieldsScroll != "function") {
            fieldsScroll = function fieldsScroll() {
              let line = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
              var {
                id = ""
              } = line;
              var text = "Fields non d\xE9fini ".concat(id);
              return h("div", {
                "class": "fields"
              }, [text]);
            };
          }
          if ((!data || data.length == 0) && !infinitescroll.isLoading) {
            return emptyText();
          }
          return data.map(function () {
            let line = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return fieldsScroll(line);
          });
        };
        var textMaxScroll = () => {
          if (already_max) {
            return textFullResult();
          }
          return null;
        };
        var render = _ref => {
          let {
            Style,
            content,
            textMaxScroll
          } = _ref;
          return h("div", {
            "class": (0, _classnames.default)(Style.container, "content")
          }, [content()]);
        };
        if (infinitescroll && typeof infinitescroll.render == "function") {
          render = infinitescroll.render;
        }
        return render({
          Style: _InfiniteScroll.default,
          content,
          textMaxScroll
        });
      }
    };
  }
}
var _default = InfiniteScroll;
exports.default = _default;