(function($) {

    var nav = $("#main").nav(),
        app = $("main").app(),
        view = {},
        navItemName = "story-create",
        navItem = nav.get(navItemName),
        $navSearch = $(nav.header.navLinks.navSearch),
        $modStoryCreateTitle = $("#mod-story-create-title"),
        $modStoryCreateTextarea = $("#mod-story-create-textarea"),
        story = {},
        currentUser;
    
    view = {
        
        init: function() {
            // Set onLoad callbacks
            navItem.onLoad = view.onLoad;
            if(app.views[nav.current].id === navItemName) {
                view.onLoad();               
            }            
        },
        
        onLoad: function() {
            
            // TODO: categories
            var category = app.models.Category.get(1);
            
            if (
                app.modLogin.authRequired(
                    function() {
                        app.go("story-create");                                     
                    }
                )
            === false) {
                return false;
            }
            
            view.updateHeader();

            story = app.models.Story.create({
                title:          "",
                description:    "",
                user:           currentUser,
                picture:        "",
                date:           "a moment",
                pop:            0,
                category:       category
            });
        },
        
        updateHeader: function() {
            $(nav.header.navLinks.navSearch).hide();
            $(nav.header.navLinks.navCreate).hide();
            $(nav.header.navLinks.navPost).show();              
        }
                    
    }
    
    // Initialize view
    view.init()
    
    $("#navPost").onTapEnd(function(){

        // TODO
        var category = app.models.Category.get(1);

        story.title = $modStoryCreateTitle[0].value;
        story.description = $modStoryCreateTextarea[0].value;
        story.save();
        story.user = currentUser;
        story.category = category;
        app.data.set("currentStory", story);
        app.go("story");
    });

    /*
     * Story w/ picture
     */

    var camera = $("#mod-story-create-picture").ui({
        type: "Camera"
    });    
    camera.onSuccess(function(imageURI) {
        $(this.input).setClass("mod-story-create-picture-active");
        this.hide();
        story.picture = imageURI;
    });
    
    // FIXME CHECK (styles)
    //$("#mod-story-create-textarea").ui({type:"TextArea"});
    //$("#mod-story-create-title").ui({type:"Text"});
    
}(Mootor));