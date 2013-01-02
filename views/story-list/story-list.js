(function($) {

    var nav = $("#main").nav(),
        app = $("main").app(),
        view = {},
        navItemName = "inspections",
        navItem = nav.get(navItemName);
    
    view = {
        
        init: function() {
            
            // Bind data
            view.bindData();

            // Set onLoad callbacks
            navItem.onLoad = view.onLoad;
            if(app.views[nav.current].id === navItemName) {
                view.onLoad();               
            }
            
        },
        
        onLoad: function() {
            app.data.get("inspections").sort(app.models.sort);
        },
        
        handlers: {
            go: function(inspection) {
                if (event.target.className !== "delete" && inspection.status === "draft") {
                    app.data.set("currentInspection", inspection);
                    app.go("inspection_1_info");
                }                                                                
            },
            destroy: function(inspection) {
                setTimeout(function() {
                    if (confirm(app.s.ARE_YOU_SURE[app.lang]) === true) {
                        app.data.get("inspections").remove(inspection);
                        app.models.Inspection.destroy(inspection.id);
                    }
                }, 0);
            },
        },
        
        /*
         * Bind data
         */         
        bindData: function() {
            var inspections = app.data.set(
                "inspections", 
                app.models.Inspection.all()
            );
            
            inspections.showEmptyMsg = function() {
                if (this.length === 0) {
                    return "visible";
                } else {
                    return "";
                }
            }

            inspections.showList = function() {
                if (this.length === 0) {
                    return "test";
                } else {
                    return "visible";
                }
            }
            
            // Inspections
            app.models.bind(
                 {"inspections": app.models.observableArray(inspections)},
                 $("#inspections")[0],
                 {
                    open: view.handlers.go,
                    destroy: view.handlers.destroy                     
                 }
            );    
 
        },
                    
    }
    
    // Initialize view
    view.init()
    
    // Draw sample
    /*$("#canvasTest").drawArea({
        width: 640,
        height: 480
    });*/
    
    /*
     * Controllers
     */    
     
    nav.header.navLinks.create.$el.onTapEnd(function() {
        app.data.set("currentInspection", app.models.Inspection.create({}));
        app.go("inspection_1_info");
    });
    
        
}(Mootor));