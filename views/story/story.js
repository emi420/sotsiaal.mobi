(function($) {

    var nav = $("#main").nav(),
        app = $("main").app(),
        view = nav.get("story"),
        $storyMod = $("#story-mod"),
        $storyModComments = $("#story-mod-comments"),
        $navSearch = $(nav.header.navLinks.navSearch),
        $navCreate = $(nav.header.navLinks.navCreate),
        $navPost = $(nav.header.navLinks.navPost);
        
    
    $.extend({
        
        init: function() {
            // Set onLoad callbacks
            $storyModComments.html($["mod-comments"].html);
            view.modStory = app.modStory();
        },
        
        onLoad: function() {
            $navSearch.hide();            
            $navCreate.show();
            $navPost.hide();
            view.modStory.bindData($storyMod[0]);
            app.modComments.bindData();
        },
                    
    }, view);
    
    // Initialize view
    view.init()

    /*
     * modVote connector
     */     
    $("#story-mod-pop").onTapEnd(function() {

        app.modLogin.authRequired(
            function() {

                app.modVote.send({
                    value: 1
                }).success(function() {
                    var story = app.data.get("currentStory");
                    story.pop += 1;
                    story.put();
                    view.modStory.bindData(view.modStory.el);
                });

            }
        );

    });

    
}(Mootor));