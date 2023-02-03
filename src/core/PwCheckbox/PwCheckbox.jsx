import { C } from "../../vue/helper/V02Component";
import style from "./PwCheckbox.scss?modules";
import classNames from "classnames";
import { idGenerator } from "pw-components-core-dev";

export default C.make({
	
	$render() {
		var { $config } = this;
		var {
			params = {},
			name = "",
			label = "",
			onChange = () => {},
			className,
			checked = false,
		} = $config;

		var change = (event) => {
			var input = event.currentTarget
			onChange({input, instance: this, event})
		}
		return (
			<label class={classNames("field_checkbox", className)}>
                <input
                	key={idGenerator()}
					ref="input"
					type="checkbox"
					name={name}
					onChange={change}
					checked={checked}
					{...params}
				/>
                <span class="checkbox_indicator"></span>
                <span class="checkbox_label">{label}</span>
            </label>
		);
	},
});
