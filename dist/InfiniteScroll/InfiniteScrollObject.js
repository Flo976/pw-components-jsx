"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.push.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class InfiniteScrollObject {
  constructor() {
    _defineProperty(this, "ready", false);
    _defineProperty(this, "content", {});
    _defineProperty(this, "offset", 0);
    _defineProperty(this, "limit", void 0);
    _defineProperty(this, "already_max", false);
    _defineProperty(this, "url", void 0);
    _defineProperty(this, "isLoading", void 0);
    _defineProperty(this, "currentscrollHeight", 0);
  }
  load() {
    let then = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};
    if (this.already_max) {
      return;
    }
    var queryParams = {
      offset: this.offset,
      limit: this.limit
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
    this.waiting = true;
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
        var datas = response.datas;
        if (datas && datas.length > 0) {
          this.offset += datas.length;
          this.content.data.push(...datas);
        } else {
          this.already_max = true;
        }
      } else {
        this.content.data = [];
      }
      this.isLoading = false;
      this.waiting = false;
      then();
      this.instance.refresh();
    });
  }
  isScrollVisible() {
    var scrollHeight = $(document).height();
    var scrollPos = Math.floor($(window).height() + $(window).scrollTop());
    var isBottom = scrollHeight - 100 < scrollPos;
    if ($(window).scrollTop() <= 0) {
      return false;
    } else if (isBottom && this.currentscrollHeight < scrollHeight) {
      this.currentscrollHeight = scrollHeight;
      this.instance.refresh();
      return true;
    }
    return false;
  }
  InitWheelScroll() {
    var instance = this;
    document.addEventListener("wheel", function (event) {
      if (event.deltaY > 0 && !(document.body.scrollHeight > window.innerHeight) && !instance.waiting && instance.content.data.length > 0 && !instance.already_max) {
        instance.waiting = true;
        instance.instance.refresh();
        instance.load(() => {
          instance.waiting = false;
        });
      }
    });
  }
  InitScroll() {
    $(window).scroll(() => {
      var needLoad = this.isScrollVisible() && !this.waiting;
      if (needLoad) {
        this.waiting = true;
        this.instance.refresh();
        this.load(() => {
          this.waiting = false;
        });
      }
    });
  }
}
var _default = InfiniteScrollObject;
exports.default = _default;