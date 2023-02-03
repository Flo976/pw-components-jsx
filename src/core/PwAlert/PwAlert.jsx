import { C } from "../../vue/helper/V01Component";
import styles from "./PwAlert.scss?module";
import classNames from "classnames";
import { getData } from "pw-components-core-dev";

export default C.make({
	getData() {
		var data = getData(this);
		var { 
			isVisible = false, 
			hasConfig = false 
		} = this.$config;
		var { isVisible: dataIsVisible = isVisible } = data;

		if (hasConfig) {
			data.isVisible = isVisible;
		} else {
			data.isVisible = dataIsVisible;
		}
		
		return getData(this);
	},
	isVisible() {
		var data = this.getData();
		return data.isVisible;
	},
	toggle() {
		if (this.isVisible()) {
			this.hide();
		} else {
			this.show();
		}
	},
	show() {
		var data = this.getData();
		data.isVisible = true;
		this.refresh();
	},
	hide() {
		var data = this.getData();
		data.isVisible = false;
		this.refresh();
	},
	$render() {
		var { isVisible, config } = this;
		
		var {
			content,
			className = "",
			color = "primary",
		} = config;

		if (!isVisible()) {
			return null;
		}

		var getColor = () => {
			return `alert-${color}`
		}

		return (
			<div class={classNames("alert", getColor(), className)} role="alert">
			  	{content}
			</div>
		);
	},
});
