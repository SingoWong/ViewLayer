
ViewLayer.Class.Cookie = function () {
	this.get = function (Name) {
		var search = Name + "=";
		if(document.cookie.length > 0) {
			var offset = document.cookie.indexOf(search);
			if(offset != -1) {
				offset += search.length;
				var end = document.cookie.indexOf(";", offset);
				if(end == -1) end = document.cookie.length;
				return unescape(document.cookie.substring(offset, end));
			}
			else return "";
		}
		else return "";
	}
	this.set = function(name,value) {
		var today = new Date();
		var expires = new Date();
		expires.setTime(today.getTime() + 1000*60*60*24*365);
		document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expires.toGMTString();
	}
	this.remove = function (name) {
		var today = new Date();
		var expires = new Date();
		expires.setTime(today.getTime() - 1);
		document.cookie = name + "=0; path=/; expires=" + expires.toGMTString();
	}
}