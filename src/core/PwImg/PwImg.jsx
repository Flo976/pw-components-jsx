import { C } from "../../vue/helper/V02Component";
import styles from "./PwImg.scss?module";
import classNames from "classnames";
import { getData } from "pw-components-core-dev";

export default C.make({
	$render() {
		var { $config } = this;
		var { url, className = "" } = $config;

		return <img class={classNames(className, "pw_img")} src={url} />;
	},
});
