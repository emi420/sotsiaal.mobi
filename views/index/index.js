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
            
            view.storyList = app.modStory().list();

            app.models.Story.getAll().success(
                function(data) {
                    // Bind data
                    view.storyList.bindData($("#index")[0], data);
                }
            )

            // Set onLoad callbacks
            navItem.onLoad = view.onLoad;
            if(app.views[nav.current].id === navItemName) {
                view.onLoad();               
            }
            
            app.get(navItemName).storyList = view.storyList;
            
        },
        
        onLoad: function() {
            $(nav.header.navLinks.navSearch).show();
            $(nav.header.navLinks.navCreate).show();
            $(nav.header.navLinks.navPost).hide();
            
            app.models.Story.getAll().success(
                function(data) {
                    view.storyList.updateBindings(data)             
                }
            )
        },
                    
    }
    
    // Initialize view
    view.init()
            
}(Mootor));