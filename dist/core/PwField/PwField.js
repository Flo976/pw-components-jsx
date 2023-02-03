"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _V02Component = require("../../vue/helper/V02Component");
var _PwField = _interopRequireDefault(require("./PwField.scss?module"));
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
var _PwInput = _interopRequireDefault(require("../PwInput/PwInput"));
var _PwTextarea = _interopRequireDefault(require("../PwTextarea/PwTextarea"));
var _PwPassword = _interopRequireDefault(require("../PwPassword/PwPassword"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _V02Component.C.make({
  setError() {
    var data = this.getData();
    setTimeout(() => {
      data.hasError = true;
      this.refresh();
    }, 200);
  },
  setData(k, v) {
    var {
      $config
    } = this;
    $config[k] = v;
  },
  getData() {
    var {
      $config
    } = this;
    var {
      errorMessage: errorMessageDefault = ""
    } = $config;
    var data = (0, _pwComponentsCoreDev.getData)(this.$el);
    var {
      errorMessage = errorMessageDefault
    } = data;
    data.errorMessage = errorMessage;
    return data;
  },
  $render() {
    const h = this.$createElement;
    var {
      $config
    } = this;
    var {
      input = {},
      autoValidate = false,
      errorClass = "feedback_error",
      component: Tag = "PwInput"
    } = $config;
    var error = () => {
      var {
        hasError,
        errorMessage
      } = this.getData();
      if (!hasError) {
        return null;
      }
      return h("span", {
        "class": (0, _classnames.default)(errorClass)
      }, [errorMessage]);
    };
    var containerClass = () => {
      if (!this.$el) {
        return null;
      }
      var {
        hasError
      } = this.getData();
      if (!hasError) {
        return "";
      }
      return "field_error";
    };
    input.onError = () => {
      if (!autoValidate) {
        return true;
      }
      this.getData().hasError = true;
      this.refresh();
    };
    input.onSuccess = () => {
      if (!autoValidate) {
        return true;
      }
      this.getData().hasError = false;
      this.refresh();
    };
    input.onTyping = () => {
      if (!autoValidate) {
        return true;
      }
      this.getData().hasError = false;
      this.refresh();
    };
    setTimeout(() => {
      this.getData().instance = this;
    }, 100);
    var renderField = () => {
      if (Tag === "PwTextarea") {
        return h(_PwTextarea.default, {
          "ref": "input",
          "attrs": {
            "config": input
          }
        });
      } else if (Tag === "PwPassword") {
        return h(_PwPassword.default, {
          "ref": "input",
          "attrs": {
            "config": input
          }
        });
      } else if (Tag === "PwInputFile") {
        return h("PwInputFile", {
          "ref": "input",
          "attrs": {
            "config": input
          }
        });
      } else {
        return h(_PwInput.default, {
          "ref": "input",
          "attrs": {
            "config": input
          }
        });
      }
    };
    return h("div", {
      "class": containerClass()
    }, [error(), renderField()]);
  }
});
exports.default = _default;