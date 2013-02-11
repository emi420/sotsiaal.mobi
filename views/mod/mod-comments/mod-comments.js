(function($) {

    "use strict";
    
    var app = $("main").app(),
        ModComments,
        modComments,
        modReply = {},
        storyComment = {},
        $storyModComments;

    /*
     * ModComments
     */
             
    var ModComments = function() {
        $storyModComments = $("#story-mod-comments");
        storyComment = app.models.observableArray([]);
        app.models.bind(
             {"storyComment": storyComment},
             $storyModComments[0]
        );        
        modReply.init(this);
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
    
    /*
     * modReply connector
     */
    $.extend({

        init: function(self) {
            $("#mod-comments-writehere").onTapEnd(function() {
                if (app.modReply.onSend === undefined) {
                    app.modReply.onSend = function() {
                        app.modComments.bindData();
                    }
                }
                app.modReply.clear();
                app.modReply.modal.show();
                app.modReply.focus();
            });
        },
                    
    }, modReply);

    /*
     * Initialize module
     */
    modComments = new ModComments();
    // Go public
    $.extend({modComments: modComments}, app);    


}(Mootor));