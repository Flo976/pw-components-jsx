import { C } from "../../vue/helper/V02Component";
import styles from "./PwChart.scss?module";
import classNames from "classnames";
import { getData } from "pw-components-core-dev"
import ApexCharts from "apexcharts";

export default C.make({
	init() {
		var { $config } = this;
		var {
			onInit = () => {},
			width = 300,
			colors = [],
			labels = [],
			series = [],
			data = {},
			fill,
		} = $config;
		var { graph } = this.$refs;

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
						customIcons: [],
					},
				};
			}
			//data.chart.toolbar.show = false
			data.chart.type = "area";
			data.chart.width = width;
			data.colors = colors;
			data.labels = labels;
			data.series = series;
			data.fill = fill;

			var chart = new ApexCharts(graph, data);
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
		this.onReady();

		return <div ref="graph"></div>;
	},
});
