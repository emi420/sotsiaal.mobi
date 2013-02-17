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
        
        updateHeader: function() {
            $(nav.header.navLinks.navSearch).hide();
            $(nav.header.navLinks.navCreate).show();
            $(nav.header.navLinks.navPost).hide();            
        },
        
        bindData: function() {
            var currentCategory = app.data.get("currentCategory");                
            if (currentCategory) {
                categoryTitle = currentCategory.title;            
            }
            app.models.applyBindings(
                {"categoryTitle": categoryTitle},
                $("#mod-category-title")[0]
            );
            
            view.storyList.updateBindings(
                app.models.Story.filter({category:currentCategory})
            );           
        },
        
        onLoad: function() {
            view.updateHeader();
            view.bindData();
        },
                    
    }
    
    // Initialize view
    view.init()
            
}(Mootor));