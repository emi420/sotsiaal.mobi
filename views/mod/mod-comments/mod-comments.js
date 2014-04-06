(function($) {

    "use strict";
    
    var app = m.app,
        ModComments,
        modComments,
        modReply = {},
        storyComment = {},
        $storyModComments;

    /*
     * ModComments
     */
             
    var ModComments = function() {
        ModComments.init(this);
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
                        storyComment.push(comments[i]);
                    }
                }
            );            
        },    
    }
    
    ModComments.init = function(self) {
        $storyModComments = $("#story-mod-comments");
        storyComment = app.models.observableArray([]);
        app.models.bind(
             {"storyComment": storyComment},
             $storyModComments[0]
        );      
        Mootor.Event.dispatch("ModComments:ready", self);
    }
    
    Mootor._Comments = ModComments;
    
    Mootor.Event.extend(ModComments);
    
    /*
     * modReply connector
     */
    $.extend(m.app._mod.Reply, {

        init: function() {

            $("#mod-comments-writehere").on("tap click", function() {
                
                var showReplyModal,
                    currentUser;
                    
                Mootor._Reply.init(m.app._mod.Reply);
                    
                showReplyModal = function() {
                    if (m.app._mod.Reply.onSend === undefined) {
                        m.app._mod.Reply.onSend = function() {
                            m.app._mod.Comments.bindData();
                        }
                    }
                    m.app._mod.Reply.clear();
                    m.app._mod.Reply.modal.show();
                    m.app._mod.Reply.focus();                    
                };
                
                showReplyModal(); 
               
                /*app.modLogin.authRequired(
                    function() {
                        showReplyModal();                                            
                    }
                );*/

            });
        },
                    
    });

    /*
     * Initialize module
     */
    modComments = new ModComments();

    // Go public
    $.extend(m.app._mod.Comments, ModComments.prototype);


}(window.Zepto));