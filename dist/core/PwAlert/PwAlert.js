"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _V01Component = require("../../vue/helper/V01Component");
var _PwAlert = _interopRequireDefault(require("./PwAlert.scss?module"));
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _V01Component.C.make({
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
      color = "primary"
    } = config;
    if (!isVisible()) {
      return null;
    }
    var getColor = () => {
      return "alert-".concat(color);
    };
    return h("div", {
      "class": (0, _classnames.default)("alert", getColor(), className),
      "attrs": {
        "role": "alert"
      }
    }, [content]);
  }
});
exports.default = _default;