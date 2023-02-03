import { C } from "../../vue/helper/V01Component";
import styles from "./Modal.scss?module";
import classNames from "classnames";
import { getData } from "pw-components-core-dev";
import { PwModalMethodes } from "../PwModal/PwModalMethodes/PwModalMethodes";
import PwImg from "../PwImg/PwImg";

export default C.make({
	...PwModalMethodes.getMethodsJsx(),

	$render() {
		var { $config } = this;
		var { url = "", backdrop = true } = $config;

		return (
			<div
				class="modal fade"
				ref="modal"
				tabindex="-1"
				role="dialog"
				data-backdrop={backdrop}
				aria-hidden="true"
			>
				<div
					class="modal-dialog modal-xl modal-dialog-centered"
					role="document"
				>
					<div class="modal-content">
						<div class="modal-body position-relative">
							<button
								type="button"
								class="close pw_modal_close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span
									aria-hidden="true"
									class="pw_modal_close_text"
								>
									&times;
								</span>
							</button>
							<PwImg config={{ url }} />
						</div>
					</div>
				</div>
			</div>
		);
	},
});
