import classNames from "classnames";
import Style from "./Accordion.scss?module";

class Accordion {
	static saveFunctions(accordion = {}, functions = {}){
		if(accordion.functions && !accordion.savedFunc){
			accordion.savedFunc = true;
			accordion.functions = {
				...accordion.functions,
				...functions
			}
		}
	};

    static getMethods() {
		return {
			drawAccordion(accordion = {}){
				var {
					id,
					key,
					cards = [],
					functions = {},
				} = accordion;

				var {
					renderHead,
					renderContent,
					renderCard,
					render,
				} = functions;

				if(!cards || !cards.length){
					return null;
				}

				if(!renderHead || (typeof renderHead != "function")){
					renderHead = (params = {}) => {
						var {
							card = {}, 
							card_index, 
							accordion_id,
							head_id, 
							content_id
						} = params;
	
						var {
							head: {
								text = "",
								render: renderLocal,
							}
						} = card;
	
						if(!renderLocal || (typeof renderLocal != "function")){
							renderLocal = () => {
								return text;
							}
						}
	
						return (
							<div class="card-header" id={head_id}>
								<a href="#" class="card-toggle no-drag btn btn-link" data-toggle="collapse" data-target={`#${content_id}`} aria-controls={content_id}>
									{renderLocal()}
								</a>
							</div>
						)
					}
				}

				if(!renderContent || (typeof renderContent != "function")){
					renderContent = (params = {}) => {
						var {
							card = {}, 
							card_index, 
							accordion_id,
							head_id, 
							content_id
						} = params;
	
						var {
							content: {
								text = "",
								render: renderLocal,
							}
						} = card;
	
						if(!renderLocal || (typeof renderLocal != "function")){
							renderLocal = () => {
								return text;
							}
						}
						
						return (
							<div id={content_id} class="collapse" aria-labelledby={`#${head_id}`} data-parent={`#${accordion_id}`}>
								<div class="card-body no-drag">
									{renderLocal()}
								</div>
							</div>
						)
					}
				}

				if(!renderCard || (typeof renderCard != "function")){
					renderCard = (params={}) => {
						var {card = {}, card_index, accordion_id} = params
						var {head = {}, content = {}} = card;
	
						var card_key = card.key;

						var head_id = head.id;
						var content_id = content.id;

						if(!card_key){
							card_key = `card-${card_index}`
						}
	
						if(!head_id){
							head_id = `heading-${card_index}`;
						}
	
						if(!content_id){
							content_id = `collapse-${card_index}`;
						}
	
						params = {
							card,
							card_index,
							accordion_id,
							head_id,
							content_id
						}
	
						return (
							<div class="card" key={card_key} data-index={card_index}>
								{renderHead(params)}
								{renderContent(params)}
							</div>
						)
					}
				}

				if(!render || (typeof render != "function")){
					render = (params = {}) => {
						var {
							cards = [],
							accordion_id, 
							accordion_key, 
						} = params

						if(!accordion_id || !accordion_id.length){
							accordion_id = `accordion-${Date.now()}`;
						}

						if(!accordion_key || !accordion_key.length){
							accordion_key = `accordion-${Date.now()}`;
						}
	
						var cards = cards.map((card, i) => {
							params = {
								card, 
								card_index: i, 
								accordion_id
							}
	
							return renderCard(params);
						})
	
						return (
							<div id={accordion_id} key={accordion_key}>
								{cards}
							</div>
						)
					}
				}

				Accordion.saveFunctions(accordion, {
					renderHead,
					renderContent,
					renderCard,
					render,
				})

				return render({
					cards,
					accordion_id: id, 
					accordion_key: key, 
				});
			}
		}
    }
}

export default Accordion;
