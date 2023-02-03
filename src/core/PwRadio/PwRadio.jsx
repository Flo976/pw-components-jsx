import { C } from "../../vue/helper/V02Component";
import style from "./PwRadio.scss?modules";
import classNames from "classnames";
import { idGenerator } from "pw-components-core-dev";

export default C.make({
	
	$render() {
		var { $config } = this;
		var {
			params = {},
			name = "",
			label = "",
			value = "",
			onChange = () => {},
			className,
			valueChecked = "",
		} = $config;

		var ischecked = false

		if (valueChecked === value) {
			ischecked = true
		}

		var change = (event) => {
			var input = event.currentTarget
			var isChecked = $(input).prop("checked")
			onChange({input, instance: this, event, isChecked})
		}
		return (
			<label class={classNames("field_radio", className)}>
                <input
                	key={idGenerator()}
					ref="input"
					type="radio"
					name={name}
					value={value}
					onChange={change}
					checked={ischecked}
					{...params}
				/>
                <span class="radio_indicator"></span>
                <span class="radio_label">{label}</span>
            </label>
		);
	},
});
