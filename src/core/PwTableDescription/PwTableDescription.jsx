import { C } from "../../vue/helper/V02Component";
import classNames from "classnames";
import { getData } from "pw-components-core-dev";

export default C.make({
	
	$render() {

        var {
			page = null,
			size = null,
		} = this.$config;

		if(size <= 1){
			return null;
		}

		return (
			<div>Affichage de la page {page} sur {size}</div>
		);
	},
});