import { C } from "../../vue/helper/V01Component";
import classNames from "classnames";
import styles from "./PwModalExample.scss?module";
import { getData } from "pw-components-core-dev";

export default C.make({
	getData() {
		var data = getData(this);
		
		return getData(this);
	}, 
	show() {
		var { modal } = this.$refs;
		$(modal).modal("show")
	},
	hide() {
		var { modal } = this.$refs;
		$(modal).modal("hide")
	},
	$render() {
		return (
			<div class="modal fade" ref="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
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
