/*
 * Sidebar
 */

(function($) {

    "use strict";
    
    var app = $("main").app(),
        $nav = $("#main"),
        nav = $nav.nav(),
        navCurrent = nav.items[nav.current],
        Sidebar,
        sidebar;
    
    Sidebar = function(options) {
        options = options === undefined ? {} : options;
        Sidebar.initHTML(this, options);
        Sidebar.setTouchEvents(this);
        return this;
    }
    
    $.extend({
        x: 0,
        initHTML: function(self, options) {
            var el,
                className;
            
            el = document.createElement("div");
            className = options.className === undefined ? "mod-sidebar" : options.className;
            document.body.insertBefore(el, document.body.firstChild);
            self.el = el;
            self.$el = $(el);
            self.$el.setClass(className);
            if (options.html) {
                self.$el.html(options.html);
            }
        },
        setTouchEvents: function(self) {
        }
    }, Sidebar);
    
    Sidebar.prototype = {
        html: function(html) {
            this.$el.html(html);
        }
    }
    
    sidebar = new Sidebar({html: $['mod-sidebar'].html});
        
    $.extend({modSidebar: sidebar}, app);  
    
    var navX = 0;
    
    $(navCurrent.el).onDragMove(function(gesture) {
        var maxdist = $.view.clientW/2,
            x;
            
        x = navX + (gesture.x - gesture.lastX);
        
        $nav.translate({x:x,y:0});

        if (x < 0) {
            navCurrent.movable = true;
            $nav.translate({x:0,y:0});
            navX = 0;            
        } else if (x > maxdist) {
            navCurrent.movable = true;
            $nav.translate({x:maxdist,y:0});
            navX = maxdist;            
        } else {
            navCurrent.movable = false;
            navX = x;                        
        }       
        
    });

}(Mootor));