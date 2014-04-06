/*
 * Sidebar
 */

(function($) {

    "use strict";
    
    var app = m.app,
        Sidebar,
        sidebar;
    
    Sidebar = function(options) {
        Sidebar.init(options, this);
    }
    
    $.extend(Sidebar, {
        
        init: function(self) {
            Sidebar.initHTML(self);
        },
        
        initHTML: function(self) {
            var el,
                className;
            
            el = document.createElement("div");
            className = "mod-sidebar";
            document.body.insertBefore(el, document.body.firstChild);
            self.el = el;
            self.$el = $(el);
            self.$el.addClass(className);
            self.hide();
        },
    });
    
    Sidebar.prototype = {
        show: function() {
            this.$el.show();
        },
        hide: function() {
            this.$el.hide();
        },
        _html: function(html) {
            this.$el.html(html);
        }
    }
    
    
    Mootor._Sidebar = Sidebar;
    
    var distX = 0,
        lastX;
        
    app.on("ready", function(self) {

        app.ui.$el.on("touchstart", function(e) {
            lastX = e.touches[0].clientX;
        })
    
        app.ui.$el.on("touchmove", function(e) {
            distX += e.touches[0].clientX - lastX;
            lastX = e.touches[0].clientX;
            app.ui.$el.css("-webkit-transform", "translateX(" + distX + "px);")
        });
        
        app.ui.$el.on("touchend", function(e) {
            if (distX < m.context.viewport.width/2) {
                distX = 0;
                app.ui.$el.css("-webkit-transform", "translateX(" + distX + ");")
                sidebar.hide();
            } else {
                distX = m.context.viewport.width - 100;
                app.ui.$el.css("-webkit-transform", "translateX(" + distX + "px);")
                sidebar.show();
            }
        });
        
        
    });
    
    
    $.extend(m.app._mod.Sidebar, Sidebar.prototype);
    sidebar = m.app._mod.Sidebar;

    m.app._mod.Sidebar.on("ready", function(self) {
        Sidebar.init(m.app._mod.Sidebar);
        m.app._mod.Sidebar.$el.html(m.app._mod.Sidebar.html);
        m.app._mod.Category.on("ready", function() {
            m.app._mod.Category.bindData(
                $("#mod-sidebar-navbar-category")[0]
            );
        });
    });

 
}(window.Zepto));