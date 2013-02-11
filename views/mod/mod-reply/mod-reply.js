/*
 * Reply module
 */

(function($) {

    "use strict";
    
    var app = $("main").app(),
        Reply,
        reply;
                
    var Reply = function() {
        this.$textarea = $("#mod-reply-textarea");
        return this;
    }
    
    Reply.prototype = {
    
        modal: app.modModal({html: $['mod-reply'].html}),
        
        send: function() {
            var comment = app.models.Comment.create({
                text:   this.$textarea[0].value,
                user:   app.data.get("currentUser"),
                story:  app.data.get("currentStory"),
                type:   "text"
            });
            comment.save();
            this._delayedSuccess = true;
            return this;
        },
        
        clear: function() {
              this.$textarea[0].value = "";
        },
        
        focus: function() {
              // FIXME CHECK
              this.$textarea[0].focus();
        },
        
        success: function(callback) {
            this._success = callback;
            if (this._delayedSuccess === true) {
                this._success();
            }
        }
    }
                
    reply = new Reply();
    
    $("#mod-reply-cancel").onTapEnd(function() {
        reply.modal.hide();
    });

    $("#mod-reply-send").onTapEnd(function() {
        reply.send().success(function() {
            reply.modal.hide();
            reply.onSend();     
        });
    });
    
    // FIXME CHECK: set temporary sample user
    app.data.set("currentUser", app.models.User.get(1));

    // Public modules
    $.extend({modReply: reply}, app);
    
}(Mootor));