(function($) {

    "use strict";
    
    var app = $("main").app(),
        modComments,
        storyComment = {},
        $storyModComments;
        
    console.log("mod-comments load");

    modComments = {

        init: function() {      

            $storyModComments = $("#story-mod-comments");

            storyComment = app.models.observableArray([]);
            app.models.bind(
                 {"storyComment": storyComment},
                 $storyModComments[0]
            );
            console.log($storyModComments[0]);
        },
        
        bindData: function() {

            var newStoryComment,
                i;

            newStoryComment = app.models.Comment.filter(
                {story: app.data.get("currentStory")}
            );                

            storyComment.removeAll();
            
            for (i = 0; i < newStoryComment.length; i++) {
                storyComment.push(newStoryComment[i]);
            }

        }
        
    };
    
    modComments.init();

    // Public modules
    $.extend({modComments: modComments}, app);    

}(Mootor));