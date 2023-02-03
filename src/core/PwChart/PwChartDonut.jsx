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
			data = {}
		} = $config;
		var { graph } = this.$refs;

		try {
			if(!data.chart){
				data.chart = {}
			}
			data.chart.type = "donut";
			data.chart.width = width;
			data.colors = colors;
			data.labels = labels;
			data.series = series;

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
