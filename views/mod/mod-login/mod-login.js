/*
 * Login module
 */

(function($) {

    "use strict";
    
    var app = $("main").app(),
        Login,
        login;
                
    var Login = function() {
        this.$username = $("#mod-login-username");
        this.$password = $("#mod-login-password");
        return this;
    }
    
    Login.prototype = {
    
        modal: app.modModal({html: $['mod-login'].html}),
        
        send: function() {
            this.result = app.models.User.auth({
                username: this.$username[0].value,
                password: this.$password[0].value,
            });
            this._delayedSuccess = true;
            this.$username[0].blur();
            this.$password[0].blur();
            return this;
        },
        
        clear: function() {
            this.$username[0].value = "";
            this.$password[0].value = "";
        },
        
        focus: function() {
              this.$username[0].focus();
        },
        
        blur: function() {            
            this.$username[0].blur();
            this.$password[0].blur();
        },
        
        success: function(callback) {
            this._success = callback;
            if (this._delayedSuccess === true) {
                this._success();
            }
        }
    }
                
    login = new Login();
    
    $("#mod-login-cancel").onTapEnd(function() {
        login.blur();
        login.modal.hide();
    });

    $("#mod-login-send").onTapEnd(function() {
        login.send().success(function() {
            login.modal.hide();
            login.onSend(this.result);     
        });
    });

    $("#mod-login-signup").onTapEnd(function() {
        login.modal.hide();
        login.blur();
        app.modSignup.modal.show();
        app.modSignup.focus();
    });
    
    // Public modules
    $.extend({modLogin: login}, app);
    
}(Mootor));