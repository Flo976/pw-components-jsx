import { C } from "../../vue/helper/V02Component";
import styles from "./PwPassword.scss?module";
import classNames from "classnames";
import Inputmask from "inputmask";
import { waitInput, handleInput } from "pw-components-core-dev";
import PwInput from "../PwInput/PwInput";

export default C.make({
    getLocalData() {
        var { $config } = this;
        var { 
            showPassword: showPasswordDefault = false 
        } = $config;
		var {
            showPassword = showPasswordDefault
        } = this.getData();
        this.getData().showPassword = showPassword;

        return this.getData();
    },

    renderEyeOff() {
        var { $config } = this;
        var {
            eyeOff = () => { return null }
        } = $config;

        if(eyeOff()){
            return eyeOff();
        }
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
        );
    },
	
    renderEyeOn() {
        var { $config } = this;
        var {
            eyeOn = () => { return null }
        } = $config;
        
        if(eyeOn()){
            return eyeOn();
        }
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        );
    },

    renderEye() {
        var { showPassword } = this.getLocalData();
        if(showPassword){
            return this.renderEyeOff();
        }
        else{
            return this.renderEyeOn();
        }
    },

    getType() {
        var { showPassword } = this.getLocalData();
        if(showPassword){
            return "text";
        }
        else{
            return "password";
        }
    },

    toggleType() {
        
        var { showPassword } = this.getLocalData();
        this.getData().showPassword = !showPassword;
        this.refresh();
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
			onTyping = () => {},
			className,
			value,
			disabled = false,
			readonly = false,
			required = true,
			mask,
            params = {
                attrs: {
                    
                }
            },
            getParams = () => {}
		} = $config;

		return (
            <label class={classNames("field_pwd", className)}>
                <PwInput 
                    config={{
                        delay,
                        type: this.getType(),
                        name,
                        placeholder,
                        required,
                        value,
                        disabled,
                        readonly,
                        onChange,
                        onInput,
                        onBlur,
                        onKeypress,
                        onError,
                        onSuccess,
                        onTyping,
                        mask,
                        params: {
                            ...params,
                            attrs: {
                                autocomplete: "current-password",
                                ...params.attrs,
                            }
                        },
                        getParams
                    }}
                />
                <span class="eye" onClick={this.toggleType}>{this.renderEye()}</span>
            </label>
		);
	},
});
