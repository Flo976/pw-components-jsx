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
class DragAndDropObject {
  constructor() {
    _defineProperty(this, "parentSelector", "");
    _defineProperty(this, "itemsSelector", "");
    _defineProperty(this, "listeners", {
      // clique/focus sur un element
      onDragStart: _ref => {
        let {
          event,
          srcElt
        } = _ref;
      },
      // lacher l'element
      onDragEnd: _ref2 => {
        let {
          event,
          srcElt
        } = _ref2;
      },
      // release dragged element
      onDragOver: _ref3 => {
        let {
          event,
          srcElt
        } = _ref3;
      },
      // l'element entre en contact avec un autre
      onDragEnter: _ref4 => {
        let {
          event,
          srcElt,
          destElt
        } = _ref4;
      },
      // l'element quite le contact avec un autre
      onDragLeave: _ref5 => {
        let {
          event,
          srcElt,
          destElt
        } = _ref5;
      },
      // l'element est poser sur un autre
      onDrop: _ref6 => {
        let {
          event,
          srcElt,
          destElt
        } = _ref6;
      }
    });
    _defineProperty(this, "$helper", null);
    this.$helper = new DragAndDropHelper();
    this.$helper.setup(this);
  }
  init() {
    this.$helper.init();
  }
}
class DragAndDropHelper {
  constructor() {
    _defineProperty(this, "$items", []);
    _defineProperty(this, "$dragSrcEl", null);
    _defineProperty(this, "$dragAndDrop", null);
  }
  setup(dragAndDrop) {
    this.$dragAndDrop = dragAndDrop;
  }
  init() {
    var {
      parentSelector = "",
      itemsSelector = ""
    } = this.$dragAndDrop;
    this.$items = document.querySelectorAll("".concat(parentSelector, " ").concat(itemsSelector));
    this.$items.forEach(item => {
      item.setAttribute("draggable", true);
      item.addEventListener("dragstart", this.$handleDragStart());
      item.addEventListener("dragover", this.$handleDragOver());
      item.addEventListener("dragenter", this.$handleDragEnter());
      item.addEventListener("dragleave", this.$handleDragLeave());
      item.addEventListener("dragend", this.$handleDragEnd());
      item.addEventListener("drop", this.$handleDrop());
      item.querySelector(".card-body").setAttribute("draggable", true);
      item.querySelector(".card-body").setAttribute("ondragstart", "event.preventDefault()");
    });
  }
  getElement(event) {
    var {
      itemsSelector = ""
    } = this.$dragAndDrop;
    if (!event.target) {
      return null;
    }
    var elt = event.target.closest(itemsSelector);
    if (!elt) {
      elt = event.target.querySelector(itemsSelector);
    }
    return elt;
  }
  getListener(name) {
    var {
      listeners = {}
    } = this.$dragAndDrop;
    if (listeners[name] && typeof listeners[name] == "function") {
      return listeners[name];
    }
    return function () {};
  }
  $handleDragStart() {
    return e => {
      var elt = this.getElement(e);
      if (elt != e.target) {
        return false;
      }
      elt.style.opacity = "0.4";
      this.$dragSrcEl = elt;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", elt.innerHTML);
      var params = {
        event: e,
        srcElt: this.$dragSrcEl
      };
      this.getListener("onDragStart")(params);
    };
  }
  $handleDragEnd() {
    return e => {
      var elt = this.getElement(e);
      elt.style.opacity = "1";
      this.$items.forEach(function (item) {
        item.classList.remove("over");
      });
      var params = {
        event: e,
        srcElt: this.$dragSrcEl
      };
      this.getListener("onDragEnd")(params);
    };
  }
  $handleDragOver() {
    return e => {
      e.preventDefault();
      var params = {
        event: e,
        srcElt: this.$dragSrcEl
      };
      this.getListener("onDragOver")(params);
      return false;
    };
  }
  $handleDragEnter() {
    return e => {
      this.$items.forEach(function (item) {
        item.classList.remove("over");
      });
      var elt = this.getElement(e);
      elt.classList.add("over");
      var params = {
        event: e,
        srcElt: this.$dragSrcEl,
        destElt: elt
      };
      this.getListener("onDragEnter")(params);
    };
  }
  $handleDragLeave() {
    return e => {
      var elt = this.getElement(e);
      // elt.classList.remove("over");

      var params = {
        event: e,
        srcElt: this.$dragSrcEl,
        destElt: elt
      };
      this.getListener("onDragLeave")(params);
    };
  }
  $handleDrop() {
    return e => {
      e.stopPropagation();
      if (!this.$dragSrcEl) {
        return false;
      }
      var elt = this.getElement(e);
      if (this.$dragSrcEl !== elt) {
        this.$dragSrcEl.innerHTML = elt.innerHTML;
        elt.innerHTML = e.dataTransfer.getData("text/html");
      }
      var params = {
        event: e,
        srcElt: this.$dragSrcEl,
        destElt: elt
      };
      this.$dragSrcEl = null;
      this.getListener("onDrop")(params);
      return false;
    };
  }
}
var _default = DragAndDropObject;
exports.default = _default;