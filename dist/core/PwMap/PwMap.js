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
var _PwMap = _interopRequireDefault(require("./PwMap.scss?module"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
//https://developers.google.com/earth-engine/apidocs/map-setcenter
//https://developers.google.com/maps/documentation/javascript/reference#LatLngLiteral
//https://stackoverflow.com/questions/2773263/google-maps-setcenter
var _default = _V02Component.C.make({
  addMarker() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var {
      map
    } = this.getData();
    var {
      latitude,
      longitude,
      icon = {
        url: "../../images/map/marker.png",
        // url
        scaledSize: new google.maps.Size(21.109, 29.692),
        // scaled size
        origin: new google.maps.Point(0, 0),
        // origin
        anchor: new google.maps.Point(0, 0) // anchor
      }
    } = params;
    var marker = new google.maps.Marker({
      position: {
        lat: latitude,
        lng: longitude
      },
      map: map,
      icon: icon
    });
    return marker;
  },
  initData() {
    var {
      mapElement
    } = this.$refs;
    var {
      $config
    } = this;
    var {
      latitude,
      longitude,
      zoom = 10,
      onInit = () => {},
      mapConfig = {}
    } = $config;
    if (mapElement) {
      var mc = _objectSpread({}, mapConfig);
      var map = new google.maps.Map(mapElement, mapConfig);
      if (latitude && longitude) {
        map.setCenter(new google.maps.LatLng(latitude, longitude));
      }
      if (zoom) {
        map.setZoom(zoom);
      }
      this.getData().map = map;
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
      params = {}
    } = $config;
    return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
      "class": (0, _classnames.default)("pw_map", className),
      "ref": "mapElement"
    }, params]), ["MAP"]);
  }
});
exports.default = _default;