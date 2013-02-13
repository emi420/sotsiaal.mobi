/*
 * MyAccount module
 */

(function($) {

    "use strict";
    
    var app = $("main").app(),
        myAccount,
        MyAccount;
                
    var MyAccount = function() {
        this.$username = $("#mod-my-account-username");
        this.$email = $("#mod-my-account-email");
        this.$password = $("#mod-my-account-password");
        return this;
    }
    
    MyAccount.prototype = {
    
        modal: app.modModal({html: $['mod-my-account'].html}),
        
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

        blur: function() {
            this.$email[0].blur();
            this.$username[0].blur();
            this.$password[0].blur();
        },
        
        success: function(callback) {
            this._success = callback;
            if (this._delayedSuccess === true) {
                this._success();
            }
        },
        
        onLoad: function() {
            var user = app.models.User.getCurrent();
            if (user !== undefined) {
                this.$email[0].value = user.email;
                this.$username[0].value = user.nickname;
                this.$password[0].value = "";                                        
            } else {
                app.modMyAccount.modal.hide();
                app.modLogin.modal.show();
                app.modLogin.focus();
                app.modLogin.onSend = function() {
                    app.modMyAccount.modal.show();
                    app.modMyAccount.focus();
                    app.modMyAccount.onLoad();
                }
            }
        }
    }
                
    myAccount = new MyAccount();
    
    $("#mod-my-account-cancel").onTapEnd(function() {
        myAccount.blur();
        myAccount.modal.hide();
    });

    $("#mod-my-account-send").onTapEnd(function() {
        myAccount.send().success(function() {
            myAccount.modal.hide();
        });
    });
    
    // Public modules
    $.extend({modMyAccount: myAccount}, app);
    
}(Mootor));