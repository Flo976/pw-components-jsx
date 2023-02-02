class DatatableObject {
	ready = false;
	head = {};
	body = {};
	render;
	pagination = 10;
	activePage = 1;
	filters;
	key = "";
	orderBy;
	order;
	url;
	isLoading;
	load() {
		var queryParams = {
			key: this.key,
			filters: this.filters,
			order_by: this.orderBy,
			order: this.order,
			page: this.activePage,
			limit: this.pagination,
		};
		var { url } = this;
		var data = new FormData();
		Object.keys(queryParams).map((key) => {
			var value = queryParams[key];
			if (value) {
				data.append(key, value);
			}
		});
		this.isLoading = true;
		this.instance.refresh();

		var ajax = (this.ajax = $.ajax({
			method: "POST",
			url: url,
			data: data,
			processData: false,
			contentType: false,
		}));

		ajax.always((response) => {
			if (response && response.status && response.status == 200) {
				this.body.data = response.datas;
				this.body.total = response.totalFiltered;
			} else {
				this.body.data = [];
			}
			this.isLoading = false;
			this.instance.refresh();
		});
	}
	action = {
		goToPage: (page) => {
			if (page > 0) {
				this.activePage = page;
				this.load();
			}
		},
	};
}

export default DatatableObject;
