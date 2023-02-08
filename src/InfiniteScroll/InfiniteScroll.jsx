import classNames from "classnames";
import Style from "./InfiniteScroll.scss?module";

class InfiniteScroll {
    static getMethods() {
        return {
            drawInfiniteScroll(infinitescroll) {
                if (!infinitescroll.ready) {
                    infinitescroll.ready = true
                    infinitescroll.InitScroll()
                    infinitescroll.load()
                }
                var { 
                    already_max = false, 
                    emptyText, 
                    textFullResult,
                } = infinitescroll;

                if (!textFullResult || (typeof textFullResult != "function")) {
                    textFullResult = () => {
                        return (
                            <div
                                class="textFullResult"
                            >
                                {textFullResult}
                            </div>
                        )
                    }

                }
                if (!emptyText || (typeof emptyText != "function")) {
                    emptyText = () => {
                        return (
                            <div
                                class="emptyText"
                            >
                                {emptyText}
                            </div>
                        )
                    }

                }

                var content = () => {
                    var { 
                        content = {}, 
                        fieldsScroll,
                    } = infinitescroll;
                    var { data = [] } = content;

                    if (!fieldsScroll || (typeof fieldsScroll != "function")) {
                        fieldsScroll = (line={}) => {
                            var {id=""} = line;
                             var text = `Fields non défini ${id}`;
                            return (
                                <div
                                    class="fields"
                                >
                                    {text}
                                </div>
                            )
                        }

                    }

                    if ((!data || data.length == 0) && !infinitescroll.isLoading) {
                        return emptyText()
                    }

                    return data.map((line = {}) => {
                        return fieldsScroll(line);
                    });
                };

                var textMaxScroll = () => {
                    if (already_max) {
                        return textFullResult()
                    }
                    return null;
                }

                var render = ({ Style, content, textMaxScroll }) => {
                    return (
                        <div class={classNames(Style.container, "content")}>
                            {content()}
                        </div>
                    );
                };
                if (infinitescroll && typeof infinitescroll.render == "function") {
                    render = infinitescroll.render;
                }
                return render({ Style, content, textMaxScroll })
            },
        };
    }
}

export default InfiniteScroll;