import { C } from "../../vue/helper/V02Component";
import styles from "./PwLoading.scss?module";
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
			animate = true,
			mode,
			color = "",
			overlayColor = "",
		} = config;
		//Possible mode
		//grow
		//border
		if (mode) {
			if (color) {
				animate = false;
				content = (
					<div
						class={classNames(`spinner-${mode}`, `text-${color}`)}
						role="status"
					>
						<span class="sr-only">Loading...</span>
					</div>
				);
				config.animate = animate;
				config.content = content;
			}
		}
		var baseClass = "pw_loading";
		if (content) {
			baseClass = "pw_loading_base";
		}
		if (!isVisible()) {
			return null;
		}
		var animateClass = "";
		if (!animate) {
			animateClass = "pw_loading_not_animate";
		}
		var style = {};
		if (overlayColor) {
			style.backgroundColor = overlayColor;
		}

		return (
			<div class={"pw_loading_overlay"} style={style}>
				<span class={classNames(baseClass, animateClass, className)}>
					{content}
				</span>
			</div>
		);
	},
});
