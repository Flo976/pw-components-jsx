import classNames from "classnames";

class Tabs {
	static saveFunctions(tabs = {}, functions = {}){
		if(tabs.functions && !tabs.savedFunc){
			tabs.savedFunc = true;
			tabs.functions = {
				...tabs.functions,
				...functions
			}
		}
	};

    static getMethods() {
		return {

            renderHeads(tabs){
                var {
					cards = [],
                    functions = {},
                    type = ""
				} = tabs;

                var {
					renderHeads,
				} = functions;

                var drawHeader = () => {
                    return cards.map((card, i) => {
						var {head = {}, content = {}, tabs_id = null} = card;
	
						var head_id = head.id;
                        var { id:content_id=null } = content;
                        var card_index = i;
                         
                        if(!tabs_id || !tabs_id.length){
							tabs_id = `tabs-${Date.now()}`;
						}

						if(!head_id){
							head_id = `heading-${card_index}`;
						}
	
						if(!content_id){
							content_id = `collapse-${card_index}`;
						}

                        var {
							head: {
								text = "",
								render: renderLocal,
                                SELECTED = false
							}
						} = card;

                        var isActive = "";
                        if(SELECTED == true){
                            isActive = "active";
                        }

                        if(typeof renderLocal != "function"){

                            return (
                                <li class="nav-item">
                                    <a class={classNames("nav-link", isActive)} id={head_id} data-toggle="tab" href={`#${content_id}`} role="tab" aria-controls={content_id} aria-selected={SELECTED}>{text}</a>
                                </li>
                            )
                        }
                        else{
                            return (
                                <li class="nav-item">
                                    <a class={classNames("nav-link", isActive)} id={head_id} data-toggle="tab" href={`#${id}`} role="tab" aria-controls={content_id} aria-selected={SELECTED}>{renderLocal()}</a>
                                </li>
                            )
                        }
                    })
                }

                var navClass = "";
                if(type && type == "column"){
                    navClass = "flex-column";
                }

                if(!renderHeads || typeof(renderHeads) != "function"){
                    renderHeads = (tabs) => {
                        return(
                            <ul class={classNames("nav nav-tabs", navClass)} role="tablist">
                                {drawHeader()}
                            </ul>
                        );
                    }
                }

                return <div>{renderHeads(tabs)}</div>
            },

            renderContents(tabs) {
                var {
					cards = [],
                    functions = {},
				} = tabs;

                var {
					renderContents,
				} = functions;

                var drawContent = (cards) => {
                    return cards.map((card, i) => {

                        var {head = {}, content = {}, type = "", tabs_id = null} = card;

						var head_id = head.id;
                        var card_index = i;
                        var { id:content_id=null } = content;

                        if(!head_id){
							head_id = `heading-${card_index}`;
						}

                        if(!content_id){
							content_id = `collapse-${card_index}`;
						}

                        var {
                            content: {
                                text = "",
                                render: renderLocal,
                            },
                            head: {
                                SELECTED = false
                            }
                        } = card;
                    
                        if(!renderLocal || (typeof renderLocal != "function")){
                            renderLocal = () => {
                                return text;
                            }
                        }
                    
                        var isActive = "";
                        if(SELECTED == true){
                            isActive = "show active";
                        }
                    
                        return (
                            <div class={classNames("tab-pane fade", isActive)} id={content_id} role="tabpanel" aria-labelledby={`#${head_id}`}>{renderLocal()}</div>
                        )
                    })
                }

                if(!renderContents || typeof(renderContents) != "function"){
                    renderContents = (tabs) => {
                        return(
        
                            <div class="tab-content">
                                {drawContent(cards)}
                            </div>
                        )
                    }
                }

                return <div>{renderContents(tabs)}</div>
            },

			drawTabs(tabs = {}){
				var {
					id,
					cards = [],
					functions = {},
				} = tabs;

				var {
					renderHead,
					renderContent,
					renderCard,
					render,
				} = functions;

				if(!cards || !cards.length){
					return null;
				}
                
				if(!render || (typeof render != "function")){
					render = (params = {}) => {
						var {tabs_id, cards = []} = params

						if(!tabs_id || !tabs_id.length){
							tabs_id = `tabs-${Date.now()}`;
						}
	
						return (
							<div id={tabs_id}>
                                {this.renderHeads(tabs)}
                                {this.renderContents(tabs)}
							</div>
						)
					}
				}

				Tabs.saveFunctions(tabs, {
					renderHeads,
					renderContents,
				})

				return render({tabs_id: id, cards});
			}
		}
    }
}

export default Tabs;