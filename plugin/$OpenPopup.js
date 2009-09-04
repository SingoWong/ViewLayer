
ViewLayer.Class.OpenPopup = function () {
    
    this.top = 200;
    this.width = 200;
    this.height = 20;
    this.lineheight = 20;
    this.autohide = true;
    
    this.ShowPopup = function(obj) {
        
    }
    
    this.Alert = function(message) {
        if ($("basic_alert") != null) {
            $remove($("basic_alert"));
        }
        var isAutoHide = this.autohide;
        var cbHiddenAlert = this.HiddenAlert;
        var objalert = document.createElement("div");
        objalert.setAttribute("id","basic_alert");
	    objalert.className = "basic_alert";
	    objalert.innerHTML = message;
	    objalert.style.top = (0 - this.top) + "px";
	    objalert.style.left = (document.body.clientWidth-200)/2 + "px";
	    objalert.style.width = this.width + "px";
	    
	    if (!isAutoHide) {
	        var btnOK = document.createElement("img");
	        btnOK.setAttribute("id","basic_alert_img");
	        btnOK.setAttribute("src",ViewLayer.Path+"plugin/@OpenPopup/btn_ok.png");
	        btnOK.className = "basic_alert_img";
	        objalert.appendChild(btnOK);
	        
	        this.height += 20;
	    }
	    
	    objalert.style.height = this.height + "px";
	    objalert.style.lineHeight = this.lineheight + "px";
    	
	    document.body.appendChild(objalert);
	    
	    if (!isAutoHide) {
	        ViewLayer.addEvent({
                element: $("basic_alert_img"),
	            type: "click",
	            func: function(){
		            cbHiddenAlert(0);
		            return false;
	            }
            });
	    }
    	
	    ViewLayer.Slide({
	        element: $("basic_alert"),
		    speed: 10,
		    values: {
		        top: 200
		    },
		    func: function() {
		        if(isAutoHide) {
        			cbHiddenAlert(3000);
        	    }
		    }
	    });
    }
    
    this.HiddenAlert = function(wait) {
        setTimeout(function() {
            ViewLayer.Slide({
	            element: $("basic_alert"),
		        speed: 10,
		        values: {
		            top: 200
		        },
		        func: function() {
        			ViewLayer.Slide({
	                    element: $("basic_alert"),
		                speed: 10,
		                values: {
		                    top: -200
		                }
	                });
		        }
	        });
	    }, wait);
    }
}
