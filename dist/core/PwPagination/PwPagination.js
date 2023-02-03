"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.push.js");
var _V02Component = require("../../vue/helper/V02Component");
var _PwPagination = _interopRequireDefault(require("./PwPagination.scss?module"));
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _V02Component.C.make({
  determinePagination(i, n, d) {
    var r = [];
    var go = 1;
    if (n <= d) {
      // Show any pages
      for (var k = 1; k <= n; k++) {
        r.push(k);
      }
    } else if (i <= d / 2 + 2) {
      // Show first pages then dots then end
      for (var k = 1; k <= d; k++) {
        r.push(k);
      }
      go = k + Math.floor(d / 2);
      go = go > n ? n : go;
      r.push({
        go
      });
      r.push(n);
    } else if (i > d / 2 + 2 && i < n - d / 2 - 1) {
      // Show first page then dots then middles the dotd then end
      var k0 = i - Math.floor(d / 2);
      r.push(1);
      go = k0 - Math.floor(d / 2);
      go = go <= 0 ? 1 : go;
      r.push({
        go
      });
      for (var k = k0; k < i + d / 2; k++) {
        r.push(k);
      }
      go = k + Math.floor(d / 2);
      go = go > n ? n : go;
      r.push({
        go
      });
      r.push(n);
    } else {
      // Show first page then dots then ends
      var k0 = n - d;
      r.push(1);
      go = k0 - Math.floor(d / 2);
      go = go <= 0 ? 1 : go;
      r.push({
        go
      });
      for (var k = n - d + 1; k <= n; k++) {
        r.push(k);
      }
    }
    return r;
  },
  getData() {
    var data = (0, _pwComponentsCoreDev.getData)(this);
    var {
      size = 1,
      page = 1,
      hasConfig = false
    } = this.$config;
    var {
      size: datasize = size,
      page: datapage = page
    } = data;
    if (hasConfig) {
      data.size = size;
      data.page = page;
    } else {
      data.size = datasize;
      data.page = datapage;
    }
    return (0, _pwComponentsCoreDev.getData)(this);
  },
  getPage() {
    return this.getData().page;
  },
  getSize() {
    return this.getData().size;
  },
  setSize(size) {
    var data = this.getData();
    data.size = size;
  },
  setPage(page) {
    var data = this.getData();
    data.page = page;
  },
  couldNext() {
    var {
      size,
      page
    } = this.getData();
    if (page >= size) {
      return false;
    }
    return true;
  },
  couldPrev() {
    var {
      page = 1
    } = this.getData();
    if (page <= 1) {
      return false;
    }
    return true;
  },
  prev(event) {
    if (!this.couldPrev()) {
      return true;
    }
    var {
      preChange = () => {},
      onChange = () => {}
    } = this.$config;
    var {
      page
    } = this.getData();
    var i = page - 1;
    this.setPage(i);
    this.refresh();
    var {
      currentTarget: target
    } = event;
    var data = {
      event,
      page: i,
      target
    };
    var status = preChange(data);
    if (status === false) {
      return true;
    }
    onChange(data);
  },
  prevIcon() {
    const h = this.$createElement;
    var {
      params = {}
    } = this.$config;
    var {
      contentPrev = h("span", ["Pr\xE9c\xE9dent"])
    } = params;
    return h("li", {
      "class": (0, _classnames.default)("paginate_button page-item previous", this.couldPrev() ? "" : "disabled"),
      "on": {
        "click": this.prev
      }
    }, [h("a", {
      "class": "page-link",
      "attrs": {
        "href": "#"
      }
    }, [contentPrev])]);
  },
  next(event) {
    if (!this.couldNext()) {
      return true;
    }
    var {
      preChange = () => {},
      onChange = () => {}
    } = this.$config;
    var {
      page
    } = this.getData();
    var i = page + 1;
    this.setPage(i);
    this.refresh();
    var {
      currentTarget: target
    } = event;
    var data = {
      event,
      page: i,
      target
    };
    var status = preChange(data);
    if (status === false) {
      return true;
    }
    onChange(data);
  },
  nextIcon() {
    const h = this.$createElement;
    var {
      params = {}
    } = this.$config;
    var {
      contentNext = h("span", ["Suivant"])
    } = params;
    return h("li", {
      "class": (0, _classnames.default)("paginate_button page-item next", this.couldNext() ? "" : "disabled"),
      "on": {
        "click": this.next
      }
    }, [h("a", {
      "class": "page-link",
      "attrs": {
        "href": "#"
      }
    }, [contentNext])]);
  },
  $render() {
    const h = this.$createElement;
    var {
      preChange = () => {},
      onChange = () => {},
      params = {}
    } = this.$config;
    var {
      paginationSize = 5
    } = params;
    var {
      size = 1,
      page: activePage = 1
    } = this.getData();
    var lis = () => {
      var result = [];
      var prevIcon = this.prevIcon();
      result.push(prevIcon);
      var paginations = this.determinePagination(activePage, size, paginationSize);
      paginations.map(page => {
        var change = event => {
          if (typeof page == "object") {
            page = page.go;
          }
          var {
            currentTarget: target
          } = event;
          var data = {
            event,
            page,
            target
          };
          var status = preChange(data);
          if (status === false) {
            return true;
          }
          this.setPage(page);
          this.refresh();
          onChange(data);
        };
        var active = () => {
          if (page == activePage) {
            return "active";
          }
          return "";
        };
        if (typeof page == "object") {
          result.push(h("li", {
            "class": "paginate_button page-item",
            "on": {
              "click": change
            }
          }, [h("a", {
            "class": "page-link",
            "attrs": {
              "href": "#"
            }
          }, ["..."])]));
        } else {
          result.push(h("li", {
            "class": (0, _classnames.default)("page-item", active()),
            "on": {
              "click": change
            }
          }, [h("a", {
            "class": "page-link",
            "attrs": {
              "href": "#"
            }
          }, [page])]));
        }
      });
      var nextIcon = this.nextIcon();
      result.push(nextIcon);
      return result;
    };
    if (size <= 1) {
      return h("div");
    }
    return h("nav", {
      "attrs": {
        "aria-label": "..."
      }
    }, [h("ul", {
      "class": "pagination"
    }, [lis()])]);
  }
});
exports.default = _default;