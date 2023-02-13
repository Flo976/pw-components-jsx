"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
var _Components = _interopRequireDefault(require("./Components.scss?module"));
var _PwInput = _interopRequireDefault(require("../core/PwInput/PwInput"));
var _PwSelect = _interopRequireDefault(require("../core/PwSelect/PwSelect"));
var _PwButton = _interopRequireDefault(require("../core/PwButton/PwButton"));
var _PwRadio = _interopRequireDefault(require("../core/PwRadio/PwRadio"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Components {
  static getMethods() {
    const h = this.$createElement;
    return {
      $setRenderIndex() {
        if (!this.config.renderIndex) {
          this.config.renderIndex = 0;
        }
        this.config.renderIndex = this.config.renderIndex + 1;
      },
      $getRenderIndex() {
        return this.config.renderIndex;
      },
      $setupInstance(elements) {
        elements.map(element => {
          element.instance = this;
        });
      },
      $input(field) {
        let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
        const h = this.$createElement;
        this.$setupInstance([field]);
        var id = (0, _pwComponentsCoreDev.idGenerator)();
        setTimeout(() => {
          var {
            [id]: element
          } = this.$refs;
          callback({
            element
          });
        }, 100);
        return h("div", {
          "class": "form-group"
        }, [h("label", {
          "class": "pw_input"
        }, [field.label, h("input", {
          "attrs": {
            "data-jid": field.id,
            "type": field.type,
            "placeholder": field.placeholder,
            "name": field.name,
            "required": field.required
          },
          "ref": id,
          "class": "pw_input form-control",
          "on": {
            "input": field.checkValidation.bind(field),
            "paste": field.checkRestriction.bind(field),
            "keypress": field.checkRestriction.bind(field)
          }
        })]), h("span", {
          "class": (0, _classnames.default)("form_feedback_error", field.isValid ? "d-none" : "invalid-feedback d-block")
        }, [field.errorMessage])]);
      },
      $phone(field) {
        let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
        const h = this.$createElement;
        this.$setupInstance([field]);
        var id = (0, _pwComponentsCoreDev.idGenerator)();
        setTimeout(() => {
          var {
            [id]: element = {}
          } = this.$refs;
          if (element.$refs && element.$refs.input) {
            callback({
              element: element.$refs.input
            });
          }
        }, 100);
        return h("div", {
          "class": "form-group"
        }, [h("label", {
          "class": "pw_input"
        }, [field.label, h(_PwInput.default, {
          "ref": id,
          "attrs": {
            "config": {
              mask: "phone",
              placeholder: field.placeholder,
              name: field.name,
              required: field.required,
              className: "pw_input form-control",
              isDirect: true,
              onInput: field.checkValidation.bind(field),
              onPaste: field.checkRestriction.bind(field),
              onKeypress: field.checkRestriction.bind(field),
              onRender: instance => {
                field.component = instance;
              },
              params: {
                attrs: {
                  "data-jid": field.id
                }
              }
            }
          }
        })]), h("span", {
          "class": (0, _classnames.default)("form_feedback_error", field.isValid ? "d-none" : "invalid-feedback d-block")
        }, [field.errorMessage])]);
      },
      $select(field) {
        let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
        const h = this.$createElement;
        this.$setupInstance([field]);
        var id = (0, _pwComponentsCoreDev.idGenerator)();
        setTimeout(() => {
          var {
            [id]: element
          } = this.$refs;
          callback({
            element
          });
        }, 100);
        return h("div", {
          "class": "form-group"
        }, [h("label", {
          "class": "pw_input"
        }, [field.label, h(_PwSelect.default, {
          "ref": id,
          "attrs": {
            "config": {
              mask: "phone",
              placeholder: field.placeholder,
              name: field.name,
              required: field.required,
              className: "pw_input form-control",
              isDirect: true,
              onChange: field.checkValidation.bind(field),
              onRender: instance => {
                field.component = instance;
              },
              options: field.options,
              params: {
                attrs: {
                  "data-jid": field.id
                }
              }
            }
          }
        })]), h("span", {
          "class": (0, _classnames.default)("form_feedback_error", field.isValid ? "d-none" : "invalid-feedback d-block")
        }, [field.errorMessage])]);
      },
      $search(field) {
        const h = this.$createElement;
        this.$setupInstance([field]);
        var onSearch = event => {
          var {
            currentTarget: input
          } = event;
          (0, _pwComponentsCoreDev.waitInput)(input, () => {
            var {
              value
            } = input;
            var {
              onSearch
            } = field;
            onSearch({
              value,
              event,
              input
            });
          }, 100);
        };
        return h("div", {
          "class": "form-group"
        }, [h("label", {
          "class": "pw_input"
        }, [field.label, h("input", {
          "attrs": {
            "data-jid": field.id,
            "type": field.type,
            "placeholder": field.placeholder,
            "name": field.name,
            "required": field.required
          },
          "class": "pw_input form-control",
          "on": {
            "input": onSearch,
            "paste": onSearch,
            "keypress": onSearch
          }
        })]), h("span", {
          "class": (0, _classnames.default)("form_feedback_error", field.isValid ? "d-none" : "invalid-feedback d-block")
        }, [field.errorMessage])]);
      },
      $password(field) {
        const h = this.$createElement;
        this.$setupInstance([field]);
        if (field.switchType === undefined) {
          field.switchType = "text";
        }
        var onClickEye = () => {
          var t = field.switchType;
          field.switchType = field.type;
          field.type = t;
          field.instance.refresh();
        };
        var eye = () => {
          if (field.type == "password") {
            return h("svg", {
              "attrs": {
                "xmlns": "http://www.w3.org/2000/svg",
                "width": "24",
                "height": "24",
                "viewBox": "0 0 24 24",
                "fill": "none",
                "stroke": "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              },
              "class": "feather feather-eye"
            }, [h("path", {
              "attrs": {
                "d": "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
              }
            }), h("circle", {
              "attrs": {
                "cx": "12",
                "cy": "12",
                "r": "3"
              }
            })]);
          }
          return h("svg", {
            "attrs": {
              "xmlns": "http://www.w3.org/2000/svg",
              "width": "24",
              "height": "24",
              "viewBox": "0 0 24 24",
              "fill": "none",
              "stroke": "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            },
            "class": "feather feather-eye-off"
          }, [h("path", {
            "attrs": {
              "d": "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
            }
          }), h("line", {
            "attrs": {
              "x1": "1",
              "y1": "1",
              "x2": "23",
              "y2": "23"
            }
          })]);
        };
        return h("div", {
          "class": "form-group"
        }, [h("label", {
          "class": "pw_input field_pwd"
        }, [field.label, h("input", {
          "attrs": {
            "data-jid": field.id,
            "type": field.type,
            "placeholder": field.placeholder,
            "name": field.name,
            "required": field.required
          },
          "class": "pw_input form-control",
          "on": {
            "input": field.checkValidation.bind(field),
            "paste": field.checkRestriction.bind(field),
            "keypress": field.checkRestriction.bind(field)
          }
        }), h("span", {
          "class": "eye",
          "on": {
            "click": onClickEye
          }
        }, [eye()])]), h("span", {
          "class": (0, _classnames.default)("form_feedback_error", field.isValid ? "d-none" : "invalid-feedback d-block")
        }, [field.errorMessage])]);
      },
      $button(button) {
        const h = this.$createElement;
        this.$setupInstance([button]);
        return h("div", {
          "class": "form-group"
        }, [h("button", {
          "class": "btn btn-primary",
          "on": {
            "click": button.handleValidation.bind(button)
          }
        }, [button.text])]);
      },
      $radio(field) {
        let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
        const h = this.$createElement;
        this.$setupInstance([field]);
        var id = (0, _pwComponentsCoreDev.idGenerator)();
        setTimeout(() => {
          var {
            [id]: element
          } = this.$refs;
          callback({
            element
          });
        }, 100);
        var render = () => {
          var options = field.options;
          return options.map(option => {
            return h("div", {
              "class": "col-6"
            }, [h(_PwRadio.default, {
              "attrs": {
                "config": {
                  name: field.name,
                  label: option.label,
                  value: option.value,
                  valueChecked: field.value,
                  onChange: params => {
                    var {
                      isChecked,
                      input,
                      event
                    } = params;
                    if (isChecked) {
                      field.value = input.value;
                      field.instance.refresh();
                    }
                    field.checkValidation.bind(field)(false);
                  },
                  params: {
                    attrs: {
                      "data-jid": field.id
                    }
                  }
                }
              }
            })]);
          });
        };
        return h("div", {
          "class": "form-group"
        }, [h("label", {
          "class": "pw_input"
        }, [field.label, h("div", {
          "class": "row pt-2"
        }, [render()])]), h("span", {
          "class": (0, _classnames.default)("form_feedback_error", field.isValid ? "d-none" : "invalid-feedback d-block")
        }, [field.errorMessage])]);
      }
    };
  }
}
var _default = Components;
exports.default = _default;