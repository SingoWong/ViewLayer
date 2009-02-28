
ViewLayer.Class.DragDrop = function(obj) {
    var me = this;
    this.foo = (typeof obj=="string")?document.getElementById(obj):obj;
    this.foo.onmousedown = function(e) {
		var foo = me.foo;
		e = e||event;
		foo.oOffset = (e.layerX)?{x:e.layerX,y:e.layerY}:{x:e.offsetX,y:e.offsetY};
		document.onmousemove = me.drag;
		document.onmouseup   = me.drop;
		document.onselectstart = function(){return false;};
    }
    this.drag = function(e) {
		var foo = me.foo;
		e=e||event;
		var top = e.clientY - foo.oOffset.y + document.body.scrollTop;
		var left = e.clientX - foo.oOffset.x + document.body.scrollLeft;
		if (me.range)
		{
			top = (top<me.range.y1) ? (me.range.y1) : ((top>me.range.y2-foo.offsetHeight) ? (me.range.y2-foo.offsetHeight) : top);
			left = (left<me.range.x1) ? (me.range.x1) : ((left>me.range.x2-foo.offsetWidth) ? (me.range.x2-foo.offsetWidth) : left);
		}
		foo.style.top  = top + "px";
		foo.style.left = left + "px";
    }
    this.drop = function() {
		document.onmousemove = document.onmouseup = document.onselectstart = null;
    }
	this.setRange = function(xx1,yy1,xx2,yy2) {
		me.range = {x1:xx1,x2:xx2,y1:yy1,y2:yy2};
	}
}