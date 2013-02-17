(function($) {

    var nav = $("#main").nav(),
        app = $("main").app(),
        view = {},
        navItemName = "category",
        navItem = nav.get(navItemName),
        categoryTitle = "";
    
    view = {
        
        init: function() {
        
            $("#category-mod-story-list").html($["mod-story-list"].html);

            app.models.bind(
                {"categoryTitle": categoryTitle},
                $("#mod-category-title")[0]
            );
            
            view.storyList = app.modStory().list();

            // Bind data
            view.storyList.bindData($("#category-mod-story-list")[0], []);

            // Set onLoad callbacks
            navItem.onLoad = view.onLoad;
            if(app.views[nav.current].id === navItemName) {
                view.onLoad();               
            }
            
            app.get(navItemName).storyList = view.storyList;
            
        },
        
        onLoad: function() {
            $(nav.header.navLinks.navSearch).hide();
            $(nav.header.navLinks.navCreate).show();
            $(nav.header.navLinks.navPost).hide();
            
            var currentCategory = app.data.get("currentCategory");
            if (currentCategory) {
                categoryTitle = currentCategory.title;            
            }

            app.models.applyBindings(
                {"categoryTitle": categoryTitle},
                $("#mod-category-title")[0]
            );
            
            var stories = app.models.Story.filter({category:currentCategory});
            
            // Bind data
            view.storyList.updateBindings(stories);
        },
                    
    }
    
    // Initialize view
    view.init()
            
}(Mootor));