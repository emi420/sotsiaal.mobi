/*
 * Signup module
 */

(function($) {

    "use strict";
    
    var app = $("main").app(),
        signup,
        Signup;
                
    var Signup = function() {
        this.$username = $("#mod-signup-username");
        this.$email = $("#mod-signup-email");
        this.$password = $("#mod-signup-password");
        return this;
    }
    
    Signup.prototype = {
    
        modal: app.modModal({html: $['mod-signup'].html}),
        
        send: function() {
            var user = app.models.User.create({
                nickname: this.$username[0].value,
                email: this.$email[0].value,
                //password: this.$password[0].value,
            });
            user.save()
            this.result = true;
            
            // TODO auth user (API)
            app.data.set("currentUser",user);
            
            this._delayedSuccess = true;
            this.$email[0].blur();
            this.$username[0].blur();
            this.$password[0].blur();
            return this;
        },
        
        clear: function() {
            this.$email[0].value = "";
            this.$username[0].value = "";
            this.$password[0].value = "";
        },
        
        focus: function() {
              this.$username[0].focus();
        },
        
        success: function(callback) {
            this._success = callback;
            if (this._delayedSuccess === true) {
                this._success();
            }
        }
    }
                
    signup = new Signup();
    
    $("#mod-signup-cancel").onTapEnd(function() {
        signup.modal.hide();
    });

    $("#mod-signup-send").onTapEnd(function() {
        signup.send().success(function() {
            signup.modal.hide();
            app.modLogin.onSend(this.result);     
        });
    });

    $("#mod-signup-login").onTapEnd(function() {
        signup.modal.hide();
        app.modLogin.modal.show();
    });
    
    // Public modules
    $.extend({modSignup: signup}, app);
    
}(Mootor));