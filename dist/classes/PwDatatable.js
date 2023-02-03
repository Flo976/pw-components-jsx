"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PwDatatable = void 0;
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.array.push.js");
var _pwComponentsCoreDev = require("pw-components-core-dev");
class PwDatatable {
  static getMethodsJsx() {
    return {
      getData() {
        var data = (0, _pwComponentsCoreDev.getData)(this);
        var {
          url = "",
          limit = 20,
          page = 1,
          orderBy = "created_at",
          order = "DESC"
        } = this.$config;
        var {
          queryParams = {
            key: "",
            order_by: orderBy,
            order: order,
            page: page,
            limit: limit
          },
          url = url,
          rowChecked = false,
          allRowChecked = false,
          rowsChecked = [],
          datas = [],
          page = 1,
          total = 0,
          totalFiltered = 0,
          nbrPagination = 0,
          loading = false
        } = data;
        data.queryParams = queryParams;
        data.url = url;
        data.rowChecked = rowChecked;
        data.allRowChecked = allRowChecked;
        data.rowsChecked = rowsChecked;
        data.datas = datas;
        data.page = page;
        data.total = total;
        data.totalFiltered = totalFiltered;
        data.nbrPagination = nbrPagination;
        data.loading = loading;
        return (0, _pwComponentsCoreDev.getData)(this);
      },
      setPage(page) {
        var data = this.getData();
        var {
          queryParams = {}
        } = data;
        queryParams.page = page;
        data.page = page;
        data.queryParams = queryParams;
      },
      getPage() {
        var data = this.getData();
        return data.page;
      },
      setOrderBy(order_by) {
        var data = this.getData();
        var {
          queryParams = {}
        } = data;
        queryParams.order_by = order_by;
        data.queryParams = queryParams;
      },
      getOrderBy() {
        var data = this.getData();
        var {
          queryParams = {}
        } = data;
        return queryParams.order_by;
      },
      setOrder(order) {
        var data = this.getData();
        var {
          queryParams = {}
        } = data;
        queryParams.order = order;
        data.queryParams = queryParams;
      },
      getOrder() {
        var data = this.getData();
        var {
          queryParams = {}
        } = data;
        return queryParams.order;
      },
      setKey(key) {
        var data = this.getData();
        var {
          queryParams = {}
        } = data;
        queryParams.key = key;
        data.queryParams = queryParams;
      },
      getKey() {
        var data = this.getData();
        var {
          queryParams = {}
        } = data;
        return data.queryParams.key;
      },
      setDatas(datas) {
        var data = this.getData();
        data.datas = datas;
        console.log(datas);
      },
      getDatas() {
        var data = this.getData();
        return data.datas;
      },
      setTotal(total) {
        var data = this.getData();
        data.total = total;
      },
      getTotal() {
        var data = this.getData();
        return data.total;
      },
      setTotalFiltered(totalFiltered) {
        var data = this.getData();
        data.totalFiltered = totalFiltered;
      },
      getTotalFiltered() {
        var data = this.getData();
        return data.totalFiltered;
      },
      setNbrPagination(nbrPagination) {
        var data = this.getData();
        data.nbrPagination = nbrPagination;
      },
      getNbrPagination() {
        var data = this.getData();
        return data.nbrPagination;
      },
      setRowChecked(rowChecked) {
        var data = this.getData();
        data.rowChecked = rowChecked;
      },
      getHasRowChecked() {
        var data = this.getData();
        return data.rowChecked;
      },
      setAllRowChecked(allRowChecked) {
        var data = this.getData();
        data.allRowChecked = allRowChecked;
      },
      getIsAllRowChecked() {
        var data = this.getData();
        return data.allRowChecked;
      },
      getRowsChecked() {
        var data = this.getData();
        return data.rowsChecked;
      },
      getLoading() {
        var data = this.getData();
        return data.loading;
      },
      hideLoading() {
        var data = this.getData();
        data.loading = false;
        this.refresh();
      },
      showLoading() {
        var data = this.getData();
        data.loading = true;
        this.refresh();
      },
      activeTooltip() {
        $('[data-toggle="tooltip"]').tooltip("dispose");
        $('[data-toggle="tooltip"]').tooltip();
      },
      loadTable() {
        var callback = data_api => {
          var {
            queryParams = {}
          } = this.getData();
          var {
            order_by,
            order,
            page,
            limit
          } = queryParams;
          if (data_api.datas.length == 0 && page > 1) {
            this.setPage(page - 1);
            this.loadTable();
          }
          this.setDatas(data_api.datas);
          this.setTotal(parseInt(data_api.total));
          this.setTotalFiltered(parseInt(data_api.totalFiltered));
          this.setPage(parseInt(data_api.page));
          this.setRowChecked(false);
          this.setAllRowChecked(false);
          this.setNbrPagination(this.countNbrPagination(data_api));
        };
        this.getDataApi(callback);
      },
      load() {
        this.loadTable();
      },
      reload() {
        this.loadTable();
      },
      getDataApi(callback) {
        if (!callback) {
          callback = function callback() {};
        }
        var result = {};
        var {
          queryParams = {},
          url
        } = this.getData();
        var data = new FormData();
        Object.keys(queryParams).map(key => {
          var value = queryParams[key];
          if (value) {
            data.append(key, value);
          }
        });
        this.showLoading();
        if (this.ajax) {
          this.ajax.abort();
        }
        this.ajax = $.ajax({
          method: "POST",
          url: url,
          data: data,
          processData: false,
          contentType: false
        });
        this.ajax.always(response => {
          if (response && response.status && response.status == 200) {
            callback(response);
            this.hideLoading();
            setTimeout(this.activeTooltip, 1500);
          } else {
            result = {};
          }
        });
      },
      countNbrPagination(data) {
        var result = 0;
        if (data.totalFiltered && parseInt(data.totalFiltered) != 0 && parseInt(data.limit)) {
          result = Math.ceil(parseInt(data.totalFiltered) / parseInt(data.limit));
        }
        return result;
      },
      handleChangeSearch(event) {
        var input_search = $(event.currentTarget);
        this.setKey($(input_search).val());
        this.setPage(1);
        this.loadTable();
      },
      changeSearch(key) {
        this.setKey(key);
        this.setPage(1);
        this.loadTable();
      },
      handleChangePagination(page) {
        return event => {
          this.setPage(page);
          this.loadTable();
        };
      },
      changePagination(page) {
        this.setPage(page);
        this.loadTable();
      },
      handleChangeOrder(order_key) {
        return event => {
          var data = this.getData();
          var {
            queryParams = {}
          } = data;
          var {
            order: old_order = "DESC",
            order_by = "created_at"
          } = queryParams;
          var order = "ASC";
          if (order_by == order_key) {
            order = old_order == "ASC" ? "DESC" : "ASC";
          }
          this.setOrderBy(order_key);
          this.setOrder(order);
          this.refresh();
          this.loadTable();
        };
      },
      handleChangeCheckboxHead(event) {
        this.getData().rowsChecked = []; // reset rowschecked

        var elt = $(event.currentTarget);
        this.setAllRowChecked($(elt).prop("checked"));
        if ($(elt).prop("checked")) {
          this.getDatas().map(line => {
            line.checked = true;
            this.getData().rowsChecked.push(line); // maj rowsChecked
          });

          this.setRowChecked(true);
        } else {
          this.getDatas().map(line => {
            line.checked = false;
          });
          this.getData().rowsChecked = []; // reset rowschecked
          this.setRowChecked(false);
        }
        this.refresh();
      },
      handleChangeCheckboxBody(index) {
        return event => {
          this.getData().rowsChecked = []; // reset rowschecked

          var elt = $(event.currentTarget);
          if ($(elt).prop("checked")) {
            this.getDatas()[index].checked = true;
          } else {
            this.getDatas()[index].checked = false;
          }
          var anydataChecked = false;
          var anydataUnChecked = false;
          this.getDatas().map(line => {
            if (line.checked) {
              anydataChecked = true;
              this.getData().rowsChecked.push(line); // maj rowsChecked
            } else {
              anydataUnChecked = true;
            }
          });
          if (!anydataUnChecked) {
            this.setAllRowChecked(true);
          } else {
            this.setAllRowChecked(false);
          }
          if (anydataChecked) {
            this.setRowChecked(true);
          } else {
            this.setRowChecked(false);
          }
          this.refresh();
        };
      },
      addOrUpdateQueryParamsOf(key, value) {
        var data = this.getData();
        var {
          queryParams = {}
        } = data;
        queryParams[key] = value;
        this.getData().queryParams = queryParams;
      },
      removeQueryParamsOf(key) {
        var data = this.getData();
        var {
          queryParams = {}
        } = data;
        delete queryParams[key];
        this.getData().queryParams = queryParams;
      },
      getQueryParamsOf(key) {
        var data = this.getData();
        var {
          queryParams = {}
        } = data;
        return queryParams[key];
      },
      getQueryParams() {
        var data = this.getData();
        var {
          queryParams = {}
        } = data;
        data.queryParams = queryParams;
        return queryParams;
      }
    };
  }
}
exports.PwDatatable = PwDatatable;