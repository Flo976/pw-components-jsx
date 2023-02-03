"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.V02Component = exports.C = void 0;
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _vue = _interopRequireDefault(require("vue"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
var _JsxComponent = require("./JsxComponent");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var V02Component = {
  getData(object, key) {
    var $data = {};
    if (object && typeof object == "object") {
      $data = object.$data;
    }
    if (key === undefined) {
      return $data;
    }
    return $data[key];
  },
  setData(object) {
    let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var $data = {};
    if (object && typeof object == "object") {
      $data = object.$data;
    }
    Object.keys(params).map(key => {
      var value = params[key];
      $data[key] = value;
    });
  },
  /*
  Plugins management
   */
  plugins: {},
  addPlugin() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Object.keys(params).map(key => {
      var value = params[key];
      V02Component.plugins[key] = value;
    });
  },
  removePlugin() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var {
      names = []
    } = params;
    names.map(name => {
      delete V02Component.plugins[name];
    });
  },
  getPlugin() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var {
      name
    } = params;
    if (name) {
      return V02Component.plugins[name];
    }
    return V02Component.plugins;
  },
  getPluginMethod() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var {
      name,
      method
    } = params;
    var {
      [name]: plugin = {}
    } = V02Component.getPlugin();
    var {
      [method]: methodFunction = () => {}
    } = plugin;
    return methodFunction;
  },
  data: {
    getIndex: _pwComponentsCoreDev.getIndex,
    getData: _pwComponentsCoreDev.getData,
    subscribe: _pwComponentsCoreDev.subscribe
  },
  tree(data, k) {
    return (0, _pwComponentsCoreDev.readTree)({
      data,
      k
    });
  },
  path(k) {
    var data = V02Component;
    return V02Component.tree(data, k);
  },
  upgrades: {},
  saveInstance() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var {
      instance,
      id,
      name
    } = params;
    instances[id] = {
      instance,
      id,
      name
    };
  },
  /*
  Use V02Component.make to setup without specifying render, just define any params as methods
   */
  make() {
    let methods = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let additionnal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var params = _objectSpread(_objectSpread({}, additionnal), {}, {
      methods
    });
    return V02Component.setup(params);
  },
  /*
  Use V02Component.setup to create a JsxComponent with support of config.$data
   */
  setup() {
    let {
      render,
      components,
      methods = {},
      onReady
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    //Experimetal
    /*var cnf = null*/
    methods = _objectSpread(_objectSpread({}, {
      getData() {
        return (0, _pwComponentsCoreDev.getData)(this);
      },
      $cp() {
        return V02Component;
      },
      /*
      Used to get a config.$data[key] or config.$data if key is undefined
       */
      $getData(key) {
        var {
          config = {}
        } = this;
        var {
          $data = {}
        } = config;
        return V02Component.getData(config, key);
      },
      /*
      Used to set dynamically config.$data for each key in params
       */
      $setData() {
        let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        let object = arguments.length > 1 ? arguments[1] : undefined;
        var {
          config = {}
        } = this;
        var {
          $data = {}
        } = config;
        V02Component.setData(config, params);
        config.$data = $data;
      },
      onReadyTiming() {
        return 100;
      },
      onReady() {
        var {
          ready
        } = this.getData();
        var {
          init = () => {}
        } = this;
        if (!ready) {
          this.getData().ready = true;
          setTimeout(() => {
            init();
          }, this.onReadyTiming());
        }
      }
      //Experimetal
      /*$saveConfig() {
      	cnf = this.config
      },
      $getConfig(){
      	return cnf;
      },*/
    }), methods);
    if (methods.$render) {
      render = methods.$render;
    }
    return (0, _JsxComponent.JsxComponent)({
      render,
      components,
      methods,
      onReady
    });
  },
  /*
  Use V02Component.createConfig as shortcut of JsxConfig.create
   */
  createConfig: _JsxComponent.JsxConfig.create,
  /*
  Use V02Component.asConfig when require object data
  to be managed by the childs as a persistent change
  Eg : suppose having object with subojects like
  var o = {
  	forms:[
  		{type:"radio"},
  		{type:"input"}
  	]
  }
  by calling p = V02Component.asConfig(o)
  it will return 
  {
  	$data:{
  		forms:[
  			{
  				$data:{type:"radio"}
  			},
  			{
  				$data:{type:"input"}
  			}
  		]
  	}
  }
  Thanks to this the child component will automatically provide the config.$data object
  This will protect from problems on updating data from child object
  that will not have effect when the parent will be refreshed as non persistent value
   */
  asConfig() {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (Array.isArray(config)) {
      return config.map(V02Component.asConfig);
    } else if (config && typeof config == "object") {
      var $data = {};
      Object.keys(config).map(key => {
        var value = config[key];
        if (key.indexOf("$") == 0) {
          $data[key] = value;
        } else {
          $data[key] = V02Component.asConfig(value);
        }
      });
      return V02Component.asConfigSuperficial($data);
    }
    return config;
  },
  asConfigSuperficial() {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let references = arguments.length > 1 ? arguments[1] : undefined;
    var $data = config;
    return {
      $data
    };
  },
  asObject() {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let references = arguments.length > 1 ? arguments[1] : undefined;
    if (!references || typeof references != "object") {
      references = {};
    }
    if (!references.data) {
      references.data = [];
    }
    if (config) {
      if (typeof config == "object" && !Array.isArray(config) && references.data.indexOf(config) != -1) {
        return {};
      }
    }
    references.data.push(config);
    if (Array.isArray(config)) {
      return config.map(dconfig => {
        return V02Component.asObject(dconfig, references);
      });
    } else if (config && typeof config == "object") {
      if (config.$data) {
        return V02Component.asObject(config.$data, references);
      } else {
        var data = {};
        Object.keys(config).map(key => {
          var value = config[key];
          if (key.indexOf("$") != -1) {
            data[key] = value;
          } else {
            var pvalue = value;
            value = V02Component.asObject(value, references);
            data[key] = value;
          }
        });
        return data;
      }
    }
    return config;
  }
};
exports.V02Component = V02Component;
var C = V02Component;
exports.C = C;