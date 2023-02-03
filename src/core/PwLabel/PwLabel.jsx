import { C } from "../../vue/helper/V02Component";
import styles from "./PwLabel.scss?module";
import classNames from "classnames";
import { getData } from "pw-components-core-dev";
import PwField from "../PwField/PwField";

export default C.make({
	$render() {
		var { $config } = this;
		var { label, champ, className, params = {} } = $config;
		return (
			<div class={classNames(className, "pw_label")} {...params}>
				<label>
					{label}
					{champ}
				</label>
			</div>
		);
	},
});
