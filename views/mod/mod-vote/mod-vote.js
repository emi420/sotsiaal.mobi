/*
 * Vote module
 */

(function($) {

    "use strict";
    
    var app = $("main").app(),
        ModVote,
        modVote;
                
    var ModVote = function() {
        return this;
    }
    
    ModVote.prototype = {
    
        send: function(options) {
            if (app.models.Vote.filter({user: app.models.User.getCurrent()}).length === 0) {
                var vote = app.models.Vote.create({
                    value:  options.value,
                    story:  app.data.get("currentStory"),
                    user:   app.models.User.getCurrent(),
                })
                vote.save();                
                this._delayedSuccess = true;
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
                
    modVote = new ModVote();
    
    // Public modules
    $.extend({modVote: modVote}, app);
    
}(Mootor));