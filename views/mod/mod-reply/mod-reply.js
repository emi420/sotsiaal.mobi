/*
 * Reply module
 */

(function($) {

    "use strict";
    
    var app = m.app,
        Reply,
        reply;
                
    
    m.app._mod.Modal.on("ready", function(self) {
        
        var Reply = function() {
            Reply.init(this);
        }
        
        Reply.init = function(self) {
            self.$textarea = $("#mod-reply-textarea");
        }
        
        Mootor._Reply = Reply;
        
        Mootor._Modal.init({html: m.app._mod.Reply.html}, m.app._mod.Modal);
    
        Reply.prototype = {
    
            modal: m.app._mod.Modal,
        
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
        
        m.app._mod.Reply.on("ready", function(self) {
            $("#mod-reply-cancel").on("tap", function() {
                self.modal.hide();
            });

            $("#mod-reply-send").on("tap", function() {
                self.send().success(function() {
                    self.modal.hide();
                    self.onSend();     
                });
            });
            
        })
    

        /*
         * Reply w/ picture
         */

        /*var camera = $("#mod-reply-picture").ui({
            type: "Camera"
        });    
        camera.onSuccess(function(imageURI) {
            $(this.input).setClass("mod-reply-options-picture-active");
            this.hide();
            reply.picture = imageURI;
        });
            */
        
        // Public modules
        $.extend(m.app._mod.Reply, Reply.prototype);

    });

    
}(window.Zepto));