"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _V02Component = require("../../vue/helper/V02Component");
var _PwChart = _interopRequireDefault(require("./PwChart.scss?module"));
var _classnames = _interopRequireDefault(require("classnames"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
var _apexcharts = _interopRequireDefault(require("apexcharts"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _V02Component.C.make({
  init() {
    var {
      $config
    } = this;
    var {
      onInit = () => {},
      data = {}
    } = $config;
    var {
      graph
    } = this.$refs;
    try {
      var chart = new _apexcharts.default(graph, data);
      chart.render();
      this.getData().chart = chart;
      onInit(this);
    } catch (e) {
      console.log(e);
    }
  },
  setSeries(data) {
    this.getData().chart.updateSeries(data);
  },
  $render() {
    const h = this.$createElement;
    this.onReady();
    return h("div", {
      "ref": "graph"
    });
  }
});
exports.default = _default;