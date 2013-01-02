(function($) {

    var nav = $("#main").nav(),
        app = $("main").app(),
        view = {},
        navItemName = "index",
        navItem = nav.get(navItemName);
    
    view = {
        
        init: function() {
        
            $("#index-mod-story-list").html($["mod-story-list"].html);
            $("#index-mod-topbar").html($["mod-topbar"].html);

            // Bind data
            app.modStoryList.bindData($("#index")[0]);

            // Set onLoad callbacks
            navItem.onLoad = view.onLoad;
            if(app.views[nav.current].id === navItemName) {
                view.onLoad();               
            }
            
        },
        
        onLoad: function() {
            $(nav.header.navLinks.navSearch).show();
            app.modStoryList.onLoadView();
        },
                    
    }
    
    // Initialize view
    view.init()
            
}(Mootor));