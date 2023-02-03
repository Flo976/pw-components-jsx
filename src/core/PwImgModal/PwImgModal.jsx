import { C } from "../../vue/helper/V02Component";
import styles from "./PwImgModal.scss?module";
import classNames from "classnames";
import { getData } from "pw-components-core-dev";
import { showModal } from "../../functions/modalFunction.js";
import PwImg from "../PwImg/PwImg";
import Modal from "./Modal";

export default C.make({
	$render() {
		var { $config } = this;
		var { url, className = "", backdrop } = $config;
		var onClick = () => {
			showModal(Modal, {
				url,
				backdrop
			});
		};

		return (
			<img
				class={classNames(className, "pw_img")}
				src={url}
				onClick={onClick}
			/>
		);
	},
});
