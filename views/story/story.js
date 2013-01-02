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
        },
        
        onLoad: function() {
             $(nav.header.navLinks.navSearch).hide();
             app.modStory.bindData($("#story")[0]);
        },
        
        handlers: {
        },
                    
    }
    
    // Initialize view
    view.init()
    
}(Mootor));