(function($) {

    var nav = $("#main").nav(),
        app = $("main").app(),
        view = {},
        navItemName = "story",
        navItem = nav.get(navItemName);
    
    view = {
        
        init: function() {
            // Set onLoad callbacks
            navItem.onLoad = view.onLoad;
            if(app.views[nav.current].id === navItemName) {
                view.onLoad();               
            }
            
        },
        
        onLoad: function() {
             $(nav.header.navLinks[0]).hide();
             app.modStory.bindData($("#story")[0]);
        },
        
        handlers: {
        },
                    
    }
    
    // Initialize view
    view.init()
    
}(Mootor));