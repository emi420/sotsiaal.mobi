/*
 * Modal
 */

(function($) {

    "use strict";
    
    var app = $("main").app(),
        Modal,
        modModal;
    
    Modal = function(options) {
        var el,
            className;
            
        options = options === undefined ? {} : options;
        el = document.createElement("div");
        className = options.className === undefined ? "mod-modal" : options.className;
        document.body.appendChild(el);
        this.el = el;
        this.$el = $(el);
        this.$el.setClass(className);
        if (options.html) {
            this.$el.html(options.html);
        }
        return this;
    }
    
    Modal.prototype = {
        html: function(html) {
            this.$el.html(html);
        },
        show: function() {
            this.$el.show();
        },
        hide: function() {
            this.$el.hide();            
        },
    }
    
    modModal = function(options) {
        return new Modal(options);
    }
    
    $.extend({modModal: modModal}, app);    

}(Mootor));