import { C } from "../../vue/helper/V02Component";
import classNames from "classnames";
import styles from "./PwDatepicker.scss?module";
import { getData } from "../../tools/indexation/indexation.js";

import "bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import "bootstrap-datepicker/dist/locales/bootstrap-datepicker.fr.min.js";

import {PwInput} from "pw-components-jsx-dev";

import moment from "moment";
moment.locale("fr-ca");

export default C.make({
	
	initDatepicker() {
		var { $config } = this;
		var { 
			format = "dd/mm/yyyy", 
			language = "fr", 
			autoclose = true, 
			startView = "years", 
			datepickerParams = {},
			onChange = () => {},
			onInit = () => {},
			value,
		} = $config;

		var { input } = this.$refs;
		var datepicker = $(input.$el).datepicker({
	        language,
			format,
	        autoclose,
	        startView,
	        ...datepickerParams
		});

		this.getData().datepicker = datepicker

		datepicker.datepicker("setDate", value)

		onInit(this)

		datepicker.on("changeDate", (event) => {
			var value = $(input.$el).val()
			onChange({value, input: input.$el, event})
		});
	},

	getValue() {
		return $(this.$refs.input.$el).val()
	},

	setValue(value) {
		var { $config } = this;
		var {
			setValue = () => {},
		} = $config;

		this.getData().datepicker.datepicker("setDate", value)

		setValue({value:$(this.$refs.input.$el).val(), instance: this})
	},

	handleClickIco(e) {
		e.preventDefault()
		this.getData().datepicker.datepicker("show")
	},

	onReady() {
		var { ready } = this.getData()

		if (!ready) {
			this.getData().ready = true;
			setTimeout(() => {
				this.initDatepicker()
			}, 100)
		}
	},

	renderIcon() {
		var { $config = {} } = this;
		var { 
			showIcon = true, 
			icon = (<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>) 
		} = $config

		if (!showIcon) {
			return null;
		}

		return (
			<span class="icon" onClick={this.handleClickIco}>
				{icon}
			</span>
		)
	},

	$render() {
		this.onReady()
		var { $config = {} } = this;

		var {
			format = "dd/mm/yyyy", 
			label = ""
		} = $config

		return (
			<label class="pw_datepicker">
				{label}
				<PwInput
					ref="input"
				    config={{
				        mask: { alias: "datetime", inputFormat: format },
				        ...$config,
				    }}
				/>
				{this.renderIcon()}
			</label>
		)
	},
});
