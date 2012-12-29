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
            view.bindData();
        },
        
        handlers: {
        },
        
        /*
         * Bind data
         */         
        bindData: function() {
            var currentStory = app.data.get("currentStory");

            if (currentStory === undefined) {
                currentStory = app.models.Story.create({});
            }

            app.models.applyBindings(
                { 
                    story: currentStory 
                },
                $("#story")[0]
            );
        },
                    
    }
    
    // Initialize view
    view.init()
    
}(Mootor));