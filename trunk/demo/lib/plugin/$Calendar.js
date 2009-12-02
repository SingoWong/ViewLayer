
ViewLayer.Class.Calendar = function () {

    this.clientId;
    
    this.init = function() {
        var CI = this.clientId;
        
        if($(CI)!=null) {
            var c = $(CI);
            var p = $parent(c);
            
            c.className += " calendar_input";
            
            p.style.position = "relative";
            
            var calendar_panel = document.createElement("iframe");
            calendar_panel.setAttribute("id",CI+"_meizzDateLayer");
            calendar_panel.frameBorder = 0;
            calendar_panel.className = "calendar_panel";
            calendar_panel.style.top = c.offsetTop + 21 + "px";
            calendar_panel.style.left = c.offsetLeft + "px";
            calendar_panel.style.display = "none";
            
            var calendar_a = document.createElement("a");
            calendar_a.className = "calendar";
            calendar_a.href = "#";
            calendar_a.setAttribute("onclick","return false;");
                        
            ViewLayer.addEvent({
                element: c,
                type: "focus",
                func: function() {
                    calendar_panel.style.display = "block";
                    calendar_a.className += " active_calendar";
		            return false;
                }
            });
            
            ViewLayer.addEvent({
                element: calendar_a,
                type: "focus",
                func: function() {
                    calendar_panel.style.display = "block";
                    calendar_a.className += " active_calendar";
		            return false;
                }
            });
            
            ViewLayer.addEvent({
                element: c,
                type: "blur",
                func: function() {
                    calendar_panel.style.display = "none";
                    calendar_a.className = "calendar";
		            return false;
                }
            });
            
            ViewLayer.addEvent({
                element: calendar_a,
                type: "blur",
                func: function() {
                    calendar_panel.style.display = "none";
                    calendar_a.className = "calendar";
		            return false;
                }
            });
            
            p.appendChild(calendar_panel);
		    p.appendChild(calendar_a);
        }
    }
}
