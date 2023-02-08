class InfiniteScrollObject {
	ready = false;
	content = {};
	offset = 0;
	limit;
	already_max = false;
	url;
	isLoading;
	currentscrollHeight=0;
	load() {
		if (this.already_max) {
			return;
		}
		var queryParams = {
			offset: this.offset,
			limit: this.limit,
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
		this.waiting = true;
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
				var datas = response.datas;
	            if(datas && datas.length > 0){
                	this.offset += datas.length;
                	this.content.data.push(...datas);
	            }else {
                	this.already_max = true;
	            }
			} else {
				this.content.data = [];
			}
			this.isLoading = false;
			this.waiting = false;
			this.instance.refresh();
		});
	}
	isScrollVisible(){
        var scrollHeight = $(document).height();
        var scrollPos = Math.floor($(window).height() + $(window).scrollTop());
        var isBottom = scrollHeight - 100 < scrollPos;
        if ($(window).scrollTop() <= 0) {
            return false;
        }
        else if (isBottom && this.currentscrollHeight < scrollHeight) {
            this.currentscrollHeight = scrollHeight;
			this.instance.refresh();
            return true;
        }
        return false;
    }
	InitScroll() {
        $(window).scroll(() => {
            var needLoad = (
                this.isScrollVisible() &&
                !this.waiting
            )

            if(needLoad){
                this.waiting = true;

                this.load(() => {
                    this.waiting = false;
                })
            }
        });
	}
}

export default InfiniteScrollObject;