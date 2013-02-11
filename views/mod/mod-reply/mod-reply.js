/*
 * Reply module
 */

(function($) {

    "use strict";
    
    var app = $("main").app(),
        Reply,
        reply;
                
    var Reply = function() {
        return this;
    }
    
    Reply.prototype = {
        modal: app.modModal({html: $['mod-reply'].html})
    }
                
    reply = new Reply();

    // Public modules
    $.extend({modReply: reply}, app);
    
}(Mootor));