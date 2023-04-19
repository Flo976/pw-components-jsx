import classNames from "classnames";
import Style from "./Datatable.scss?module";

import { determinePagination } from "./determinePagination.js";

class Datatable {
    static getMethods() {
        return {
            pluginReoreder(params = {}) {
            	return (event) =>{
	                var { getText, field, datatable } = params
	                var {
	                    order: old_order = "DESC",
	                    orderBy = "created_at"
	                } = datatable;
	                var { key: order_key } = field

	                var order = "ASC";

	                if (orderBy == order_key) {
	                    order = old_order == "ASC" ? "DESC" : "ASC";
	                }

	                datatable.orderBy = order_key;
	                datatable.order = order;
	                datatable.load()
            	}
            },
            orderable(params = {}) {
                var { getText, field, datatable } = params

		        var sortClass = () =>{
		        	var cls = ""
			        if (datatable.orderBy == field.key) {
			            if (datatable.order == "ASC") {
			                cls = Style.sorting_asc;
			            }
			            if (datatable.order == "DESC") {
			                cls = Style.sorting_desc;
			            }
			        }
			        return cls;
		        }

                return (
                    <th class={classNames(Style.sorting, sortClass())} onClick={this.pluginReoreder(params)}>
						<i>{getText()}</i>
					</th>
                );
            },
            drawTable(datatable) {
                if (!datatable.ready) {
                    datatable.ready = true
                    datatable.load()
                }
                var head = () => {
                    var ths = () => {
                        var { head = {} } = datatable;
                        var { fields = [] } = head;
                        return fields.map((field = {}) => {
                            var getText = () => {
                                var text = "";
                                if (typeof field == "string" || field.tag) {
                                    text = field;
                                } else {
                                    text = field.text;
                                }
                                return text;
                            };
                            var render = ({ field, getText, datatable }) => {
                                return <th>{getText()}</th>;
                            };
                            if (
                                typeof field == "object" &&
                                typeof field.render == "function"
                            ) {
                                render = field.render;
                            }
                            return render({ field, getText, datatable });
                        });
                    };
                    return (
                        <thead>
							<tr>{ths()}</tr>
						</thead>
                    );
                };
                var body = () => {
                    var trs = () => {
                        var { body = {} } = datatable;
                        var { data = [] } = body;
                        return data.map((line = {}) => {
                            var cols = () => {
                                var { head = {} } = datatable;
                                var { fields = [] } = head;

                                var columns = fields.map(
                                    (field = {}, index) => {
                                        var { key } = field;
                                        var col = "";
                                        if (key !== undefined) {
                                            col = line[key];
                                        } else {
                                            col = line[index];
                                        }
                                        var render = ({ col }) => {
                                            return <td>{col}</td>;
                                        };
                                        if (
                                            field &&
                                            typeof field.renderBody ==
                                            "function"
                                        ) {
                                            render = field.renderBody;
                                        }

                                        return render({ field, col, line });
                                    }
                                );
                                return columns;
                            };
                            return <tr>{cols()}</tr>;
                        });
                    };

                    var { body = {} } = datatable;
                    var { data = [] } = body;
                    if (!data || data.length == 0) {
                        return (
                            <tr>
								<td
									class="text-center"
									colspan={datatable.head.fields.length}
								>
									Aucun resultat
								</td>
							</tr>)
                    }
                    return <tbody>{trs()}</tbody>;
                };
                var render = ({ Style, head, body }) => {
                    return (
                        <table class={classNames(Style.table)}>
							{head()}
							{body()}
						</table>
                    );
                };
                if (datatable && typeof datatable.render == "function") {
                    render = datatable.render;
                }
                var pagination = () => {
                    var { pagination, body = {}, activePage = 1 } = datatable;
                    if (!pagination || !body.total) {
                        return null;
                    }
                    
                    var renderPage = ({page, dot, active, onClick, classNames:cls}) => {
                        return (
                            <li
                                class={classNames(cls, dot, active)}
                                onClick={onClick}
                            >
                                <a class="page-link" href="#">
                                    {page}
                                </a>
                            </li>
                        )
                    };
                    var renderButtons = ({prev, next, disabled, onClick, classNames:cls}) => {
                        var text = prev ? "Précédent" : "Suivant";
                        return (
                            <li
								class={classNames(cls, disabled)}
								onClick={onClick}
							>
								<a class="page-link" href="#">
									<span>{text}</span>
								</a>
							</li>
                        )
                    };

                    if (datatable && typeof datatable.renderPage == "function") {
                        renderPage = datatable.renderPage;
                    }

                    if (datatable && typeof datatable.renderButtons == "function") {
                        renderButtons = datatable.renderButtons;
                    }

					var {total} = body;

                    var getNbPage = () => {
                        var nbPage = 0;
                        nbPage = Math.ceil(total / pagination);
                        return nbPage;
                    };
                    if (getNbPage() <= 1) {
                        return null;
                    }

					var paginations = determinePagination(
						activePage,
						getNbPage()
					);

                    var pages = () => {
                        var result = [];
                        paginations.map((page) => {
                            var active = () => {
                                if (page == activePage) {
                                    return "active";
                                }
                                return "";
                            };
                            var change = () => {
                                var pageToGo = page
                                if (typeof pageToGo == "object") {
                                    pageToGo = pageToGo.go;
                                }
                                datatable.action.goToPage(pageToGo)
                            };
                            if (typeof page == "object") {
                                result.push(renderPage({
                                    page: "...", 
                                    active: "", 
                                    onClick: change,
                                    classNames: "page-item paginate_button"
                                }));
                            } else {
                                result.push(renderPage({
                                    page: page, 
                                    active: active(), 
                                    onClick: change,
                                    classNames: "page-item",
                                }));
                            }
                        });
                        return result;
                    };

                    var renderPrev = () => {
                        var could = () => {
                            if (activePage <= 1) {
                                return false;
                            }
                            return true;
                        }
                        var action = () => {
                            if (!could()) {
                                return true;
                            }
                            datatable.action.goToPage(activePage - 1);
                        }
                        return renderButtons({
                            prev: true, 
                            next: false, 
                            disabled: could() ? "" : "disabled", 
                            isDisabled: !could(), 
                            onClick: action, 
                            classNames: "paginate_button page-item prev",
                        });
                    }

                    var renderNext = () => {
                        var could = () => {
                            if (activePage >= getNbPage()) {
                                return false;
                            }
                            return true;
                        }
                        var action = () => {
                            if (!could()) {
                                return true;
                            }
                            datatable.action.goToPage(activePage + 1);
                        }
                        return renderButtons({
                            prev: false, 
                            next: true, 
                            disabled: could() ? "" : "disabled", 
                            isDisabled: !could(), 
                            onClick: action, 
                            classNames: "paginate_button page-item next",
                        });
                    }

                    return (
                        <div class="row">
							<div class="col-6 pagination_recap">
								<div>Affichage de la page {activePage} sur 2</div>
							</div>
							<div class="col-6 pagination_content">
								<nav aria-label="...">
									<ul class="pagination">
										{renderPrev()}
										{pages()}
										{renderNext()}
									</ul>
								</nav>
							</div>
						</div>
                    );
                };
                return (
                    <div>
						{render({ Style, head, body })}
						{pagination()}
					</div>
                );
            },
        };
    }
}

export default Datatable;