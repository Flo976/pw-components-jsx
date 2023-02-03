import classNames from "classnames";
import Style from "./Accordion.scss?module";

class Accordion {
    static getMethods() {
		return {
			drawAccordion(accordion = {}){
				var {
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
								<a href="#" class="btn btn-link" data-toggle="collapse" data-target={`#${content_id}`} aria-expanded="true" aria-controls={content_id}>
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
								<div class="card-body">
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
	
						var head_id = head.id;
						var content_id = content.id;
	
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
							<div class="card">
								{renderHead(params)}
								{renderContent(params)}
							</div>
						)
					}
				}

				if(!render || (typeof render != "function")){
					render = (params = {}) => {
						var {cards = []} = params
	
						var accordion_id = `accordion-${Date.now()}`;
	
						var cards = cards.map((card, i) => {
							params = {
								card, 
								card_index: i, 
								accordion_id
							}
	
							return renderCard(params);
						})
	
						return (
							<div id={accordion_id}>
								{cards}
							</div>
						)
					}
				}

				return render({cards});
			}
		}
    }
}

export default Accordion;
