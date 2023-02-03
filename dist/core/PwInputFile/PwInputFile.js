"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));
var _V02Component = require("../../vue/helper/V02Component");
var _PwInputFile = _interopRequireDefault(require("./PwInputFile.scss?module"));
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _V02Component.C.make({
  isValid() {
    var {
      $config
    } = this;
    var {
      required = false
    } = $config;
    var {
      $refs: {
        input
      }
    } = this;
    if (required) {
      var valid = this.$refs.input.files[0];
      return valid;
    }
    return true;
  },
  $render() {
    const h = this.$createElement;
    var {
      $config
    } = this;
    var {
      icon = h("svg", {
        "attrs": {
          "xmlns": "http://www.w3.org/2000/svg",
          "width": "13.333",
          "height": "20",
          "viewBox": "0 0 13.333 20"
        }
      }, [h("g", {
        "attrs": {
          "transform": "translate(-85.334)"
        }
      }, [h("g", {
        "attrs": {
          "transform": "translate(85.334)"
        }
      }, [h("path", {
        "attrs": {
          "d": "M91.411,16.423h0c.019.019.04.037.061.055l.03.022.036.026.036.022.034.02.038.018.036.017.037.014.04.014.038.01.041.01.044.007.036.005a.838.838,0,0,0,.164,0l.036-.005.044-.007.041-.01.038-.01.04-.014.037-.014.036-.017.038-.018.034-.02.036-.022L92.5,16.5l.03-.022c.021-.017.041-.036.061-.055h0l5.833-5.833a.833.833,0,1,0-1.179-1.179l-4.411,4.411V.833a.833.833,0,0,0-1.667,0V13.821L86.756,9.411a.833.833,0,1,0-1.179,1.179Z",
          "transform": "translate(-85.334)",
          "fill": "#fff"
        }
      }), h("path", {
        "attrs": {
          "d": "M97.834,469.333H86.167a.833.833,0,0,0,0,1.667H97.834a.833.833,0,1,0,0-1.667Z",
          "transform": "translate(-85.334 -451)",
          "fill": "#fff"
        }
      })])])]),
      className = "",
      onRequest = () => {},
      onChange = () => {},
      url = "",
      placeholder,
      name = "",
      accept = "",
      params = {
        attrs: {}
      }
    } = $config;
    var {
      fileName = placeholder,
      fileUrl = null
    } = this.getData();
    this.getData().fileName = fileName;
    this.getData().fileUrl = fileUrl;
    var handleChange = () => {
      var {
        input
      } = this.$refs;
      if (!url) {
        return true;
      }
      var data = new FormData();
      onChange({
        instance: this,
        data
      });
      if (input && input.files && input.files[0]) {
        this.getData().fileName = input.files[0].name;
        data.append("file", input.files[0]);
      } else {
        this.getData().fileName = null;
      }
      this.refresh();
      $.ajax({
        url,
        type: "POST",
        data,
        processData: false,
        contentType: false
      }).always(response => {
        var {
          status = null,
          url = null,
          fileName = null
        } = response;
        this.getData().fileUrl = url;
        this.refresh();
        onRequest({
          instance: this,
          response
        });
      });
    };
    var getFileName = () => {
      if (fileUrl) {
        return h("a", {
          "attrs": {
            "href": "".concat(fileUrl),
            "target": "_blank"
          },
          "class": "preview_file"
        }, [fileName]);
      } else {
        return fileName;
      }
    };
    return h("label", {
      "class": (0, _classnames.default)("field_file", className)
    }, [h("input", (0, _babelHelperVueJsxMergeProps.default)([{
      "ref": "input",
      "attrs": {
        "type": "file",
        "name": name,
        "accept": accept
      },
      "on": {
        "change": handleChange,
        "reset": handleChange
      }
    }, params])), h("span", {
      "class": "visuel"
    }, [h("span", {
      "class": "txt"
    }, [getFileName()]), h("span", {
      "class": "ico_wrapper"
    }, [h("span", {
      "class": "ico"
    }, [icon])])])]);
  }
});
exports.default = _default;