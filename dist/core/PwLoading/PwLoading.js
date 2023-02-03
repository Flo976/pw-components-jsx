"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _V02Component = require("../../vue/helper/V02Component");
var _PwLoading = _interopRequireDefault(require("./PwLoading.scss?module"));
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _V02Component.C.make({
  getData() {
    var data = (0, _pwComponentsCoreDev.getData)(this);
    var {
      isVisible = false,
      hasConfig = false
    } = this.$config;
    var {
      isVisible: dataIsVisible = isVisible
    } = data;
    if (hasConfig) {
      data.isVisible = isVisible;
    } else {
      data.isVisible = dataIsVisible;
    }
    return (0, _pwComponentsCoreDev.getData)(this);
  },
  isVisible() {
    var data = this.getData();
    return data.isVisible;
  },
  toggle() {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  },
  show() {
    var data = this.getData();
    data.isVisible = true;
    this.refresh();
  },
  hide() {
    var data = this.getData();
    data.isVisible = false;
    this.refresh();
  },
  $render() {
    const h = this.$createElement;
    var {
      isVisible,
      config
    } = this;
    var {
      content,
      className = "",
      animate = true,
      mode,
      color = "",
      overlayColor = ""
    } = config;
    //Possible mode
    //grow
    //border
    if (mode) {
      if (color) {
        animate = false;
        content = h("div", {
          "class": (0, _classnames.default)("spinner-".concat(mode), "text-".concat(color)),
          "attrs": {
            "role": "status"
          }
        }, [h("span", {
          "class": "sr-only"
        }, ["Loading..."])]);
        config.animate = animate;
        config.content = content;
      }
    }
    var baseClass = "pw_loading";
    if (content) {
      baseClass = "pw_loading_base";
    }
    if (!isVisible()) {
      return null;
    }
    var animateClass = "";
    if (!animate) {
      animateClass = "pw_loading_not_animate";
    }
    var style = {};
    if (overlayColor) {
      style.backgroundColor = overlayColor;
    }
    return h("div", {
      "class": "pw_loading_overlay",
      "style": style
    }, [h("span", {
      "class": (0, _classnames.default)(baseClass, animateClass, className)
    }, [content])]);
  }
});
exports.default = _default;