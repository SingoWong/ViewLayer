
ViewLayer.Class.MsgBox = function () {
	var _me_ = this;
	this.timeout = 3000;
	this.speed = 20;
	this.width = 200;
	this.height = 100;
	this.title = "";
	this.content = "";
	
	this.init = function() {
		var msgObj = document.createElement("div");
		msgObj.setAttribute("id","msgObj");
		msgObj.style.bottom = (0-this.height)+"px";
		msgObj.style.position = "absolute";
		msgObj.style.width = this.width+"px";
		msgObj.style.height = this.height+"px";
		msgObj.style.right = "18px";
		msgObj.style.zIndex = 2;
		msgObj.style.background = "url("+ViewLayer.Path+"@MsgBox/bg.jpg) bottom";
		
		var msgTitleObj = document.createElement("div");
		msgTitleObj.setAttribute("id","msgTitleObj");
		msgTitleObj.style.height = "20px";
		msgTitleObj.style.borderBottom = "1px solid #769CDA";
		var msgTitle_right = document.createElement("div");
		msgTitle_right.style.width = "3px";
		msgTitle_right.style.height = "3px";
		ViewLayer.getBrowser() == "msie" ? msgTitle_right.style.styleFloat = "right" : msgTitle_right.style.cssFloat = "right";
		msgTitle_right.style.background = "url("+ViewLayer.Path+"@MsgBox/tr.jpg) no-repeat";
		var msgTitle_left = document.createElement("div");
		msgTitle_left.style.width = "3px";
		msgTitle_left.style.height = "3px";
		ViewLayer.getBrowser() == "msie" ? msgTitle_left.style.styleFloat = "left" : msgTitle_left.style.cssFloat = "left";
		msgTitle_left.style.background = "url("+ViewLayer.Path+"@MsgBox/tl.jpg) no-repeat";
		var msgClose_ui = document.createElement("div");
		msgClose_ui.style.width = "12px";
		msgClose_ui.style.height = "12px";
		ViewLayer.getBrowser() == "msie" ? msgClose_ui.style.styleFloat = "right" : msgClose_ui.style.cssFloat = "right";
		msgClose_ui.style.cursor = "pointer";
		msgClose_ui.style.margin  = "5px 2px 2px 2px";
		msgClose_ui.style.background = "url("+ViewLayer.Path+"@MsgBox/btnc.jpg) no-repeat";
		ViewLayer.addListener(msgClose_ui,"mouseover",function(){
			msgClose_ui.style.background = "url("+ViewLayer.Path+"@MsgBox/btnc_on.jpg) no-repeat";
		});
		ViewLayer.addListener(msgClose_ui,"mouseout",function(){
			msgClose_ui.style.background = "url("+ViewLayer.Path+"@MsgBox/btnc.jpg) no-repeat";
		});
		ViewLayer.addListener(msgClose_ui,"click",function(){
			_me_.hiddenMsg();
		});
		var msgTopic = document.createElement("div");
		msgTopic.setAttribute("id","msgTopic");
		msgTopic.style.paddingTop = "3px";
		msgTopic.style.paddingLeft = "3px";
		msgTopic.style.height = "17px";
		msgTopic.style.lineHeight = "17px";
		ViewLayer.getBrowser() == "msie" ? msgTopic.style.styleFloat = "left" : msgTopic.style.cssFloat = "left";
		var msgContent = document.createElement("div");
		msgContent.setAttribute("id","msgContent");
		msgContent.style.clear = "both";
		msgContent.style.padding = "20px 10px 10px 10px";
		msgTitleObj.appendChild(msgTitle_right);
		msgTitleObj.appendChild(msgClose_ui);
		msgTitleObj.appendChild(msgTitle_left);
		msgTitleObj.appendChild(msgTopic);
		msgObj.appendChild(msgTitleObj);
		msgObj.appendChild(msgContent);
		document.body.appendChild(msgObj);
		
		$("msgTopic").innerHTML = this.title;
		$("msgContent").innerHTML = this.content;
		
		var values = {
			bottom   : 0+"px",
			speed    : _me_.speed,
			callback : function() {
				setTimeout(function(){_me_.hiddenMsg();},_me_.timeout);
			}
		};
		new ViewLayer.Class.Slide("msgObj").Move(values);
	}
	
	this.hiddenMsg = function() {
		var values = {
			bottom   : (0-_me_.height)+"px",
			speed    : _me_.speed,
			callback : function() {
				$remove("msgObj");
			}
		};
		new ViewLayer.Class.Slide("msgObj").Move(values);
	}
	
	this.setStyle = function(width,height,speed,timeout) {
		(!isNaN(width)) ? this.width = width : this.width = this.width;
		(!isNaN(height)) ? this.height = height : this.height = this.height;
		(!isNaN(speed)) ? this.speed = speed : this.speed = this.speed;
		(!isNaN(timeout)) ? this.timeout = timeout : this.timeout = this.timeout;
	}
	
	this.setMessage = function(title,content) {
		(title&&title!="") ? this.title = title : this.title = this.title;
		(content&&content!="") ? this.content = content : this.content = this.content;
	}
	
	this.creat = function() {
		this.init();
	}
}