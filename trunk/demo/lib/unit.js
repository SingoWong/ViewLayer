setRounded = function(values, obj) {
	obj.className = "RoundedCorner";
	var r1 = document.createElement("b");
	r1.className = "r1";
	r1.style.backgroundColor = values.color;
	var r2 = document.createElement("b");
	r2.className = "r2";
	r2.style.backgroundColor = values.color;
	var r3 = document.createElement("b");
	r3.className = "r3";
	r3.style.backgroundColor = values.color;
	var r4 = document.createElement("b");
	r4.className = "r4";
	r4.style.backgroundColor = values.color;
	var rtop = document.createElement("b");
	rtop.className = "rtop";
	var rbottom = document.createElement("b");
	rbottom.className = "rbottom";
	
	var rtopHTML, rbottomHTML;
	if(values.top) {
		rtop.appendChild(r1);
		rtop.appendChild(r2);
		rtop.appendChild(r3);
		rtop.appendChild(r4);
		rtop.innerHTML = rtop.innerHTML;
	}
	
	if(values.bottom) {
		rbottom.appendChild(r4);
		rbottom.appendChild(r3);
		rbottom.appendChild(r2);
		rbottom.appendChild(r1);
		rbottom.innerHTML = rbottom.innerHTML;
	}

	var objHTML = obj.innerHTML;
	var rcontent = document.createElement("div");
	rcontent.className = "rcontent";
	rcontent.style.backgroundColor = values.color;
	rcontent.innerHTML = objHTML;
	obj.innerHTML = "";
	if(values.top) {
	    obj.appendChild(rtop);
	}
	obj.appendChild(rcontent);
	if(values.bottom) {
	    obj.appendChild(rbottom);
	}
	obj.innerHTML = obj.innerHTML;
}

var onShowDemo = function(panel, sender, target) {
	sender.style.display = "none";
	target.style.display = "";
	
	ViewLayer.Slide({
		element: panel,
		speed: 3,
		values: {
			height:500
		},
		func: function() {
			panel.style.overflow = "auto";
		}
	});
}

var onHideDemo = function(panel, sender, target) {
	sender.style.display = "none";
	target.style.display = "";
	
	ViewLayer.Slide({
		element: panel,
		speed: 3,
		values: {
			height:0
		},
		func: function() {
			panel.style.overflow = "hidden";
		}
	});
}