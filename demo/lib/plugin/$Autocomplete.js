
ViewLayer.Class.Autocomplete = function () {
	
	var me = this;
	this.controlId = "";
	this.controlHeight = 20;
	this.lastIndex = -1;
	this.keyinValue = "";
	this.currIndex = -1;
	this.currResult = {};
	this.requestURL = "";
	this.isChooseing = false;
	
	this.init = function(clientId, requestURL) {
		this.controlId = clientId;
		this.requestURL = requestURL;
		this.controlHeight = $(clientId).clientHeight;
		
		ViewLayer.addEvent({
            element: $(clientId),
	        type: "click",
	        func: function(){
				if ($("pnl_sgt") != null) {
					if ($("pnl_sgt") != null) {
						$("pnl_sgt").style.display = "";
					} else {
						$("pnl_sgt").style.display = "none";
					}
				}
			}
		});
		
		ViewLayer.addEvent({
            element: $(clientId),
	        type: "blur",
	        func: function(){
				if ($("pnl_sgt") != null && !me.isChooseing) {
					$("pnl_sgt").style.display = "none";
				}
			}
		});
		
		ViewLayer.addEvent({
            element: $(clientId),
	        type: "keyup",
	        func: function(){
				if ($(clientId).value != "") {
					if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13) {
						me.choose();
					} else if (me.keyinValue != $(clientId).value) {
						me.getSuggestResult();
						me.keyinValue = $(clientId).value;
					}
				} else if ($("pnl_sgt") != null) {
					$remove("pnl_sgt");
					me.currIndex = -1;
				}
	        }
        });
	};
	
	this.getSuggestResult = function() {
		
		$("lblDemo").innerHTML = "ajaxing..." + this.requestURL; //for demo
		//TODO Ajax request
		this.currResult = [{value:"Blue"},{value:"Blues"},{value:"Butify"},{value:"Blues"},{value:"Butify"},
						   {value:"Blue"},{value:"Blues"},{value:"Butify"},{value:"Blues"},{value:"Butify"}]; //for demo
		me.show();
		
	};
	
	this.show = function(x) {
		if($("pnl_sgt") != null) {
			$remove("pnl_sgt");
		}
		
		var sug = document.createElement("ul");
		sug.setAttribute("id", "pnl_sgt");
		sug.className = "suggest";
		sug.style.top = (ViewLayer.getPosTop($(this.controlId)) + this.controlHeight) + "px";
		sug.style.left = ViewLayer.getPosLeft($(this.controlId)) + "px";
		sug.style.width = $(this.controlId).clientWidth + "px";
				
		for(var i=0; i<this.currResult.length; i++) {
			var itemli = document.createElement("li");
			itemli.innerHTML = this.currResult[i].value;
			itemli.setAttribute("id", "sgt_item_" + i);
			
			ViewLayer.addEvent({
				element: itemli,
				type: "mouseover",
				func: function(){
					me.isChooseing = true;
					me.currIndex = parseInt(event.srcElement.id.replace("sgt_item_",""));
					if (me.lastIndex >= 0) {
						$("sgt_item_" + me.lastIndex).className = "";
					}
					$("sgt_item_" + me.currIndex).className = "curr";
					me.lastIndex = me.currIndex;
				}
			});
			
			ViewLayer.addEvent({
				element: itemli,
				type: "mouseout",
				func: function(){
					me.isChooseing = false;
				}
			});
			
			ViewLayer.addEvent({
				element: itemli,
				type: "click",
				func: function(){
					me.currIndex = parseInt(event.srcElement.id.replace("sgt_item_",""));
					if (me.currIndex >= 0) {
						$(me.controlId).value = me.currResult[me.currIndex].value;
					}
					$("pnl_sgt").style.display = "none";
					me.isChooseing = false;
				}
			});
			
			sug.appendChild(itemli);
		}
		
		$parent(this.controlId).appendChild(sug);
		
		this.currIndex = -1;
	};
	
	this.choose = function() {
		if (event.keyCode == 38 && this.currIndex >= 0) {
			this.currIndex--;
		}
		if (event.keyCode == 40 && this.currIndex < this.currResult.length-1) {
			this.currIndex++;
		}
		if (event.keyCode == 13) {
			$("pnl_sgt").style.display = "none";
			return;
		}
		
		if (this.lastIndex >= 0) {
			$("sgt_item_" + this.lastIndex).className = "";
		}
		if (this.currIndex >= 0) {
			$("sgt_item_" + this.currIndex).className = "curr";
			$(this.controlId).value = this.currResult[this.currIndex].value;
		} else {
			$(this.controlId).value = this.keyinValue;
		}
		
		this.lastIndex = this.currIndex;
	}
}