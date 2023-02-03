import { C } from "../../vue/helper/V02Component";
import styles from "./PwField.scss?module";
import classNames from "classnames";
import { getData } from "pw-components-core-dev";
import PwInput from "../PwInput/PwInput";
import PwTextarea from "../PwTextarea/PwTextarea";
import PwPassword from "../PwPassword/PwPassword";

export default C.make({
	setError(){
		var data = this.getData();
        setTimeout(() => {
            data.hasError = true;
            this.refresh();
        }, 200);
	},
	setData(k, v){
		var { $config } = this;
		$config[k] = v
	},
	getData(){
		var { $config } = this;
		var { errorMessage:errorMessageDefault = ""} = $config;
		var data = getData(this.$el);
		var {errorMessage = errorMessageDefault} = data;
		data.errorMessage = errorMessage;
		return data;
	},
	$render() {
		var { $config } = this;

		var { 
			input = {},
			autoValidate = false, 
			errorClass = "feedback_error",
			component: Tag = "PwInput"
		} = $config;

		var error = () => {
			var {hasError, errorMessage} = this.getData()
			if (!hasError) {
				return null;
			}
			return <span class={classNames(errorClass)}>{errorMessage}</span>;
		};
		var containerClass = () => {
			if(!this.$el){
				return null;
			}
			var {hasError} = this.getData()
			if (!hasError) {
				return "";
			}
			return "field_error";
		};
		input.onError = () =>{
			if(!autoValidate){
				return true
			}
			this.getData().hasError = true
			this.refresh()
		}
		input.onSuccess = () =>{
			if(!autoValidate){
				return true
			}
			this.getData().hasError = false
			this.refresh()
		}
		input.onTyping = () =>{
			if(!autoValidate){
				return true
			}
			this.getData().hasError = false
			this.refresh()
		}
		setTimeout(() =>{
			this.getData().instance = this
		}, 100)

		var renderField = () => {
			if (Tag === "PwTextarea") {
				return (
					<PwTextarea
						ref="input"
						config={input}
					/>
				)
			} 
			else if (Tag === "PwPassword") {
				return (
					<PwPassword
						ref="input"
						config={input}
					/>
				)
			}
			else if (Tag === "PwInputFile") {
				return (
					<PwInputFile
						ref="input"
						config={input}
					/>
				)
			}
			else {
				return (
					<PwInput
						ref="input"
						config={input}
					/>
				)
			}
		}

		return (
			<div class={containerClass()}>
				{error()}
				{renderField()}
			</div>
		);
	},
});
