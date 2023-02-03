import { C } from "../../vue/helper/V01Component";
import classNames from "classnames";
import PwInput from "../PwInput/PwInput";
import PwTable from "../PwTable/PwTable";
import PwPagination from "../PwPagination/PwPagination";
import PwTableDescription from "../PwTableDescription/PwTableDescription";
import {PwDatatable} from "../../classes/PwDatatable.js";
import { getData } from "pw-components-core-dev";

export default C.make({
    ...PwDatatable.getMethodsJsx(),

    onReady() {
        var { ready = false } = this.getData();
        if (!ready) {
            this.getData().ready = true;
            this.loadTable();
        }
    },

	$render() {
        this.onReady();

        var {
            cols = [],
            hasCheckboxSelection = false,
            datatableOptions = (instance) => {}
        } = this.$config

        var rows = this.getDatas();

		return (
			<div class="container">
                <div class="row">
                    <div class="col-9">
                        { datatableOptions(this) }
                    </div>
                    <div class="col-3">
                        <PwInput
                            ref="search"
                            config={{
                                value: this.getKey(),
                                delay: 0,
                                onInput: (params = {}) => {
                                    var { value, event } = params;
                                    this.changeSearch(value);
                                },
                            }}
                        />
                    </div>
                    <div class="col-12">
                        <PwTable
                            ref="table"
                            config={{
                                hasConfig: true,
                                cols,
                                rows,
                                isVisibleLoading: this.getLoading(),
                                handleChangeOrder: this.handleChangeOrder,
                                order: {
                                    rowKey: this.getOrderBy(),
                                    direction: this.getOrder()
                                },
                                hasCheckboxSelection,
                                isAllRowsChecked: this.getIsAllRowChecked(),
                                handleChangeCheckboxHead: this.handleChangeCheckboxHead,
                                handleChangeCheckboxBody: this.handleChangeCheckboxBody,
                                instance_table: this,
                            }}
                        />
                    </div>
                    <div class="col-6">
                        <PwTableDescription 
                            config={{
                                page: this.getPage(),
                                size: this.getNbrPagination(),
                            }}
                        />
                    </div>
                    <div class="col-6">
                        <PwPagination
                            ref="pagination"
                            config={{
                                hasConfig: true,
                                page: this.getPage(),
                                size: this.getNbrPagination(),
                                onChange: (params = {}) => {
                                    var { page, event } = params;
                                    this.changePagination(page);
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
		);
	},
});