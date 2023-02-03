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
      labels = [],
      series = [],
      data = {},
      fill
    } = $config;
    var {
      graph
    } = this.$refs;
    try {
      if (!data.chart) {
        data.chart = {};
      }
      if (!data.chart.toolbar) {
        data.chart.toolbar = {
          tools: {
            download: true,
            selection: true,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          }
        };
      }
      //data.chart.toolbar.show = false
      data.chart.type = "area";
      data.chart.width = width;
      data.colors = colors;
      data.labels = labels;
      data.series = series;
      data.fill = fill;
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