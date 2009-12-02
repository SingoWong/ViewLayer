var onShowDownload = function() {
	lock = true;
	
	ViewLayer.Slide({
		element: $("content"),
		speed: 3,
		values: {
			height:objHeight-objDownloadPanelHeight
		}
	});
	
	ViewLayer.Slide({
		element: $("download_panel"),
		speed: 3,
		values: {
			height:objDownloadPanelHeight
		},
		func: function(){
			lock = false;
			$("lnkShowDownload").style.display = "none";
			$("lnkHideDownload").style.display = "";
		}
	});
}

var onHideDownload = function() {
	lock = true;
	
	ViewLayer.Slide({
		element: $("content"),
		speed: 3,
		values: {
			height:objHeight
		}
	});
	
	ViewLayer.Slide({
		element: $("download_panel"),
		speed: 3,
		values: {
			height:0
		},
		func: function(){
			lock = false;
			$("lnkShowDownload").style.display = "";
			$("lnkHideDownload").style.display = "none";
		}
	});
}

var onMenuClose = function() {
	lock = true;
	
	ViewLayer.Slide({
		element: $("menu_panel"),
		speed: 3,
		values: {
			width:10
		}
	});
	
	ViewLayer.Slide({
		element: $("frame_panel"),
		speed: 3,
		values: {
			width:$("frame_panel").clientWidth + objDefaultMenuWidth - 10
		},
		func: function(){
			lock = false;
			$("lnkHideMenu").style.display = "none";
			$("lnkShowMenu").style.display = "";
			objCurrMenuWidth = 10;
		}
	});
}

var onMenuShow = function() {
	lock = true;
	
	ViewLayer.Slide({
		element: $("menu_panel"),
		speed: 3,
		values: {
			width:objDefaultMenuWidth
		}
	});
	
	ViewLayer.Slide({
		element: $("frame_panel"),
		speed: 3,
		values: {
			width:$("frame_panel").clientWidth - objDefaultMenuWidth + 10
		},
		func: function(){
			lock = false;
			$("lnkHideMenu").style.display = "";
			$("lnkShowMenu").style.display = "none";
			objCurrMenuWidth = 180;
		}
	});
}