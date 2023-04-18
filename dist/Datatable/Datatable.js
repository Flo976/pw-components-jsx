"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.push.js");
var _classnames = _interopRequireDefault(require("classnames"));
var _Datatable = _interopRequireDefault(require("./Datatable.scss?module"));
var _determinePagination = require("./determinePagination.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Datatable {
  static getMethods() {
    const h = this.$createElement;
    return {
      pluginReoreder() {
        let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return event => {
          var {
            getText,
            field,
            datatable
          } = params;
          var {
            order: old_order = "DESC",
            orderBy = "created_at"
          } = datatable;
          var {
            key: order_key
          } = field;
          var order = "ASC";
          if (orderBy == order_key) {
            order = old_order == "ASC" ? "DESC" : "ASC";
          }
          datatable.orderBy = order_key;
          datatable.order = order;
          datatable.load();
        };
      },
      orderable() {
        let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        const h = this.$createElement;
        var {
          getText,
          field,
          datatable
        } = params;
        var sortClass = () => {
          var cls = "";
          if (datatable.orderBy == field.key) {
            if (datatable.order == "ASC") {
              cls = _Datatable.default.sorting_asc;
            }
            if (datatable.order == "DESC") {
              cls = _Datatable.default.sorting_desc;
            }
          }
          return cls;
        };
        return h("th", {
          "class": (0, _classnames.default)(_Datatable.default.sorting, sortClass()),
          "on": {
            "click": this.pluginReoreder(params)
          }
        }, [h("i", [getText()])]);
      },
      drawTable(datatable) {
        const h = this.$createElement;
        if (!datatable.ready) {
          datatable.ready = true;
          datatable.load();
        }
        var head = () => {
          var ths = () => {
            var {
              head = {}
            } = datatable;
            var {
              fields = []
            } = head;
            return fields.map(function () {
              let field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
              var getText = () => {
                var text = "";
                if (typeof field == "string" || field.tag) {
                  text = field;
                } else {
                  text = field.text;
                }
                return text;
              };
              var render = _ref => {
                let {
                  field,
                  getText,
                  datatable
                } = _ref;
                return h("th", [getText()]);
              };
              if (typeof field == "object" && typeof field.render == "function") {
                render = field.render;
              }
              return render({
                field,
                getText,
                datatable
              });
            });
          };
          return h("thead", [h("tr", [ths()])]);
        };
        var body = () => {
          var trs = () => {
            var {
              body = {}
            } = datatable;
            var {
              data = []
            } = body;
            return data.map(function () {
              let line = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
              var cols = () => {
                var {
                  head = {}
                } = datatable;
                var {
                  fields = []
                } = head;
                var columns = fields.map(function () {
                  let field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                  let index = arguments.length > 1 ? arguments[1] : undefined;
                  var {
                    key
                  } = field;
                  var col = "";
                  if (key !== undefined) {
                    col = line[key];
                  } else {
                    col = line[index];
                  }
                  var render = _ref2 => {
                    let {
                      col
                    } = _ref2;
                    return h("td", [col]);
                  };
                  if (field && typeof field.renderBody == "function") {
                    render = field.renderBody;
                  }
                  return render({
                    field,
                    col,
                    line
                  });
                });
                return columns;
              };
              return h("tr", [cols()]);
            });
          };
          var {
            body = {}
          } = datatable;
          var {
            data = []
          } = body;
          if (!data || data.length == 0) {
            return h("tr", [h("td", {
              "class": "text-center",
              "attrs": {
                "colspan": datatable.head.fields.length
              }
            }, ["Aucun resultat"])]);
          }
          return h("tbody", [trs()]);
        };
        var render = _ref3 => {
          let {
            Style,
            head,
            body
          } = _ref3;
          return h("table", {
            "class": (0, _classnames.default)(Style.table)
          }, [head(), body()]);
        };
        if (datatable && typeof datatable.render == "function") {
          render = datatable.render;
        }
        var pagination = () => {
          var renderPage = _ref4 => {
            let {
              page,
              dot,
              active,
              onClick,
              classNames: cls
            } = _ref4;
            return h("li", {
              "class": (0, _classnames.default)(cls, dot, active),
              "on": {
                "click": onClick
              }
            }, [h("a", {
              "class": "page-link",
              "attrs": {
                "href": "#"
              }
            }, [page])]);
          };
          var renderButtons = _ref5 => {
            let {
              prev,
              next,
              disabled,
              onClick,
              classNames: cls
            } = _ref5;
            var text = prev ? "Précédent" : "Suivant";
            return h("li", {
              "class": (0, _classnames.default)(cls, disabled),
              "on": {
                "click": onClick
              }
            }, [h("a", {
              "class": "page-link",
              "attrs": {
                "href": "#"
              }
            }, [h("span", [text])])]);
          };
          if (datatable && typeof datatable.renderPage == "function") {
            renderPage = datatable.renderPage;
          }
          if (datatable && typeof datatable.renderButtons == "function") {
            renderButtons = datatable.renderButtons;
          }
          var {
            total
          } = body;
          var getNbPage = () => {
            var nbPage = 0;
            nbPage = Math.ceil(total / pagination);
            return nbPage;
          };
          if (getNbPage() <= 1) {
            return null;
          }
          var paginations = (0, _determinePagination.determinePagination)(activePage, getNbPage());
          var pages = () => {
            var result = [];
            paginations.map(page => {
              var active = () => {
                if (page == activePage) {
                  return "active";
                }
                return "";
              };
              var change = () => {
                var pageToGo = page;
                if (typeof pageToGo == "object") {
                  pageToGo = pageToGo.go;
                }
                datatable.action.goToPage(pageToGo);
              };
              if (typeof page == "object") {
                result.push(renderPage({
                  page: "...",
                  active: "",
                  onClick: change,
                  classNames: "page-item paginate_button"
                }));
              } else {
                result.push(renderPage({
                  page: page,
                  active: active(),
                  onClick: change,
                  classNames: "page-item"
                }));
              }
            });
            return result;
          };
          var renderPrev = () => {
            var could = () => {
              if (activePage <= 1) {
                return false;
              }
              return true;
            };
            var action = () => {
              if (!could()) {
                return true;
              }
              datatable.action.goToPage(activePage - 1);
            };
            return renderButtons({
              prev: true,
              next: false,
              disabled: could() ? "" : "disabled",
              isDisabled: !could(),
              onClick: action,
              classNames: "paginate_button page-item prev"
            });
          };
          var renderNext = () => {
            var could = () => {
              if (activePage >= getNbPage()) {
                return false;
              }
              return true;
            };
            var action = () => {
              if (!could()) {
                return true;
              }
              datatable.action.goToPage(activePage + 1);
            };
            return renderButtons({
              prev: false,
              next: true,
              disabled: could() ? "" : "disabled",
              isDisabled: !could(),
              onClick: action,
              classNames: "paginate_button page-item next"
            });
          };
          return h("div", {
            "class": "row"
          }, [h("div", {
            "class": "col-6 pagination_recap"
          }, [h("div", ["Affichage de la page ", activePage, " sur 2"])]), h("div", {
            "class": "col-6 pagination_content"
          }, [h("nav", {
            "attrs": {
              "aria-label": "..."
            }
          }, [h("ul", {
            "class": "pagination"
          }, [renderPrev(), pages(), renderNext()])])])]);
        };
        return h("div", [render({
          Style: _Datatable.default,
          head,
          body
        }), pagination()]);
      }
    };
  }
}
var _default = Datatable;
exports.default = _default;