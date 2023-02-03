import { C } from "../../vue/helper/V02Component";
import classNames from "classnames";
import { waitInput, handleInput } from "pw-components-core-dev";
import Inputmask from "inputmask";

var masks = {
	phone: "99 99 99 99 99",
	date: { alias: "datetime", inputFormat: "dd/mm/yyyy" },
};

function getMask(mask) {
	if (masks[mask]) {
		return masks[mask];
	}
	return mask;
}

export default C.make({
	isValid(){
		var { $config } = this;
		var {
			mask,
			onError = () => {},
			onSuccess = () => {},
		} = $config;

		var {$refs:{
			input
		}} = this;
		if (getMask(mask)) {
			var valid = this.$refs.input.inputmask.isComplete();
			return valid
		} else if (required) {
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
			type = "text",
			placeholder = "",
			name,
			onInput = () => {},
			onChange = () => {},
			onPaste = () => {},
			onBlur = () => {},
			onKeypress = () => {},
			onError = () => {},
			onSuccess = () => {},
			onTyping = () => {},
			className,
			value,
			disabled = false,
			readonly = false,
			required = false,
			mask,
			getParams = () => {},
			onRender = () => {},
			isDirect = false
		} = $config;
		onRender(this)
		var onUpdate = (callback, manageError = false) => {
			if(isDirect){
				return (event) =>{
					return callback(event)
				}
			}
			return (event) => {
				var { currentTarget: input } = event;
				handleInput({
					input,
					event,
					then: (params = {}) => {
						var { value, input, event } = params;
						callback({ value, input, event, getParams });
						var handleStatus = (valid) => {
							if (!valid) {
								if (manageError) {
									onError({ value, input, event, getParams });
									return true;
								}
							} else {
								onSuccess({ value, input, event, getParams });
								return true;
							}
							onTyping({ value, input, event, getParams });
						};
						if (getMask(mask)) {
							var valid = this.$refs.input.inputmask.isComplete();
							handleStatus(valid);
						} else if (required) {
							var valid = this.$refs.input.value;
							handleStatus(valid);
						}
					},
					delay,
				});
			};
		};

		setTimeout(() => {
			var m = getMask(mask);
			if (m) {
				var im = new Inputmask(m);
				var {
					$refs: { input: element },
				} = this;
				im.mask(element);
			}
		}, 100);
		if(isDirect){
			return (
				<input
					ref="input"
					type={type}
					placeholder={placeholder}
					name={name}
					onInput={onUpdate(onInput)}
					onChange={onUpdate(onChange, true)}
					onPaste={onUpdate(onChange, true)}
					onBlur={onUpdate(onBlur, true)}
					onKeypress={onKeypress}
					class={classNames(className, "pw_input form-control")}
					disabled={disabled}
					readonly={readonly}
					required={required}
					{...params}
				/>
			);
		}
		return (
			<input
				ref="input"
				type={type}
				placeholder={placeholder}
				name={name}
				onInput={onUpdate(onInput)}
				onChange={onUpdate(onChange, true)}
				onPaste={onUpdate(onChange, true)}
				onBlur={onUpdate(onBlur, true)}
				onKeypress={onKeypress}
				class={classNames(className, "pw_input form-control")}
				value={value}
				disabled={disabled}
				readonly={readonly}
				required={required}
				{...params}
			/>
		);
	},
});
