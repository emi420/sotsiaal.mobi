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
                text:    this.$textarea[0].value,
                picture: this.picture,
                user:    app.models.User.getCurrent(),
                story:   app.data.get("currentStory"),
                type:    ""
            });
            comment.save();
            this._delayedSuccess = true;
            this.$textarea[0].blur();
            return this;
        },
        
        clear: function() {
              this.$textarea[0].value = "";
        },
        
        focus: function() {
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

    /*
     * Reply w/ picture
     */

    var camera = $("#mod-reply-picture").ui({
        type: "Camera"
    });    
    camera.onSuccess(function(imageURI) {
        $(this.input).setClass("mod-reply-options-picture-active");
        this.hide();
        reply.picture = imageURI;
    });
        
    $("#mod-reply-textarea").ui({type:"TextArea"});

    // Public modules
    $.extend({modReply: reply}, app);
    
}(Mootor));