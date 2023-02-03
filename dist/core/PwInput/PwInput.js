"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));
var _V02Component = require("../../vue/helper/V02Component");
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
var _inputmask = _interopRequireDefault(require("inputmask"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var masks = {
  phone: "99 99 99 99 99",
  date: {
    alias: "datetime",
    inputFormat: "dd/mm/yyyy"
  }
};
function getMask(mask) {
  if (masks[mask]) {
    return masks[mask];
  }
  return mask;
}
var _default = _V02Component.C.make({
  isValid() {
    var {
      $config
    } = this;
    var {
      mask,
      onError = () => {},
      onSuccess = () => {}
    } = $config;
    var {
      $refs: {
        input
      }
    } = this;
    if (getMask(mask)) {
      var valid = this.$refs.input.inputmask.isComplete();
      return valid;
    } else if (required) {
      var valid = this.$refs.input.value;
      return valid;
    }
    return true;
  },
  $render() {
    var _this = this;
    const h = this.$createElement;
    var {
      $config
    } = this;
    var {
      params = {},
      delay,
      type = "text",
      placeholder = "",
      name,
      onInput = () => {},
      onChange = () => {},
      onPaste = () => {},
      onBlur = () => {},
      onKeypress = () => {},
      onError = () => {},
      onSuccess = () => {},
      onTyping = () => {},
      className,
      value,
      disabled = false,
      readonly = false,
      required = false,
      mask,
      getParams = () => {},
      onRender = () => {},
      isDirect = false
    } = $config;
    onRender(this);
    var onUpdate = function onUpdate(callback) {
      let manageError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (isDirect) {
        return event => {
          return callback(event);
        };
      }
      return event => {
        var {
          currentTarget: input
        } = event;
        (0, _pwComponentsCoreDev.handleInput)({
          input,
          event,
          then: function then() {
            let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var {
              value,
              input,
              event
            } = params;
            callback({
              value,
              input,
              event,
              getParams
            });
            var handleStatus = valid => {
              if (!valid) {
                if (manageError) {
                  onError({
                    value,
                    input,
                    event,
                    getParams
                  });
                  return true;
                }
              } else {
                onSuccess({
                  value,
                  input,
                  event,
                  getParams
                });
                return true;
              }
              onTyping({
                value,
                input,
                event,
                getParams
              });
            };
            if (getMask(mask)) {
              var valid = _this.$refs.input.inputmask.isComplete();
              handleStatus(valid);
            } else if (required) {
              var valid = _this.$refs.input.value;
              handleStatus(valid);
            }
          },
          delay
        });
      };
    };
    setTimeout(() => {
      var m = getMask(mask);
      if (m) {
        var im = new _inputmask.default(m);
        var {
          $refs: {
            input: element
          }
        } = this;
        im.mask(element);
      }
    }, 100);
    if (isDirect) {
      return h("input", (0, _babelHelperVueJsxMergeProps.default)([{
        "ref": "input",
        "attrs": {
          "type": type,
          "placeholder": placeholder,
          "name": name,
          "disabled": disabled,
          "readonly": readonly,
          "required": required
        },
        "on": {
          "input": onUpdate(onInput),
          "change": onUpdate(onChange, true),
          "paste": onUpdate(onChange, true),
          "blur": onUpdate(onBlur, true),
          "keypress": onKeypress
        },
        "class": (0, _classnames.default)(className, "pw_input form-control")
      }, params]));
    }
    return h("input", (0, _babelHelperVueJsxMergeProps.default)([{
      "ref": "input",
      "attrs": {
        "type": type,
        "placeholder": placeholder,
        "name": name,
        "disabled": disabled,
        "readonly": readonly,
        "required": required
      },
      "on": {
        "input": onUpdate(onInput),
        "change": onUpdate(onChange, true),
        "paste": onUpdate(onChange, true),
        "blur": onUpdate(onBlur, true),
        "keypress": onKeypress
      },
      "class": (0, _classnames.default)(className, "pw_input form-control"),
      "domProps": {
        "value": value
      }
    }, params]));
  }
});
exports.default = _default;