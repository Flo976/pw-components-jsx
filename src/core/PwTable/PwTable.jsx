import { C } from "../../vue/helper/V02Component";
import styles from "./PwTable.scss?module";
import classNames from "classnames";
import { getData } from "pw-components-core-dev";
import PwLoading from "../PwLoading/PwLoading";

export default C.make({
	getData() {
		return getData(this);
	},
	setRows(rows = []) {
		var data = this.getData();
		data.rows = rows;
		this.refresh();
	},
	setCols(cols = []) {
		var data = this.getData();
		data.cols = cols;
		this.refresh();
	},
	getClassOrderOf(key) {
        var classname = "sorting";
        var { order = {} } = this.$config;
        var {
        	rowKey = "created_at",
        	direction = "DESC",
        } = order;

        if (rowKey == key) {
            if (direction == "ASC") {
                classname = "sorting sorting_asc";
            }
            if (direction == "DESC") {
                classname = "sorting sorting_desc";
            }
        }
        return classname;
    },
	onReady() {
		var { ready = false } = this.getData();
		if (!ready) {
			ready = true;
			this.getData().ready = ready;
			setTimeout(() => {
				this.refresh();
			}, 1000);
		}
	},
	$render() {
		this.onReady();
		var { $config = {} } = this;
		var {
			cols: defaultCols = [],
			rows: defaultRows = [],
			emptyMessage = "Aucune donnée trouvée",
			initMessage = "Chargement en cours ...",
			mode,
			hasInitialMessage = false,
			className = "",
			isVisibleLoading = false,
			hasConfig = false,
			hasCheckboxSelection = false,
			isAllRowsChecked = false,
			handleChangeOrder = () => {},
			handleChangeCheckboxHead = () => {},
			handleChangeCheckboxBody = () => {},
			instance_table = null
		} = $config;
		var data = this.getData();
		var { cols = defaultCols, rows = defaultRows } = data;

		if (hasConfig) {
			rows = defaultRows;
			cols = defaultCols;
		}

		data.cols = cols;
		data.rows = rows;

		var th = () => {
			var ths = () => {
				var ths = [];

				if (hasCheckboxSelection) {
					ths.push(
						<th 
							scope="col" 
						>
							<input
	                            type="checkbox"
	                            class=""
	                            checked={ isAllRowsChecked }
	                            onChange={ handleChangeCheckboxHead }
	                        />
	                   	</th>
					)
				}

				cols.map((col = {}) => {
					var { 
						text = "", 
						rowKey = "",
						isOrderable = false, 
					} = col;

					if (isOrderable) {
						ths.push(
							<th 
								scope="col" 
								class={classNames(this.getClassOrderOf(rowKey))}
								onClick={handleChangeOrder(rowKey)}
							>
								{text}
							</th>
						);
					} else {
						ths.push(<th scope="col">{text}</th>);
					}
				});

				return ths;
			};
			return <tr>{ths()}</tr>;
		};
		var trs = () => {
			var empty = () => {
				var colspan = () => {
					return cols.length;
				};
				return (
					<tr>
						<td colspan={colspan()} class="text-center">
							{emptyMessage}
						</td>
					</tr>
				);
			};
			var init = () => {
				var colspan = () => {
					return cols.length;
				};
				return (
					<tr>
						<td colspan={colspan()} class="text-center">
							{initMessage}
						</td>
					</tr>
				);
			};
			var { loading } = this.$refs;
			if (!loading) {
				return null;
			}
			var { isVisible } = loading;

			if (hasConfig) {
				isVisible = () => {
					return isVisibleLoading;
				};
			}

			if (isVisible() && (!rows || rows.length == 0)) {
				return init();
			}
			if (!rows || !rows.length) {
				return empty();
			}
			return rows.map((row = {}, index) => {
				var colsElement = () => {
					var tds = [];

					if (hasCheckboxSelection) {
						var { checked = false } = row
						tds.push(
							<td >
								<input
		                            type="checkbox"
		                            class=""
		                            checked={ checked }
		                            onChange={ handleChangeCheckboxBody(index) }
		                        />
		                   	</td>
						)
					}
					
					cols.map((col = {}) => {
						var {
							rowKey,
							onRender = (params = {}) => {
								var { value } = params;
								return value;
							},
						} = col;
						var { [rowKey]: value = "" } = row;
						var params = { line: row, key: rowKey, value, instance_pwdatable: instance_table };

						tds.push(
							<td>
								{onRender(params)}
							</td>
						);
					});

					return tds;
				};
				var tr = () => {
					return <tr>{colsElement()}</tr>;
				};
				return tr();
			});
		};
		var getDesign = () => {
			if (mode == "striped") {
				return "table-striped";
			}
			return "";
		};
		return (
			<div class="position-relative">
				<table class={classNames("table", getDesign(), className)}>
					<thead>{th()}</thead>
					<tbody>{trs()}</tbody>
				</table>
				<PwLoading ref="loading" config={{
					isVisible: isVisibleLoading, 
					hasConfig
				}} />
			</div>
		);
	},
});
