import { C } from "../../vue/helper/V02Component";
import styles from "./PwSpan.scss?module";
import classNames from "classnames";
import { getData } from "pw-components-core-dev";

export default C.make({
	$render() {
		var {$config} = this;
		var {className} = $config

		return (
			<div class={className}>
				SPAN
			</div>
		);
	},
});
