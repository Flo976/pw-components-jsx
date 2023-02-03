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
      width = 300,
      colors = [],
      series = [],
      orientation = "vertical",
      data = {}
    } = $config;
    var {
      graph
    } = this.$refs;
    var horizontal = false;
    if (orientation == "horizontal") {
      horizontal = true;
    }
    try {
      if (!data.chart) {
        data.chart = {};
      }
      if (!data.fill) {
        data.fill = {
          type: "solid"
        };
      }
      if (!data.plotOptions) {
        data.plotOptions = {};
      }
      if (!data.plotOptions.bar) {
        data.plotOptions.bar = {};
      }
      if (!data.chart.toolbar) {
        data.chart.toolbar = {};
      }
      if (!data.chart.toolbar.tools) {
        //data.chart.toolbar.tools = {};
      }
      //data.chart.toolbar.tools.zoom = false;
      data.chart.toolbar.show = false;
      data.fill.colors = colors;
      data.plotOptions.bar.horizontal = horizontal;
      data.chart.type = "bar";
      data.chart.width = width;
      data.colors = colors;
      data.series = series;
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