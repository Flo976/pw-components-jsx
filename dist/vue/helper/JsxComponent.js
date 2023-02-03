"use strict";

require("core-js/modules/es.array.push.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsxComponent = JsxComponent;
exports.JsxConfig = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _vue = _interopRequireDefault(require("vue"));
var _ready = require("./ready");
var _pwComponentsCoreDev = require("pw-components-core-dev");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
/!\ Important note
1 - Calling component without using JsxConfig.create is now de precated
for new components (old components are yet allowed bug using new features will not be available)

 */

function JsxComponent(_ref) {
  let {
    render,
    components,
    methods,
    onReady
  } = _ref;
  if (!methods) {
    methods = {};
  }
  if (!onReady) {
    onReady = () => {};
  }
  return {
    components,
    props: ["config"],
    data: (0, _ready.initReady)(onReady),
    methods: _objectSpread({}, _objectSpread({
      $onRender(f) {
        var run = () => {
          var el = this.$el;
          var data = getData(el);
          f(this);
          if (!data.ready) {
            data.ready = true;
          }
        };
        setTimeout(run, 100);
      },
      $baseInitiate() {
        if (this.$renderMethod) {
          this.$onRender(this.$renderMethod);
        }
      },
      /*
      Use instance.$deepRefresh to refresh also all sub-child components deeply
      Note : 
      	a- this method is greedy because it will refresh all sub child
      	so the purpose is never use this inside a component that have unkown
      	or a big amount of sub-child (sub-sub-childs included)
       */
      $deepRefresh() {
        this.refresh();
        var {
          $childs = []
        } = this.config;
        if ($childs && $childs.map) {
          $childs.map(child => {
            child.$deepRefresh();
          });
        }
      },
      /*
      Feature : Manipulating child parent
      Use $getChild(key) to get the indexed child from the current component
      Usage : 
      	1 - <Child config={{ $index: "myCustomChildKey" }}/>
      	1 - this.$getChild("myCustomChildKey") -> childInstance : Instance
      Note : 
      	a - Trust only this method if not calling the child inside a loop / map
      	b - Loop and map could be patched using
      		i - <Child config={{ $index: `myCustomChildKey${index}` }}/>
      		ii - this.$getChild(`myCustomChildKey${index}`) -> childInstance : Instance
      	c - This function will return undefined if the config key is not defined
      		for the parent component (define it using JsxConfig.create)
       */
      $getChild(key) {
        var {
          $childIndexes = {}
        } = this.config;
        var {
          [key]: child
        } = $childIndexes;
        return child;
      },
      getContent() {
        return this.$options._renderChildren;
      },
      update() {
        this.$forceUpdate();
      },
      refresh() {
        if (this.config) {
          this.config.refreshState = 2;
          this.update();
          this.config.refreshState = 1;
          this.update();
        }
      },
      parentConfig(k) {
        if (this.config.parent && this.config.parent && this.config.parent.config) {
          return this.config.parent.config[k];
        }
        return null;
      },
      currentConfig(k) {
        if (this.config) {
          return this.config[k];
        }
        return null;
      },
      registerChild() {
        if (this.config && this.config.parent) {
          this.config.parent.child = this;
        }
      },
      getConfig(k, v) {
        if (this.config) {
          return this.config[k];
        }
      },
      setConfig(k, v) {
        if (this.config && this.config[k]) {
          this.config[k] = v;
        }
      },
      getData(k, v) {
        if (this.config && this.config.data) {
          return this.config.data[k];
        }
      },
      setData(k, v) {
        if (this.config && this.config.data && this.config.data[k]) {
          this.config.data[k] = v;
        }
      },
      setValue(key, value) {
        this.config[key] = value;
        this.update();
      }
    }, methods)),
    render(h) {
      (0, _ready.getReady)(this);
      this.registerChild();
      this.$baseInitiate();
      this.$config = this.config;

      //Experimetal
      /*if(this.$saveConfig){
      	this.$saveConfig(this.config);
      }*/
      return render.apply(this, [h, this, this.config]);
    }
  };
}

/*
JsxConfig provide a new way to create a JsxComponent configuration
Usage : 
	1 - create({data, key, then, nonIndexed}) -> config : Object
		i - data is the config : eg : {}
		ii - key is the key indexation to retrieve the saved configuration
			If not defined, the system will define on arbitraty
		iii - then will provide the key (necessary in case of it was defined arbitrary)
		iv - nonIndexed will tell that the configuration is non indexed
			so it will be reseted by any refresh or parent update
Notes :
	a - prefer use nonIndexed instead of direct object configuration (Deprecated)

 */

class JsxConfig {
  //Provide time is in ms, necessary for key arbirary reception

  static create() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var {
      data = {},
      key,
      then = () => {},
      nonIndexed = false
    } = params;
    if (nonIndexed) {
      return data;
    }
    if (!key) {
      key = (0, _pwComponentsCoreDev.idGenerator)();
    }
    if (!JsxConfig.config[key]) {
      JsxConfig.config[key] = data;
    }
    setTimeout(() => {
      then(key);
    }, 10);
    return JsxConfig.config[key];
  }
}
exports.JsxConfig = JsxConfig;
_defineProperty(JsxConfig, "provideTime", 10);
_defineProperty(JsxConfig, "config", {});