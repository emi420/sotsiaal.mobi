/*
 * Modal
 */

(function($) {

    "use strict";
    
    var app = m.app,
        Modal,
        modModal;
    
    Modal = function(options) {
        Modal.init(options, this);
    }
    
    $.extend(Modal, {
        init: function(options, self) {
            options = options === undefined ? {} : options;
            Modal.initHTML(self, options);
            Modal.setTouchEvents(self);
        },
        initHTML: function(self, options) {
            var el,
                className;
            
            el = document.createElement("div");
            className = options.className === undefined ? "mod-modal" : options.className;
            document.body.appendChild(el);
            self.el = el;
            self.$el = $(el);
            self.$el.addClass(className);
            if (options.html) {
                self.$el.html(options.html);
            }
            self.$el.hide();   
            //self.overlay = $.ui.overlay();
        },
        setTouchEvents: function(self) {
            /*$(self.overlay.el).on("tap ckick")(function() {
                self.hide();
            });*/
        }
    });
    
    Mootor._Modal = Modal;
    
    Modal.prototype = {
        html: function(html) {
            this.$el.html(html);
        },
        show: function() {
            //this.overlay.show();
            this.$el.show();
        },
        hide: function() {
            //this.overlay.hide();
            this.$el.hide();            
        },
    }

    $.extend(m.app._mod.Modal, Modal.prototype);

}(window.Zepto));