"use strict";

require("core-js/modules/es.array.push.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));
var _V02Component = require("../../vue/helper/V02Component");
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
  setAddressJson(addressJSon) {
    this.getData().addressJson = addressJSon;
  },
  getAddressJson() {
    return this.getData().addressJson;
  },
  initData() {
    var {
      $config
    } = this;
    var {
      onInit = () => {},
      params = {},
      country = [],
      onChange = () => {},
      onError = () => {}
    } = $config;
    var {
      attrs = {}
    } = params;
    var {
      id: elementId
    } = attrs;
    if (elementId) {
      var input = document.getElementById(elementId);
      var searchBox = new google.maps.places.Autocomplete(input);
      if (country && country.length > 0) {
        searchBox.setComponentRestrictions({
          country: country
        });
      }
      searchBox.addListener("place_changed", () => {
        var addressJSon = {};
        var checkZipcode = false;
        var ville = "";
        var zipcode = "";
        var street_number = "";
        var places = [searchBox.getPlace()];
        if (!places || places.length == 0) {
          return;
        }
        if (places[0] && places[0].address_components) {
          for (var i = 0; i < places[0].address_components.length; i++) {
            for (var j = 0; j < places[0].address_components[i].types.length; j++) {
              if (places[0].address_components[i].types[j] == "postal_code") {
                checkZipcode = true;
              }
            }
          }
        }
        this.getData().valid = true;
        if (!checkZipcode) {
          this.getData().valid = false;
          this.setAddressJson({});
          onChange({
            instance: this
          });
          onError({
            instance: this
          });
          return false;
        }
        places.map(place => {
          if (place.geometry === undefined) {
            return;
          }
          var address_components = place.address_components;
          for (var i = 0; i < address_components.length; i++) {
            for (var j = 0; j < address_components[i].types.length; j++) {
              if (address_components[i].types[j] == "postal_code") {
                zipcode = address_components[i].long_name;
              }
              if (address_components[i].types[j] == "street_number") {
                street_number = address_components[i].long_name;
              }
            }
          }

          //Selection informations villes
          var locality = (0, _map.getParamMap)(address_components, "locality");
          var administrative_area_level_1 = (0, _map.getParamMap)(address_components, "administrative_area_level_1");
          var administrative_area_level_2 = (0, _map.getParamMap)(address_components, "administrative_area_level_2");
          var country = (0, _map.getParamMap)(address_components, "country");
          var route = (0, _map.getParamMap)(address_components, "route");
          ville = (0, _map.getVille)(place, locality, administrative_area_level_1, administrative_area_level_2);
          addressJSon["street_number"] = street_number;
          addressJSon["zipcode"] = zipcode;
          addressJSon["v2_map"] = true;
          addressJSon["city"] = ville;
          addressJSon["locality"] = locality;
          addressJSon["administrative_area_level_1"] = administrative_area_level_1;
          addressJSon["administrative_area_level_2"] = administrative_area_level_2;
          addressJSon["country"] = country;
          addressJSon["route"] = route;
          addressJSon["lat"] = place.geometry["location"].lat();
          addressJSon["lng"] = place.geometry["location"].lng();
          addressJSon["formatted_address"] = place.formatted_address;
          addressJSon["is_from_map"] = true;
        });
        this.setAddressJson(addressJSon);
        setTimeout(() => {
          onChange({
            instance: this
          });
        }, 100);
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
      label: _label = "",
      citiesOptions = [],
      customAddressText = "L'adresse n'est pas reconnue",
      onChange = () => {},
      onError = () => {}
    } = $config;
    var {
      label: _cityLabel = ""
    } = citiesParams;
    var {
      label: addressLabel = ""
    } = addressTextParams;
    var {
      label: zipCodeLabel = ""
    } = zipCodeParams;
    var idAddressText = (0, _pwComponentsCoreDev.idGenerator)();
    var callBackCity = result => {
      if (result) {
        this.config.city = result;
        this.update();
        customSetAddressJson();
      }
    };
    var customSetAddressJson = () => {
      var full_address = this.config.addressText;
      var postal_code = this.config.zipcode;
      var city = this.config.city;
      if (city) {
        var format_rp = (0, _map.getFullAdress)(city, postal_code, full_address);
        this.setAddressJson(format_rp);
        this.update();
      } else {
        this.setAddressJson({});
      }
    };
    var sendRequestCity = (city, postal_code, isNotChange) => {
      var address = "".concat(city, "\" \"").concat(postal_code);
      var params = {
        address: address
      };
      if (!isNotChange) {
        this.toogleLoading(true);
      }
      (0, _map.getCity)(params, callBackCity);
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
    var changeAddressText = event => {
      var {
        currentTarget: event
      } = event;
      var {
        value
      } = event;
      this.config.addressText = value;
      this.refresh();
      customSetAddressJson();
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
          this.setAddressJson({});
          prevPostalCode = null;
          $(".form_edit_info.locality").val("");
          $(".form_edit_info.locality").html('');
        }
        this.config.zipcode = currentValue;
        this.refresh();
        customSetAddressJson();
      }, 500);
    };
    var customAddressFields = () => {
      var {
        isCustomAddress = false,
        customAddressElements = () => {
          return {};
        },
        country
      } = this.config;
      var elements = {
        fullAddressInput: () => {
          return h(_pwComponentsJsxDev.PwInput, {
            "ref": idAddressText,
            "attrs": {
              "config": _objectSpread(_objectSpread({
                type: "text"
              }, addressTextParams), {}, {
                isDirect: true,
                onChange: changeAddressText
              })
            }
          });
        },
        fullAddressLabel: () => {
          return addressLabel;
        },
        fullAddressElement: () => {
          return h("div", {
            "class": "col-md-12"
          }, [h("label", {
            "class": "form-check-label _custom_label"
          }, [elements.fullAddressLabel(), elements.fullAddressInput()])]);
        },
        zipcodeInput: () => {
          return h("input", {
            "attrs": {
              "type": "text",
              "placeholder": "Code postal"
            },
            "class": "pw_input custom_input postal_code",
            "on": {
              "change": loadCity,
              "click": loadCity,
              "input": loadCity
            }
          });
        },
        zipcodeLabel: () => {
          return zipCodeLabel;
        },
        zipCodeElement: () => {
          return h("label", {
            "class": "form-check-label _custom_label pw_input"
          }, [elements.zipcodeLabel(), elements.zipcodeInput()]);
        },
        cityInput: () => {
          return h(_pwComponentsJsxDev.PwSelect, {
            "attrs": {
              "config": _objectSpread({
                options: citiesOptions
              }, citiesParams)
            }
          });
        },
        cityLabel: () => {
          return _cityLabel;
        },
        cityElement: () => {
          return h("label", {
            "class": "pw_input"
          }, [elements.cityLabel(), elements.cityInput()]);
        }
      };
      var getElements = () => {
        return _objectSpread(_objectSpread({}, elements), customAddressElements({
          elements,
          instance: this,
          showCustomAddress,
          customAddressText
        }));
      };
      var render = () => {
        var elements = getElements();
        return h("div", {
          "attrs": {
            "id": "google-analayze-complete"
          },
          "class": "custom_inputs google-analayze-complete modal_custom_group mx-auto"
        }, [h("div", {
          "class": "row _full_input_adress"
        }, [elements.fullAddressElement(), h("div", {
          "class": "col-md-12"
        }, [h("div", {
          "class": "row zip_code_city"
        }, [h("div", {
          "class": "col-md-6"
        }, [elements.zipCodeElement()]), h("div", {
          "class": "col-md-6"
        }, [elements.cityElement()])])])])]);
      };
      if (isCustomAddress) {
        return render();
      }
    };
    var mapAddressFields = () => {
      var {
        isCustomAddress = false,
        params = {},
        customElements = () => {
          return {};
        }
      } = this.config;
      var {
        attrs = {}
      } = params;
      var {
        id: elementId
      } = attrs;
      var elements = {
        input: () => {
          return h(_pwComponentsJsxDev.PwInput, {
            "ref": "input",
            "attrs": {
              "config": _objectSpread(_objectSpread({
                isDirect: true
              }, $config), {}, {
                onChange: () => {},
                onError: () => {}
              })
            }
          });
        },
        label: () => {
          return _label;
        },
        custom: () => {
          return h("p", {
            "class": "stl-info_address",
            "on": {
              "click": showCustomAddress
            }
          }, [h("a", {
            "attrs": {
              "href": "#"
            }
          }, [customAddressText])]);
        },
        pwInput: () => {
          return h("label", {
            "class": "pw_input"
          }, [elements.label(), elements.input()]);
        }
      };
      var getElements = () => {
        return _objectSpread(_objectSpread({}, elements), customElements({
          elements,
          instance: this,
          showCustomAddress,
          customAddressText
        }));
      };
      var render = () => {
        var elements = getElements();
        return h("div", [elements.pwInput(), elements.custom()]);
      };
      if (!isCustomAddress) {
        return render();
      }
    };
    var showCustomAddress = () => {
      this.config.isCustomAddress = true;
      this.getData().isValid = false;
      this.refresh();
    };
    return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
      "class": (0, _classnames.default)(wrapperClassName)
    }, wrapperParams]), [mapAddressFields(), customAddressFields()]);
  }
});
exports.default = _default;