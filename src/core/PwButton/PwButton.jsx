import { C } from "../../vue/helper/V02Component";
import classNames from "classnames";
import styles from "./PwButton.scss?module";

export default C.make({
	$render() {
		var { $config } = this;
		var {
			params = {},
			onClick = () => {},
			disabled = false,
			content = null,
			className = "",
			title,
			tag: Tag = "button",
			//TO THINK : size
		} = $config;
		setTimeout(() => {
			var {
				$refs: { element },
			} = this;

			if ($(element).tooltip) {
				$(element).tooltip("dispose");
				$(element).tooltip();
			}
		}, 100);

		return (
			<Tag
				ref="element"
				name={name}
				onClick={onClick}
				class={classNames("pw_button", className)}
				disabled={disabled}
				title={title}
				{...params}
			>
				{content}
			</Tag>
		);
	},
});
