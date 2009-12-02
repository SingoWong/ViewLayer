/*
Script:
	core.js
	
License:
	Original BSD license
	
ViewLayer Copyright: 
	Copyright (C) 2009 Singo, <singochina@gmail.com>
*/

(function (w) { if(typeof w.ViewLayer == "undefined") {

	/**
	 * Initialize basic object
	 */
	w.ViewLayer = {};
	ViewLayer.Version = "2.0.2";
	ViewLayer.Class = {};
	ViewLayer.Path = (function(){
		var s = document.getElementsByTagName("script");
		return s[s.length-1].getAttribute("src").replace(/(?:core.js).*/,"")
	})();
	ViewLayer.readyBound = false;
	ViewLayer.isExecute = false;
	
	/**
	 * Control DOM manager 
	 * 
	 * Function: $()
	 * Arguments: us - element id
	 * Return: element object
	 * 
	 * Function: $name()
	 * Arguments: us - element name
	 * Return: element(s) object
	 * 
	 * Function: $tag()
	 * Arguments: us - element tag
	 * Return: element(s) object
	 *
	 * Function: $parent()
	 * Arguments: us - element tag
	 * Return: element parent node element object
	 * 
	 * Function: $child()
	 * Arguments: us - element tag
	 * Return: element child node element object
	 *
	 * Function: $remove()
	 * Arguments: us - element tag
	 * Return: remove element object
	 */
	w.$ || (
		w.$ = function (us) {
			return document.getElementById(us);
		}
	);
	w.$name || (
		w.$name = function (us) {
			return document.getElementsByName(us);
		}		
	);
	w.$tag || (
		w.$tag = function (us) {
			return document.getElementsByTagName(us);
		}		
	);
	w.$parent || (
		w.$parent = function (us) {
			if (typeof(us)=="string") us = $(us);
			return us.parentNode;
		}		  
	);
	w.$child || (
		w.$child = function (us) {
			if (typeof(us)=="string") us = $(us);
			var nodes = us.childNodes;
			if(!nodes.length) return [];
			var ret=[];
			for(var i=0;i<nodes.length;i++) {
				if(nodes[i].nodeType!=1) continue;
				ret.push(nodes[i]);
			}
			return ret;
		}		 
	);
	w.$remove || (
		w.$remove = function (us) {
			typeof(us) == "string" ? us = $(us) : us = us;
			return us.parentNode.removeChild(us);
		}	
	);
	
	/**
	 * Control events manager 
	 *
	 * Function: ViewLayer.addEvent()
	 * Arguments: param - {element, type, func, usecapture}
	 * 
	 * Function: ViewLayer.removeEvent()
	 * Arguments: param - {element, type}
	 */
	ViewLayer.addEvent = function (param) {
		if (param.element && param.element.addEventListener){
			param.element.addEventListener(param.type, param.func, param.csecap);
			return true;
		} else if (param.element && param.element.attachEvent){
			var r = param.element.attachEvent("on"+param.type, param.func);
			return r;
		} else {
			window.alert("Handler could not be removed");
		}
	};
	ViewLayer.removeEvent = function (param) {
		if(param.element && param.element.removeEventListener)
			param.element.removeEventListener(param.type,param.func,false);
		else if(param.element.detachEvent){
			param.element.detachEvent("on"+param.type,obj[param.type+param.func]);
			param.element[param.type+param.func]=null;
			param.element["e"+param.type+param.func]=null;
		}
	};
	
	/**
	 * Ajax manager
	 * 
	 * Function: ViewLayer.ajax()
	 * Arguments: param - {url, type(json/xml/text/soap), data{action(GET/POST),sync(true/false),values,method}, timeout, error, success}
	 */
	ViewLayer.ajax = function (param) {
		try {
			if (!param.type) { param.type = "text"; }
			if (!param.data) { param.data = {action : "GET"} };
			if (!param.data.action) { param.data.action = "GET"; }
			if (!param.data.sync) { param.data.sync = true; }
			if (!param.data.values) { param.data.values = null; }
			if (!param.data.method) { param.data.method = null; }
			
			var reqObj = private_ro(param.type);
			
			if (ViewLayer.getBrowser() == "msie") reqObj.onreadystatechange = function () {
				if(reqObj.readyState == 4) private_cb(param.success, param.type, reqObj, param.data.method);
			}
			else reqObj.onload = function () {
				private_cb(param.success, param.type, reqObj, param.data.method);
			}
			
			
			if (param.type == "xml") {
				reqObj.async = param.data.sync;
				reqObj.load(param.url);
				private_sh(param, reqObj);
			} else {
				reqObj.open(param.data.action, param.url, param.data.sync);
				private_sh(param, reqObj);
				reqObj.send(param.data.values);
			}
						
		} catch (e) {
			if (param.error) { param.error(e) } else {
				alert("Ajax Error:" + 
					  "\n - " + e.name + 
					  "\n - " + e.message + 
					  "\n - " + e.lineNumber +
					  "\n - " + e.fileName ); }
		}
	};
	
	/**
	 * Displays and common method
	 *
	 * Function: ViewLayer.onReady()
	 * Arguments: fun - execute function after all DOM was download complete
	 *
	 * Function: ViewLayer.onAllReady()
	 * Arguments: fun - execute function after all object was download complete
	 *
	 * Function: ViewLayer.Import()
	 * Arguments: s - class name for view layer lib
	 *
	 * Function: ViewLayer.Include()
	 * Arguments: p - script path, s - script file name
	 *
	 * Function: ViewLayer.getBrowser()
	 * 
	 * Function: ViewLayer.Slide()
	 * Arguments: param - {element, speed, value{width, height, top, bottom, left, right, opacity}, func}
	 *
	 */
	ViewLayer.onReady = function (fun) {
	    if (ViewLayer.readyBound) {   
            return;   
        }   
        ViewLayer.readyBound = true;
                
	    if (ViewLayer.getBrowser() == "msie") {
	        document.write("<scr" + "ipt id=__ie_init defer=true " + 
	                       "src=//:></script>");   
            var script = document.getElementById("__ie_init");   
            
            if (script)
                script.onreadystatechange = function(){
                    if (this.readyState != "complete") return;
                    if (!ViewLayer.isExecute) { fun(); ViewLayer.isExecute = true; }
                };
            
            script = null;
	    } else {
	        document.addEventListener("DOMContentLoaded", fun, false);
	    }
	};
	ViewLayer.onAllReady = function (fun) {
		if (ViewLayer.getBrowser() == "msie") {
		    document.write("<scr" + "ipt id=__ie_init defer=true " + "src=//:><\/script>");	
		    var script = document.getElementById("__ie_init");
		    if (script) {
			    document.onreadystatechange = function() {
		            if(document.readyState == "complete") {
					    fun();
				    }
				}
			}
		} else {
			window.onload = function() {
				fun();
			}
		}
	};
	ViewLayer.Import = function (s) {
		var n = document.createElement("script");
		var h = document.getElementsByTagName("head");
		n.setAttribute("type","text/javascript");
		n.setAttribute("src",ViewLayer.Path + "plugin/$" + s + ".js");
		h && h[0].appendChild(n);
	};
	ViewLayer.Include = function (p, s) {
		document.write("<script type=\"text/javascript\" src=\""+ p + "/" + s + ".js"+"\"><\/script>");
	};
	ViewLayer.getBrowser = function () {
		if(window.navigator.userAgent.toLowerCase().indexOf("msie")>-1)return "msie";
		if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1)return "firefox";
		if(window.navigator.userAgent.toLowerCase().indexOf("opera")>-1)return "opera";
		if(window.navigator.userAgent.toLowerCase().indexOf("chrome")>-1)return "chrome";
		return "other";
	};
	ViewLayer.getPosTop = function(o) {
        var l = o.offsetTop;
        while(o = o.offsetParent) {
            l += o.offsetTop;
        }
        return l;
    }
    ViewLayer.getPosLeft = function(o) {
        var l = o.offsetLeft;
        while(o = o.offsetParent) {
            l += o.offsetLeft;
        }
        return l;
    }
	ViewLayer.Slide = function (param) {
		if (param.element) {
			param.speed = param.speed ? param.speed : 20;
			private_move(param.element, param.speed, param.values, param.func)
		}
	};
	
	/**
	 * Prototype 
	 * 
	 * Method: trim() - 除去左右空格
	 * Method: getNum() - 保留数字
	 * Method: getEN() - 保留英文
	 * Method: getCN() - 保留中文
	 * Method: left(n) - 从左截取指定长度的字串
	 * Method: right(n) - 从右截取指定长度的字串
	 * Method: HTMLEncode() - HTML编码
	 * Method: fillZero(len) - 数字补零
	 * Method: getMax() - 获得数字数组的最大项
	 * Method: getMin() - 获得数字数组的最小项
	 * Method: indexOf(0) - 数组第一次出现指定元素值的位置
	 */
	String.prototype.trim = function() { return this.replace(/(^\s*)|(\s*$)/g, ""); }
	String.prototype.getNum = function() { return this.replace(/[^\d]/g,""); }
	String.prototype.getEN = function() { return this.replace(/[^A-Za-z]/g,""); }
	String.prototype.getCN = function() { return this.replace(/[^\u4e00-\u9fa5\uf900-\ufa2d]/g,""); }
	String.prototype.left = function(n) { return this.slice(0,n); }
	String.prototype.right = function(n) { return this.slice(this.length-n); }
	String.prototype.HTMLEncode = function() {
		var re = this;
		var q1 = [/\x26/g,/\x3C/g,/\x3E/g,/\x20/g];
		var q2 = ["&amp;","&lt;","&gt;","&nbsp;"];
		for(var i=0;i<q1.length;i++)
		re = re.replace(q1[i],q2[i]);
		return re;
	}
	
	Number.prototype.fillZero = function (len) {
		var s = this.toString(10);
		while (s.length<len) s = "0" + s;
		return s;
	}
	
	Array.prototype.getMax = function() { return this.sortNum(1)[0]; }
	Array.prototype.getMin = function() { return this.sortNum(0)[0]; }
	Array.prototype.indexOf = function(o) {for (var i=0; i<this.length; i++) if (this[i]==o) return i; return -1; }
	
	/**
	 * Private method
	 */
	function private_equal (key1, key2) {
		if (isNaN(key1)||isNaN(key2)||(key1==key2)) {
			return true;
		} else {
			return false;
		}
	}
	
	function private_ac (obj, speed, propertie, value1, value2) {
		var c = Math.ceil(Math.abs(value1-value2)/speed);
		var v = value1 + c * (value1<value2?1:-1) + "px";
		switch (propertie) {
			case "width":
				obj.style.width = v;break;
			case "height":
				obj.style.height = v;break;
			case "top":
				obj.style.top = v;break;
			case "bottom":
				obj.style.bottom = v;break;
			case "left":
				obj.style.left = v;break;
			case "right":
				obj.style.right = v;break;
			case "opacity":
				private_so(obj, v);break;
		}
	}
	
	function private_so (obj, opacity) {
		if (ViewLayer.getBrowser() == "msie") {
			obj.style.filter = "Alpha(Opacity=" + opacity + ",style=0)";
		} else {
			obj.style.opacity = (opacity / 100);
			obj.style.MozOpacity = (opacity / 100);
			obj.style.KhtmlOpacity = (opacity / 100);
		}
	}
	
	function private_go (obj) {
		return 0;
	}
	
	function private_move (element, speed, values, func) {
		var width = parseInt(values.width, 10);
		var height = parseInt(values.height, 10);
		var top = parseInt(values.top, 10);
		var bottom = parseInt(values.bottom, 10);
		var left = parseInt(values.left, 10);
		var right = parseInt(values.right, 10);
		var opacity = parseInt(values.opacity, 10);
		var speed = parseInt(speed, 10);
		
		var w = parseInt(element.style.width, 10);
		var h = parseInt(element.style.height, 10);
		var t = parseInt(element.style.top, 10);
		var b = parseInt(element.style.bottom, 10);
		var l = parseInt(element.style.left, 10);
		var r = parseInt(element.style.right, 10);
		var o = parseInt(private_go(element), 10);
		
		if (private_equal(w,width) && private_equal(h,height) && 
			private_equal(t,top) && private_equal(b,bottom) && 
			private_equal(l,left) && private_equal(r,right) && 
			private_equal(o,opacity)) {
			return func?func():true;
		} else {
			if ((!isNaN(w))&&(!isNaN(width))&&(w!=width)) {private_ac(element,speed,"width",w,width);}
			if ((!isNaN(h))&&(!isNaN(height))&&(h!=height)) {private_ac(element,speed,"height",h,height);}
			if ((!isNaN(t))&&(!isNaN(top))&&(t!=top)) {private_ac(element,speed,"top",t,top);}
			if ((!isNaN(b))&&(!isNaN(bottom))&&(b!=bottom)) {private_ac(element,speed,"bottom",b,bottom);}
			if ((!isNaN(l))&&(!isNaN(left))&&(l!=left)) {private_ac(element,speed,"left",l,left);}
			if ((!isNaN(r))&&(!isNaN(right))&&(r!=right)) {private_ac(element,speed,"right",r,right);}
			if ((!isNaN(o))&&(!isNaN(opacity))&&(o!=opacity)) {private_ac(element,speed,"opacity",o,opacity);}
			
			setTimeout(function (){private_move(element, speed, values, func)}, 10);
		}
	}
	
	function private_ro (t) {
		if (ViewLayer.getBrowser() == "msie") {
			if (t == "xml") {
				for (var i=0; i<4; i++) {
					try {
						var r = new ActiveXObject(["MSXML2.DOMDocument", "Microsoft.XMLDOM", "MSXML.DOMDocument", "MSXML3.DOMDocument"][i]);
						return r;
					} catch (e) {}
				}
			} else {
				for (var i=0; i<2; i++) {
					try {
						var r = new ActiveXObject(["MSXML2.XMLHTTP", "Microsoft.XMLHTTP"][i]);
						return r;
					} catch (e) {}
				}
			}
		} else {
			if (t == "xml") {
				return document.implementation.createDocument("", "doc", null);
			} else {
				return new XMLHttpRequest();
			}
		}
	}
	
	function private_cb (func, t, req, mtd) {
		switch (t) {
			case "xml" :
				(ViewLayer.getBrowser() == "msie") ? func(req.xml) : func((new XMLSerializer()).serializeToString(req));
				break;
			case "soap" :
			    func(eval("(" + req.responseXML.getElementsByTagName(mtd + "Result")[0].firstChild.nodeValue + ")"));
			    break;
			case "json" :
			    if (req.responseText=="") { req.responseText = "{\"issuccess\":\"false\", \"message\":\"SYNTAXERR\"}"; }
    			else { func(eval("(" + req.responseText + ")")) };
				break;
			case "text" :
			default:
				func(req.responseText);
		}
	}
	
	function private_soadt (val, mtd) {
	    return "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
			   "<soap:Envelope " +
			   "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
			   "xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
			   "xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
			   "<soap:Body>" +
			   "<" + mtd + " xmlns=\"http://tempuri.org/\">" + val  + "</" + mtd + "></soap:Body></soap:Envelope>";
	}
	
	function private_sh (param, reqObj) {
	    if (param.data.action == "POST") {
		    if (param.type == "soap") {
			    param.data.values = private_soadt(param.data.values, param.data.method);
				reqObj.setRequestHeader ("Content-Type", "text/xml; charset=utf-8"); 
		        reqObj.setRequestHeader ("SOAPAction", "http://tempuri.org/" + param.data.method);
			} else {
    		    reqObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    		}
		} else {
			if (param.type == "soap") {
			    reqObj.setRequestHeader ("Content-Type","text/xml; charset=utf-8"); 
		        reqObj.setRequestHeader ("SOAPAction","http://tempuri.org/" + param.data.method);
			}
		}
	}
	
};})(window);
