
ViewLayer.Class.OpenPopup = function () {
    
    this.top = 200;
    this.width = 200;
    this.height = 20;
    this.lineheight = 20;
    this.autohide = true;
    
    this.ShowPopup = function(obj) {
        
    }
    
    this.Alter = function(message) {
        var isAutoHide = this.autohide;
        var cbHiddenAlter = this.HiddenAlter;
        var alter = document.createElement("div");
        alter.setAttribute("id","basic_alter");
	    alter.className = "basic_alter";
	    alter.innerHTML = message;
	    alter.style.top = (0 - this.top) + "px";
	    alter.style.left = (document.body.clientWidth-200)/2 + "px";
	    alter.style.width = this.width + "px";
	    
	    if (!isAutoHide) {
	        var btnOK = document.createElement("img");
	        btnOK.setAttribute("id","basic_alter_img");
	        btnOK.setAttribute("src",ViewLayer.Path+"plugin/@OpenPopup/btn_ok.png");
	        btnOK.className = "basic_alter_img";
	        alter.appendChild(btnOK);
	        
	        this.height += 20;
	    }
	    
	    alter.style.height = this.height + "px";
	    alter.style.lineHeight = this.lineheight + "px";
    	
	    document.body.appendChild(alter);
	    
	    if (!isAutoHide) {
	        ViewLayer.addEvent({
                element: $("basic_alter_img"),
	            type: "click",
	            func: function(){
		            cbHiddenAlter(0);
		            return false;
	            }
            });
	    }
    	
	    ViewLayer.Slide({
	        element: $("basic_alter"),
		    speed: 10,
		    values: {
		        top: 200
		    },
		    func: function() {
		        if(isAutoHide) {
        			cbHiddenAlter(3000);
        	    }
		    }
	    });
    }
    
    this.HiddenAlter = function(wait) {
        setTimeout(function() {
            ViewLayer.Slide({
	            element: $("basic_alter"),
		        speed: 10,
		        values: {
		            top: 200
		        },
		        func: function() {
        			ViewLayer.Slide({
	                    element: $("basic_alter"),
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
