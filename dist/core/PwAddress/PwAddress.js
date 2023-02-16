"use strict";

require("core-js/modules/es.array.push.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));
var _V02Component = require("vue/helper/V02Component.jsx");
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsJsxDev = require("pw-components-jsx-dev");
var _pwComponentsCoreDev = require("pw-components-core-dev");
var _map = require("../../functions/map.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var prevPostalCode = null;
var _default = _V02Component.C.make({
  initData() {
    var {
      $config
    } = this;
    var {
      onInit = () => {},
      params = {}
    } = $config;
    var {
      attrs = {}
    } = params;
    var {
      id: elementId
    } = attrs;
    if (elementId) {
      var input = document.getElementById(elementId);
      var searchBox = new google.maps.places.SearchBox(input);
      searchBox.addListener("places_changed", () => {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
          return;
        }
        places.forEach(place => {
          if (!place.geometry || !place.geometry.location) {
            return;
          }
        });
      });
      this.getData().searchBox = searchBox;
      onInit(this);
    }
  },
  onReady() {
    var {
      ready = false
    } = this.getData();
    if (!ready) {
      this.getData().ready = true;
      setTimeout(() => {
        this.initData();
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
      className,
      wrapperClassName = "",
      params = {},
      wrapperParams = {},
      citiesParams = {},
      zipCodeParams = {},
      addressTextParams = {},
      label = "",
      citiesOptions = [],
      customAddressText = "L'adresse n'est pas reconnue"
    } = $config;
    var {
      label: cityLabel = ""
    } = citiesParams;
    var {
      label: addressLabel = ""
    } = addressTextParams;
    var {
      label: zipCodeLabel = ""
    } = zipCodeParams;
    var idAddressText = (0, _pwComponentsCoreDev.idGenerator)();
    var sendRequestCity = (city, postal_code, isNotChange) => {
      var address = "".concat(city, "\" \"").concat(postal_code);
      var params = {
        address: address
      };
      if (!isNotChange) {
        this.toogleLoading(true);
      }
      (0, _map.getCity)(params, this.callBackCity);
    };
    var callBackPostalCode = cities => {
      var full_address = $(".form_edit_info.full_address").val();
      var isValid = (0, _map.isValidAdress)(full_address);
      $(".form_edit_info.locality").attr('disabled', null);
      if (cities && Array.isArray(cities)) {
        citiesOptions = (0, _map.formatCityOptions)(cities);
        this.config.citiesOptions = citiesOptions;
        this.refresh();
        if (cities[0]) {
          var city = cities[0];
          var postal_code = $(".form_edit_info.postal_code").val();
          $(".form_edit_info.locality").val(city);
          setTimeout(() => {
            sendRequestCity(city, postal_code, true);
          }, 100);
          this.config.messageError = null;
          this.config.hasError = false;
          this.update();
        }
      }
    };
    var loadCity = event => {
      var currentTarget = event.currentTarget;
      var currentValue = currentTarget.value;
      if (!(0, _map.isFullZipCode)(currentValue)) {
        event.preventDefault();
      }
      clearTimeout(timeout);
      timeout;
      var timeout = setTimeout(() => {
        if ((0, _map.isFullZipCode)(currentValue) && prevPostalCode != currentValue) {
          prevPostalCode = currentValue;
          var address = "France " + prevPostalCode;
          var params = {
            address: address
          };
          (0, _map.initLocality)(".form_edit_info.locality");
          (0, _map.getZipCode)(params, callBackPostalCode);
        } else if (!currentValue || !(0, _map.isFullZipCode)(currentValue)) {
          (0, _map.setAdressJson)({});
          prevPostalCode = null;
          $(".form_edit_info.locality").val("");
          $(".form_edit_info.locality").html('');
        }
        this.config.messageError = null;
        this.update();
      }, 500);
    };
    var customAddressFields = () => {
      var {
        isCustomAddress = false
      } = this.config;
      if (isCustomAddress) {
        return h("div", {
          "attrs": {
            "id": "google-analayze-complete"
          },
          "class": "custom_inputs google-analayze-complete modal_custom_group mx-auto"
        }, [h("div", {
          "class": "row _full_input_adress"
        }, [h("div", {
          "class": "col-md-12"
        }, [h("label", {
          "class": "form-check-label _custom_label"
        }, [addressLabel, h(_pwComponentsJsxDev.PwInput, {
          "ref": idAddressText,
          "attrs": {
            "config": _objectSpread({
              type: "text"
            }, addressTextParams)
          }
        })])]), h("div", {
          "class": "col-md-12"
        }, [h("div", {
          "class": "row zip_code_city"
        }, [h("div", {
          "class": "col-md-6"
        }, [h("label", {
          "class": "form-check-label _custom_label pw_input"
        }, [zipCodeLabel, h("input", {
          "attrs": {
            "type": "text",
            "placeholder": "Code postal"
          },
          "class": "custom_input postal_code pw_input",
          "on": {
            "change": loadCity,
            "click": loadCity,
            "input": loadCity
          }
        })])]), h("div", {
          "class": "col-md-6"
        }, [h("label", {
          "class": "pw_input"
        }, [cityLabel, h(_pwComponentsJsxDev.PwSelect, {
          "attrs": {
            "config": _objectSpread({
              options: citiesOptions
            }, citiesParams)
          }
        })])]), h("p", {
          "attrs": {
            "id": "search_map_error_manuel"
          },
          "ref": "search_map_error_manuel"
        }, [h("span", {
          "class": "text-danger d-none"
        })])])])])]);
      }
    };
    var mapAddressFields = () => {
      var {
        isCustomAddress = false
      } = this.config;
      if (!isCustomAddress) {
        return h("div", [h("label", {
          "class": "pw_input"
        }, [label, h(_pwComponentsJsxDev.PwInput, {
          "ref": "input",
          "attrs": {
            "config": _objectSpread({}, $config)
          }
        })]), h("p", {
          "class": "stl-info_address",
          "on": {
            "click": showCustomAddress
          }
        }, [h("a", {
          "attrs": {
            "href": "#"
          }
        }, [customAddressText])])]);
      }
    };
    var showCustomAddress = () => {
      this.config.isCustomAddress = true;
      this.refresh();
    };
    return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
      "class": (0, _classnames.default)(wrapperClassName)
    }, wrapperParams]), [mapAddressFields(), customAddressFields()]);
  }
});
exports.default = _default;