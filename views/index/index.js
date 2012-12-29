(function($) {

    var nav = $("#main").nav(),
        app = $("main").app(),
        view = {},
        navItemName = "index",
        navItem = nav.get(navItemName);
    
    view = {
        
        init: function() {
        
            $("#index-mod-stream").html($.modStoryList.html);
            $("#index-mod-topbar").html($.modTopbar.html);

            // Bind data
            app.modStoryList.bindData($("#index")[0]);

            // Set onLoad callbacks
            navItem.onLoad = view.onLoad;
            if(app.views[nav.current].id === navItemName) {
                view.onLoad();               
            }
            
        },
        
        onLoad: function() {
            app.modStoryList.onLoadView();
        },
                    
    }
    
    // Initialize view
    view.init()
            
}(Mootor));