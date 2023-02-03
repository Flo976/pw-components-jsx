import { C } from "../../vue/helper/V02Component";
import classNames from "classnames";
import { waitInput, handleInput } from "pw-components-core-dev";

export default C.make({
	isValid(){
		var { $config } = this;
		var {
			onError = () => {},
			onSuccess = () => {},
			required = false,
		} = $config;

		var {$refs:{
			input
		}} = this;
		
		if (required) {
			var valid = this.$refs.input.value;
			return valid
		}
		return true;
	},
	$render() {
		var { $config } = this;
		var {
			params = {},
			delay,
			placeholder = "",
			name,
			onInput = () => {},
			onChange = () => {},
			onBlur = () => {},
			onKeypress = () => {},
			onError = () => {},
			onSuccess = () => {},
			className,
			value,
			rows = 3,
			disabled = false,
			readonly = false,
			required = false,
		} = $config;
		var onUpdate = (callback, manageError = false) => {
			return (event) => {
				var { currentTarget: input } = event;
				handleInput({
					input,
					event,
					then: (params = {}) => {
						var { value, input, event } = params;
						callback({ value, input, event });
						var handleStatus = (valid) => {
							if (!valid) {
								if (manageError) {
									onError({ value, input, event });
									return true;
								}
							} else {
								onSuccess({ value, input, event });
								return true;
							}
						};
						if (required) {
							var valid = this.$refs.input.value;
							handleStatus(valid);
						}
					},
					delay,
				});
			};
		};

		return (
			<textarea
				ref="input"
				placeholder={placeholder}
				rows={rows}
				name={name}
				onInput={onUpdate(onInput)}
				onChange={onUpdate(onChange, true)}
				onBlur={onUpdate(onBlur, true)}
				onKeypress={onKeypress}
				class={classNames(className, "pw_textarea")}
				disabled={disabled}
				readonly={readonly}
				required={required}
				{...params}
			>
				{value}
			</textarea>
		);
	},
});
