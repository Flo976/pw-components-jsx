"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class DatatableObject {
  constructor() {
    _defineProperty(this, "ready", false);
    _defineProperty(this, "head", {});
    _defineProperty(this, "body", {});
    _defineProperty(this, "render", void 0);
    _defineProperty(this, "pagination", 10);
    _defineProperty(this, "activePage", 1);
    _defineProperty(this, "filters", void 0);
    _defineProperty(this, "key", "");
    _defineProperty(this, "orderBy", void 0);
    _defineProperty(this, "order", void 0);
    _defineProperty(this, "url", void 0);
    _defineProperty(this, "isLoading", void 0);
    _defineProperty(this, "action", {
      goToPage: page => {
        if (page > 0) {
          this.activePage = page;
          this.load();
        }
      }
    });
  }
  load() {
    var queryParams = {
      key: this.key,
      filters: this.filters,
      order_by: this.orderBy,
      order: this.order,
      page: this.activePage,
      limit: this.pagination
    };
    var {
      url
    } = this;
    var data = new FormData();
    Object.keys(queryParams).map(key => {
      var value = queryParams[key];
      if (value) {
        data.append(key, value);
      }
    });
    this.isLoading = true;
    this.instance.refresh();
    var ajax = this.ajax = $.ajax({
      method: "POST",
      url: url,
      data: data,
      processData: false,
      contentType: false
    });
    ajax.always(response => {
      if (response && response.status && response.status == 200) {
        this.body.data = response.datas;
        this.body.total = response.totalFiltered;
      } else {
        this.body.data = [];
      }
      this.isLoading = false;
      this.instance.refresh();
    });
  }
}
var _default = DatatableObject;
exports.default = _default;