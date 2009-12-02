
ViewLayer.Class.SmoothScroll = function () {

    this.init = function () {
        var allLinks = $tag("a");
        this.scroll(allLinks);
    }
    
    this.scroll = function(es) {
        for(var i=0; i<es.length; i++) {
            var l = es[i];
            if ((l.href && l.href.indexOf("#") != -1) && ((l.pathname == location.pathname) || ("/" + l.pathname == location.pathname)) && (l.search == location.search)) {
                var strHash = l.hash.substr(1);
                var t = this;
                l.href = "javascript:void(0);";
                ViewLayer.addEvent({
                    element: l,
	                type: "click",
	                func: function() {
	                    var posTop = ViewLayer.getPosTop($name(strHash)[0]);
	                    var curYPos = t.getCurrentYPos();
	                    
	                    t.scrollWindow('', '', strHash);
	                }
                });
            }
        }
    }
    
    this.scrollWindow = function(scramount,dest,anchor) {
        var wascypos = this.getCurrentYPos();
        var isAbove = (wascypos < dest);
        window.scrollTo(0,wascypos + scramount);
        var iscypos = this.getCurrentYPos();
        var isAboveNow = (iscypos < dest);
        if ((isAbove != isAboveNow) || (wascypos == iscypos)) {
            window.scrollTo(0,dest);
            clearInterval(ss.INTERVAL);
            location.hash = anchor;
        } else {
            var t = this;
            setTimeout(function (){t.scrollWindow();}, 10);
        }
    }
    
    this.getCurrentYPos = function() {
        if (document.body && document.body.scrollTop)
            return document.body.scrollTop;
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        if (window.pageYOffset)
            return window.pageYOffset;
        return 0;
    }
};