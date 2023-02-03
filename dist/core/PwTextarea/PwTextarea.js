"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));
var _V02Component = require("../../vue/helper/V02Component");
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _V02Component.C.make({
  isValid() {
    var {
      $config
    } = this;
    var {
      onError = () => {},
      onSuccess = () => {},
      required = false
    } = $config;
    var {
      $refs: {
        input
      }
    } = this;
    if (required) {
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
      placeholder = "",
      name,
      onInput = () => {},
      onChange = () => {},
      onBlur = () => {},
      onKeypress = () => {},
      onError = () => {},
      onSuccess = () => {},
      className,
      value,
      rows = 3,
      disabled = false,
      readonly = false,
      required = false
    } = $config;
    var onUpdate = function onUpdate(callback) {
      let manageError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
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
              event
            });
            var handleStatus = valid => {
              if (!valid) {
                if (manageError) {
                  onError({
                    value,
                    input,
                    event
                  });
                  return true;
                }
              } else {
                onSuccess({
                  value,
                  input,
                  event
                });
                return true;
              }
            };
            if (required) {
              var valid = _this.$refs.input.value;
              handleStatus(valid);
            }
          },
          delay
        });
      };
    };
    return h("textarea", (0, _babelHelperVueJsxMergeProps.default)([{
      "ref": "input",
      "attrs": {
        "placeholder": placeholder,
        "rows": rows,
        "name": name,
        "disabled": disabled,
        "readonly": readonly,
        "required": required
      },
      "on": {
        "input": onUpdate(onInput),
        "change": onUpdate(onChange, true),
        "blur": onUpdate(onBlur, true),
        "keypress": onKeypress
      },
      "class": (0, _classnames.default)(className, "pw_textarea")
    }, params]), [value]);
  }
});
exports.default = _default;