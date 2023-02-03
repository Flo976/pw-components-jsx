"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.push.js");
var _V02Component = require("../../vue/helper/V02Component");
var _PwTable = _interopRequireDefault(require("./PwTable.scss?module"));
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
var _PwLoading = _interopRequireDefault(require("../PwLoading/PwLoading.jsx"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _V02Component.C.make({
  getData() {
    return (0, _pwComponentsCoreDev.getData)(this);
  },
  setRows() {
    let rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var data = this.getData();
    data.rows = rows;
    this.refresh();
  },
  setCols() {
    let cols = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var data = this.getData();
    data.cols = cols;
    this.refresh();
  },
  getClassOrderOf(key) {
    var classname = "sorting";
    var {
      order = {}
    } = this.$config;
    var {
      rowKey = "created_at",
      direction = "DESC"
    } = order;
    if (rowKey == key) {
      if (direction == "ASC") {
        classname = "sorting sorting_asc";
      }
      if (direction == "DESC") {
        classname = "sorting sorting_desc";
      }
    }
    return classname;
  },
  onReady() {
    var {
      ready = false
    } = this.getData();
    if (!ready) {
      ready = true;
      this.getData().ready = ready;
      setTimeout(() => {
        this.refresh();
      }, 1000);
    }
  },
  $render() {
    var _this = this;
    const h = this.$createElement;
    this.onReady();
    var {
      $config = {}
    } = this;
    var {
      cols: defaultCols = [],
      rows: defaultRows = [],
      emptyMessage = "Aucune donnée trouvée",
      initMessage = "Chargement en cours ...",
      mode,
      hasInitialMessage = false,
      className = "",
      isVisibleLoading = false,
      hasConfig = false,
      hasCheckboxSelection = false,
      isAllRowsChecked = false,
      handleChangeOrder = () => {},
      handleChangeCheckboxHead = () => {},
      handleChangeCheckboxBody = () => {},
      instance_table = null
    } = $config;
    var data = this.getData();
    var {
      cols = defaultCols,
      rows = defaultRows
    } = data;
    if (hasConfig) {
      rows = defaultRows;
      cols = defaultCols;
    }
    data.cols = cols;
    data.rows = rows;
    var th = () => {
      var ths = () => {
        var ths = [];
        if (hasCheckboxSelection) {
          ths.push(h("th", {
            "attrs": {
              "scope": "col"
            }
          }, [h("input", {
            "attrs": {
              "type": "checkbox"
            },
            "class": "",
            "domProps": {
              "checked": isAllRowsChecked
            },
            "on": {
              "change": handleChangeCheckboxHead
            }
          })]));
        }
        cols.map(function () {
          let col = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var {
            text = "",
            rowKey = "",
            isOrderable = false
          } = col;
          if (isOrderable) {
            ths.push(h("th", {
              "attrs": {
                "scope": "col"
              },
              "class": (0, _classnames.default)(_this.getClassOrderOf(rowKey)),
              "on": {
                "click": handleChangeOrder(rowKey)
              }
            }, [text]));
          } else {
            ths.push(h("th", {
              "attrs": {
                "scope": "col"
              }
            }, [text]));
          }
        });
        return ths;
      };
      return h("tr", [ths()]);
    };
    var trs = () => {
      var empty = () => {
        var colspan = () => {
          return cols.length;
        };
        return h("tr", [h("td", {
          "attrs": {
            "colspan": colspan()
          },
          "class": "text-center"
        }, [emptyMessage])]);
      };
      var init = () => {
        var colspan = () => {
          return cols.length;
        };
        return h("tr", [h("td", {
          "attrs": {
            "colspan": colspan()
          },
          "class": "text-center"
        }, [initMessage])]);
      };
      var {
        loading
      } = this.$refs;
      if (!loading) {
        return null;
      }
      var {
        isVisible
      } = loading;
      if (hasConfig) {
        isVisible = () => {
          return isVisibleLoading;
        };
      }
      if (isVisible() && (!rows || rows.length == 0)) {
        return init();
      }
      if (!rows || !rows.length) {
        return empty();
      }
      return rows.map(function () {
        let row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        let index = arguments.length > 1 ? arguments[1] : undefined;
        var colsElement = () => {
          var tds = [];
          if (hasCheckboxSelection) {
            var {
              checked = false
            } = row;
            tds.push(h("td", [h("input", {
              "attrs": {
                "type": "checkbox"
              },
              "class": "",
              "domProps": {
                "checked": checked
              },
              "on": {
                "change": handleChangeCheckboxBody(index)
              }
            })]));
          }
          cols.map(function () {
            let col = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var {
              rowKey,
              onRender = function () {
                let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var {
                  value
                } = params;
                return value;
              }
            } = col;
            var {
              [rowKey]: value = ""
            } = row;
            var params = {
              line: row,
              key: rowKey,
              value,
              instance_pwdatable: instance_table
            };
            tds.push(h("td", [onRender(params)]));
          });
          return tds;
        };
        var tr = () => {
          return h("tr", [colsElement()]);
        };
        return tr();
      });
    };
    var getDesign = () => {
      if (mode == "striped") {
        return "table-striped";
      }
      return "";
    };
    return h("div", {
      "class": "position-relative"
    }, [h("table", {
      "class": (0, _classnames.default)("table", getDesign(), className)
    }, [h("thead", [th()]), h("tbody", [trs()])]), h(_PwLoading.default, {
      "ref": "loading",
      "attrs": {
        "config": {
          isVisible: isVisibleLoading,
          hasConfig
        }
      }
    })]);
  }
});
exports.default = _default;