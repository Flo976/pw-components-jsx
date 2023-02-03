import { C } from "../../vue/helper/V02Component";
import styles from "./PwPagination.scss?module";
import classNames from "classnames";
import { getData } from "pw-components-core-dev";

export default C.make({
	determinePagination(i, n, d) {
        var r = [];
        var go = 1;
        if (n <= d) {
            // Show any pages
            for (var k = 1; k <= n; k++) {
                r.push(k);
            }
        } else if (i <= d / 2 + 2) {
            // Show first pages then dots then end
            for (var k = 1; k <= d; k++) {
                r.push(k);
            }
            go = k + Math.floor(d / 2);
            go = go > n ? n : go;
            r.push({ go });
            r.push(n);
        } else if (i > d / 2 + 2 && i < n - d / 2 - 1) {
            // Show first page then dots then middles the dotd then end
            var k0 = i - Math.floor(d / 2);
            r.push(1);
            go = k0 - Math.floor(d / 2);
            go = go <= 0 ? 1 : go;
            r.push({ go });
            for (var k = k0; k < i + d / 2; k++) {
                r.push(k);
            }
            go = k + Math.floor(d / 2);
            go = go > n ? n : go;
            r.push({ go });
            r.push(n);
        } else {
            // Show first page then dots then ends
            var k0 = n - d;
            r.push(1);
            go = k0 - Math.floor(d / 2);
            go = go <= 0 ? 1 : go;
            r.push({ go });
            for (var k = n - d + 1; k <= n; k++) {
                r.push(k);
            }
        }
        return r;
    },
	getData() {
		var data = getData(this);
		var { 
			size = 1,
			page = 1,
			hasConfig = false
		} = this.$config;
		var { 
			size: datasize = size,
			page: datapage = page
		} = data;

		if (hasConfig) {
			data.size = size;
			data.page = page;
		} else {
			data.size = datasize;
			data.page = datapage;
		}
		return getData(this);
	},
	getPage() {
		return this.getData().page;
	},
	getSize() {
		return this.getData().size;
	},
	setSize(size) {
		var data = this.getData();
		data.size = size;
	},
	setPage(page) {
		var data = this.getData();
		data.page = page;
	},
	couldNext() {

		var { size, page } =  this.getData();

        if (page >= size) {
            return false;
        }
        return true;
    },
    couldPrev() {

		var { page = 1 } = this.getData();

        if (page <= 1) {
            return false;
        }
        return true;
    },
	prev(event) {

		if(!this.couldPrev()){
			return true;
		}
		var {
			preChange = () => {},
			onChange = () => {},
		} = this.$config;
		
		var { page } = this.getData();

		var i = page - 1;
		this.setPage(i);
		this.refresh();
		
		var { currentTarget: target } = event;
		var data = { event, page:i, target };
		var status = preChange(data);
		if (status === false) {
			return true;
		}
		onChange(data);
	},
	prevIcon() {
		var {
			params = {},
		} = this.$config;

		var {
			contentPrev = (
				<span>Précédent</span>
			)
		} = params;
		
		return (
			<li
				class={classNames(
					"paginate_button page-item previous",
					this.couldPrev() ? "" : "disabled"
				)}
				onClick={this.prev}
			>
				<a class="page-link" href="#">
					{contentPrev}
				</a>
			</li>
		);
	},
	next(event) {
		
		if(!this.couldNext()){
			return true;
		}
		var {
			preChange = () => {},
			onChange = () => {},
		} = this.$config;

		var { page } = this.getData();

		var i = page + 1;
		this.setPage(i);
		this.refresh();
		
		var { currentTarget: target } = event;
		var data = { event, page:i, target };
		var status = preChange(data);
		if (status === false) {
			return true;
		}
		onChange(data);
	},
	nextIcon() {
		var {
			params = {},
		} = this.$config;

		var {
			contentNext = (
				<span>Suivant</span>
			)
		} = params;

		return (
			<li
				class={classNames(
					"paginate_button page-item next",
					this.couldNext() ? "" : "disabled"
				)}
				onClick={this.next}
			>
				<a class="page-link" href="#">
					{contentNext}
				</a>
			</li>
		);
	},
	$render() {
		var {
			preChange = () => {},
			onChange = () => {},
			params = {}
		} = this.$config;

		var { paginationSize = 5 } = params;
		
		var { 
			size = 1, 
			page:activePage = 1
		} = this.getData();

		var lis = () => {
			
			var result = [];
			var prevIcon = this.prevIcon();
			result.push(prevIcon);

			var paginations = this.determinePagination(
				activePage,
				size,
				paginationSize
			);
	
			paginations.map((page) => {
				var change = (event) => {

					if (typeof page == "object") {
						page = page.go;
					}
					var { currentTarget: target } = event;
					var data = { event, page, target };
					var status = preChange(data);
					if (status === false) {
						return true;
					}
					this.setPage(page);

					this.refresh();
					onChange(data);
				};
				var active = () => {
					if (page == activePage) {
						return "active";
					}
					return "";
				};

				if (typeof page == "object") {
					result.push(
						<li
							class="paginate_button page-item"
							onClick={change}
						>
							<a class="page-link" href="#">
								...
							</a>
						</li>
					);
				} else {
					result.push(
						<li
							class={classNames("page-item", active())}
							onClick={change}
						>
							<a class="page-link" href="#">
								{page}
							</a>
						</li>
					);
				}
			});

			var nextIcon = this.nextIcon();
			result.push(nextIcon);
			return result;
		}

		if( size <= 1 ){
			return (<div></div>);
		}

		return (
			<nav aria-label="...">
				<ul class="pagination">{lis()}</ul>
			</nav>
		);
	},
});
