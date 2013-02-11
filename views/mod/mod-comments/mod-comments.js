(function($) {

    "use strict";
    
    var app = $("main").app(),
        ModComments,
        modComments,
        storyComment = {},
        $storyModComments;
        
    var ModComments = function() {
        $storyModComments = $("#story-mod-comments");
        storyComment = app.models.observableArray([]);
        app.models.bind(
             {"storyComment": storyComment},
             $storyModComments[0]
        );        
        ModComments.setTouchEvents(this);
        return this;
    }
    
    ModComments.prototype = {
    
        bindData: function() {
            app.models.Comment.filter(
                {story: app.data.get("currentStory")}
            ).success(            
                function(comments) {
                    var i;
                    storyComment.removeAll();
                    for (i = 0; i < comments.length; i++) {
                        comments[i].user = app.models.User.get(comments[i].user);
                        storyComment.push(comments[i]);
                    }
                }
            );            
        },    
    }
    
    $.extend({

        setTouchEvents: function(self) {
            $("#mod-comments-writehere").onTapEnd(function() {
                app.modReply.modal.show();
            });
        },
                    
    }, ModComments);
            
    modComments = new ModComments();

    // Public modules
    $.extend({modComments: modComments}, app);    

}(Mootor));