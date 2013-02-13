/*
 * Vote module
 */

(function($) {

    "use strict";
    
    var app = $("main").app(),
        Vote,
        vote;
                
    var Vote = function() {
        return this;
    }
    
    Vote.prototype = {
    
        send: function(options) {
            if (app.models.Vote.filter({user: app.models.User.getCurrent()}) === null) {
                var vote = app.models.Vote.create({
                    value:  options.value,
                    story:  app.data.get("currentStory"),
                    user:   app.models.User.getCurrent(),
                })
                vote.save();                
                this._delayedSuccess = true;
            } else {
                app.modLogin.modal.show();
                app.modLogin.focus();
                app.modLogin.onSend = function(result) {
                }
            }
            return this;
        },
        
        success: function(callback) {
            this._success = callback;
            if (this._delayedSuccess === true) {
                this._success();
            }
        }
    }
                
    vote = new Vote();
    
/*    $("#mod-Vote-send").onTapEnd(function() {
        Vote.send().success(function() {
            Vote.modal.hide();
            Vote.onSend();     
        });
    });
*/

    // Public modules
    $.extend({modVote: vote}, app);
    
}(Mootor));