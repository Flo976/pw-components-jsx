import { C } from "../../vue/helper/V01Component";
import styles from "./PwModal.scss?module";
import classNames from "classnames";
import { getData } from "pw-components-core-dev";
import { PwModalMethodes } from "./PwModalMethodes/PwModalMethodes";

export default C.make({
	...PwModalMethodes.getMethodsJsx(),
	
	$render() {
		return (
			<div class="modal fade" ref="modal" tabindex="-1" role="dialog" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title">Modal title</h5>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			        ...
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			        <button type="button" class="btn btn-primary">Save changes</button>
			      </div>
			    </div>
			  </div>
			</div>
		);
	},
});
