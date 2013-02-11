/*
 * Modal
 */

(function($) {

    "use strict";
    
    var app = $("main").app(),
        Modal,
        modModal;
    
    Modal = function(options) {
        options = options === undefined ? {} : options;
        Modal.initHTML(this, options);
        Modal.setTouchEvents(this);
        return this;
    }
    
    $.extend({
        initHTML: function(self, options) {
            var el,
                className;
            
            el = document.createElement("div");
            className = options.className === undefined ? "mod-modal" : options.className;
            document.body.appendChild(el);
            self.el = el;
            self.$el = $(el);
            self.$el.setClass(className);
            if (options.html) {
                self.$el.html(options.html);
            }
            self.$el.hide();   
            self.overlay = $.ui.overlay();
        },
        setTouchEvents: function(self) {
            $(self.overlay.el).onTapEnd(function() {
                self.hide();
            });
        }
    }, Modal);
    
    Modal.prototype = {
        html: function(html) {
            this.$el.html(html);
        },
        show: function() {
            this.overlay.show();
            this.$el.show();
        },
        hide: function() {
            this.overlay.hide();
            this.$el.hide();            
        },
    }
    
    modModal = function(options) {
        return new Modal(options);
    }
    
    $.extend({modModal: modModal}, app);    

}(Mootor));