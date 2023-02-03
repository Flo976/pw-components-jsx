"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.push.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url-search-params.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _V02Component = require("../../vue/helper/V02Component");
var _PwDropzone = _interopRequireDefault(require("./PwDropzone.scss?module"));
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
var _dropzone = require("dropzone");
require("dropzone/dist/basic.css");
require("dropzone/dist/dropzone.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = _V02Component.C.make({
  initDropzone() {
    var {
      $config = {}
    } = this;
    var {
      uploadUrl = "",
      removeUrl = "",
      deleteLabel = "Supprimer",
      dropLabel = "Veuillez deposer des fichiers ici ...",
      maxFiles = null,
      dropzoneParams = {},
      template,
      onSending = () => {},
      onSuccess = () => {},
      onAddedFile = () => {},
      onInit = () => {}
    } = $config;
    var {
      pw_dropzone
    } = this.$refs;
    var previewTemplate = this.$refs.template.innerHTML;
    var cnf = _objectSpread({
      url: uploadUrl,
      addRemoveLinks: true,
      dictRemoveFile: deleteLabel,
      dictDefaultMessage: dropLabel,
      dictMaxFilesExceeded: "Impossible de charger le document",
      dictCancelUpload: "Annuler",
      maxFiles,
      init: () => {
        setTimeout(() => {
          dropzone.on("sending", (file, xhr, formData) => {
            onSending({
              file,
              xhr,
              formData
            });
          });
          dropzone.on("success", (file, responseText) => {
            this.uploadFiles(file, responseText);
            onSuccess({
              file,
              responseText
            });
          });
          dropzone.on("addedfile", file => {
            onAddedFile({
              file
            });
          });
          this.getFiles();
          onInit({
            instance: this,
            dropzone
          });
        }, 10);
      },
      removedfile: file => {
        file.previewElement.remove();
        if (file.previewElement.id) {
          this.removeFiles(file.previewElement.id, file);
        }
      }
    }, dropzoneParams);
    if (template) {
      cnf.previewTemplate = previewTemplate;
    }
    var instance = this;
    var dropzone = new _dropzone.Dropzone(pw_dropzone, cnf);
    this.getData().dropzone = dropzone;
  },
  getFiles() {
    var {
      $config
    } = this;
    var {
      filesUrl = ""
    } = $config;
    if (!filesUrl) {
      return true;
    }
    $.ajax({
      url: filesUrl,
      type: "POST",
      data: {}
    }).always(response => {
      if (response && response.length) {
        $.each(response, (key, value) => {
          var mockFile = {
            name: value.name,
            size: value.size,
            accepted: true
          };
          mockFile.dataURL = this.imgThumbnailD(value.name, value.url);
          this.getData().dropzone.files.push(mockFile);
          this.getData().dropzone.emit("addedfile", mockFile);
          this.createThumbnail(mockFile);
          this.getData().dropzone.emit("complete", mockFile);
          this.getData().dropzone._updateMaxFilesReachedClass();
          mockFile.previewElement.id = value.id;
          mockFile.previewElement.addEventListener("click", function () {
            window.open(value.url, "_blank");
          });
        });
      }
    });
  },
  imgThumbnailD(filename, img) {
    var ext = this.checkFileExt(filename); // Get extension
    if (ext == "mp4") {
      filename = "/assets/images/thumbs/video.png";
    } else if (ext == "pdf") {
      filename = "/assets/images/thumbs/pdf.png";
    } else if (ext == "jpg" || ext == "jpeg" || ext == "png") {
      if (typeof img == "function") {
        filename = img();
      } else {
        filename = img;
      }
    } else {
      filename = "/assets/images/thumbs/default_attachment.jpg";
    }
    return filename;
  },
  checkFileExt(filename) {
    filename = filename.toLowerCase();
    return filename.split(".").pop();
  },
  createThumbnail(temp) {
    this.getData().dropzone.createThumbnailFromUrl(temp, this.getData().dropzone.options.thumbnailWidth, this.getData().dropzone.options.thumbnailHeight, this.getData().dropzone.options.thumbnailMethod, true, thumbnail => {
      this.getData().dropzone.emit("thumbnail", temp, thumbnail);
      this.getData().dropzone.emit("complete", temp);
    });
  },
  removeFiles(id, file) {
    var {
      $config
    } = this;
    var {
      removeUrl = "",
      onRemove = () => {}
    } = $config;
    if (id && removeUrl) {
      $.ajax({
        type: "post",
        url: removeUrl,
        data: {
          id: id
        },
        success: response => {
          // TO DO
          //this.getData().dropzone.removeFile(file);
          onRemove({
            instance: this,
            response
          });
        }
      });
    }
  },
  uploadFiles(file, response) {
    var ext = this.checkFileExt(file.name); // Get extension
    var newimage = this.imgThumbnailD(file.name, () => {
      return URL.createObjectURL(file);
    });
    file.dataURL = newimage;
    this.createThumbnail(file);
    if (response && response != null) {
      var result = response.find(x => x.name == file.name);
      if (result) {
        if (result.id) {
          file.previewElement.id = result.id;
        }
        if (result.new_tab) {
          file.previewElement.addEventListener("click", function () {
            window.open(result.url, "_blank");
          });
        }
      }
    }
  },
  onReady() {
    var {
      ready
    } = this.getData();
    if (!ready) {
      this.getData().ready = true;
      setTimeout(() => {
        this.initDropzone();
      }, 100);
    }
  },
  $render() {
    const h = this.$createElement;
    this.onReady();
    var {
      $config
    } = this;
    var {
      content,
      className = "",
      template
    } = $config;
    return h("div", {
      "class": (0, _classnames.default)(className)
    }, [h("div", {
      "ref": "pw_dropzone",
      "class": "pw_dropzone dropzone"
    }), h("div", {
      "ref": "template",
      "class": "d-none"
    }, [template])]);
  }
});
exports.default = _default;