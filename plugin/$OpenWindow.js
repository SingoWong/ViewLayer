
ViewLayer.Class.OpenWindow = function (obj) {
	
	this.obj = obj;
	this.tempTop = 0;
	this.tempLeft = 0;
	this.title = "Popup Window Title";
	
	this.openWindow = function(width,height,src) {
	    this.tempTop = document.documentElement.scrollTop + document.body.scrollTop;
        this.tempLeft = document.documentElement.scrollLeft;
        document.documentElement.style.overflow = "hidden";
        
		var mark = document.createElement("div");
		mark.setAttribute("id","window_mark");
		mark.className = "window_mark";
		mark.style.height = (this.tempTop + window.screen.availHeight) +"px";
		document.body.appendChild(mark);
		
		var panel = document.createElement("div");
		panel.setAttribute("id","window_panel");
		panel.className = "window_panel";
		panel.style.top = (this.tempTop + 150) +"px";
		panel.style.left = (document.body.clientWidth-width)/2+"px";
		panel.style.height = height+"px";
		panel.style.width = width+"px";
		var closeUI = document.createElement("div");
		closeUI.setAttribute("id","window_panel_closeui");
		closeUI.className = "window_panel_closeui";
		var frameUI = document.createElement("div");
		frameUI.setAttribute("id","window_panel_frameui");
		var infoUI = document.createElement("div");
		infoUI.setAttribute("id","window_panel_infoui");
		infoUI.className = "window_panel_infoui";
		panel.appendChild(closeUI);
		panel.appendChild(frameUI);
		panel.appendChild(infoUI);
		document.body.appendChild(panel);
		$("window_panel_closeui").style.backgroundImage = "url("+ViewLayer.Path+"plugin/@OpenWindow/bg_title.png)";
		$("window_panel_closeui").innerHTML = "<a href=\"javascript:"+this.obj+".closeWindow();\"><img src=\""+ViewLayer.Path+"plugin/@OpenWindow/close.gif\" art=\"Close\"></a>";
		$("window_panel_closeui").innerHTML += "<div class=\"window_panel_title\" style=\"background-image:url("+ViewLayer.Path+"plugin/@OpenWindow/ico_title.png);\">"+this.title+"</div>";
		$("window_panel_frameui").innerHTML = "<iframe height=\""+(height-25-25)+"\" width=\"100%\" src=\""+src+"\" frameborder=\"0\" scrolling=\"no\"></iframe>";
		$("window_panel_infoui").innerHTML += "<img src=\""+ViewLayer.Path+"plugin/@OpenWindow/loading.gif\" id=\"window_panel_infoui_ico\" art=\"Loading\"/>";
		
		var shadow = document.createElement("div");
		shadow.setAttribute("id","window_shadow");
		shadow.className = "window_shadow";
		if (ViewLayer.getBrowser() == "msie") {
		    shadow.style.top = (this.tempTop + 144) + "px";
		    shadow.style.left = ((document.body.clientWidth-width)/2 - 6) + "px";
		    shadow.style.height = (height + 6) +"px";
		    shadow.style.width = (width + 6) + "px";
		    document.body.appendChild(shadow);
		} else {
		    shadow.style.top = (this.tempTop + 152) + "px";
		    shadow.style.left = ((document.body.clientWidth-width)/2 + 2) + "px";
		    shadow.style.height = height +"px";
		    shadow.style.width = width + "px";
		    document.body.appendChild(shadow);
		}
	}
	
	this.closeWindow = function() {
		$("window_panel").parentNode.removeChild($("window_panel"));
		$("window_mark").parentNode.removeChild($("window_mark"));
    	$("window_shadow").parentNode.removeChild($("window_shadow"));
		document.documentElement.style.overflow = "auto";
		document.documentElement.scrollTop = this.tempTop;
        document.documentElement.scrollLeft = this.tempLeft;
	}
}
