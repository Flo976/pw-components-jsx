class DragAndDropObject {
    parentSelector = "";
    itemsSelector = "";

    listeners = {
        // clique/focus sur un element
        onDragStart: ({event, srcElt}) => {},

        // lacher l'element
        onDragEnd: ({event, srcElt}) => {},

        // release dragged element
        onDragOver: ({event, srcElt}) => {},
        
        // l'element entre en contact avec un autre
        onDragEnter: ({event, srcElt, destElt}) => {},

        // l'element quite le contact avec un autre
        onDragLeave: ({event, srcElt, destElt}) => {},

        // l'element est poser sur un autre
        onDrop: ({event, srcElt, destElt}) => {},
    }

    $helper = null;

    constructor(){
        this.$helper = new DragAndDropHelper();
        this.$helper.setup(this);
    }

    init(){
        this.$helper.init();
    }
}

class DragAndDropHelper {
    $items = [];
    $dragSrcEl = null;
    $dragAndDrop = null;

    setup(dragAndDrop){
        this.$dragAndDrop = dragAndDrop;
    }

    init(){
        var {
            parentSelector = "",
            itemsSelector = "",
        } = this.$dragAndDrop

        this.$items = document.querySelectorAll(`${parentSelector} ${itemsSelector}`);
        this.$items.forEach((item) => {
            item.addEventListener("dragstart", this.$handleDragStart());
            item.addEventListener("dragover", this.$handleDragOver());
            item.addEventListener("dragenter", this.$handleDragEnter());
            item.addEventListener("dragleave", this.$handleDragLeave());
            item.addEventListener("dragend", this.$handleDragEnd());
            item.addEventListener("drop", this.$handleDrop());
            item.setAttribute("draggable", true);
        });
    }

    getElement(event){
        var {
            itemsSelector = "",
        } = this.$dragAndDrop

        if(!event.target){
            return null;
        }

        var elt = event.target.closest(itemsSelector);

        if(!elt){
            elt = event.target.querySelector(itemsSelector);
        }

        return elt;
    }

    getListener(name){
        var {
            listeners = {}
        } = this.$dragAndDrop;

        if(listeners[name] && (typeof listeners[name] == "function")){
            return listeners[name];
        }

        return function(){}
    }

    $handleDragStart(){
        return (e) => {
            var elt = this.getElement(e);

            if(elt != e.target){
                return false;
            }

            elt.style.opacity = "0.4";

            this.$dragSrcEl = elt;

            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/html", elt.innerHTML);

            var params = {
                event: e,
                srcElt: this.$dragSrcEl,
            };

            this.getListener("onDragStart")(params);
        }
    }

    $handleDragEnd(){
        return (e) => {
            var elt = this.getElement(e);
            elt.style.opacity = "1";

            this.$items.forEach(function (item){
                item.classList.remove("over");
            });

            var params = {
                event: e,
                srcElt: this.$dragSrcEl,
            };

            this.getListener("onDragEnd")(params);
        }
    }

    $handleDragOver(){
        return (e) => {
            e.preventDefault();

            var params = {
                event: e,
                srcElt: this.$dragSrcEl,
            };

            this.getListener("onDragOver")(params);

            return false;
        }
    }

    $handleDragEnter(){
        return (e) => {
            var elt = this.getElement(e);
            elt.classList.add("over");

            var params = {
                event: e,
                srcElt: this.$dragSrcEl,
                destElt: elt,
            };

            this.getListener("onDragEnter")(params);
        }
    }

    $handleDragLeave(){
        return (e) => {
            var elt = this.getElement(e);
            elt.classList.remove("over");

            var params = {
                event: e,
                srcElt: this.$dragSrcEl,
                destElt: elt,
            };

            this.getListener("onDragLeave")(params);
        }
    }

    $handleDrop(){
        return (e) => {
            e.stopPropagation();

            if(!this.$dragSrcEl){
                return false;
            }

            var elt = this.getElement(e);

            if(this.$dragSrcEl !== elt){
                this.$dragSrcEl.innerHTML = elt.innerHTML;
                elt.innerHTML = e.dataTransfer.getData("text/html");
            }

            var params = {
                event: e,
                srcElt: this.$dragSrcEl,
                destElt: elt,
            };

            this.getListener("onDrop")(params);

            return false;
        }
    }
}

export default DragAndDropObject;
