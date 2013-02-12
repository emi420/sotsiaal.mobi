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
        return this;
    }
    
    $.extend({
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
    }, Sidebar);
    
    Sidebar.prototype = {
        x: 0,
        show: function() {
            this.$el.show();
        },
        hide: function() {
            this.$el.hide();
        },
        html: function(html) {
            this.$el.html(html);
        }
    }
    
    sidebar = new Sidebar({html: $['mod-sidebar'].html});
        
    $.extend({modSidebar: sidebar}, app);  
    
    var navX = 0,
        navY = 0;
    
    $(navCurrent.el).onDragStart(function(gesture) {

        if (gesture.distanceFromOriginX > 10 || gesture.distanceFromOriginX < -10) {
            sidebar.show();
            navCurrent.movable = false;
        } else {
            navCurrent.movable = true;
        }

    })
    
    $(navCurrent.el).onDragMove(function(gesture) {
        var maxdist = $.view.clientW/2,
            x;
        
        if (navCurrent.movable === false) {
            x = navX + (gesture.x - gesture.lastX);
            $nav.translate({x:x,y:0});
    
            if (x < 0) {
                $nav.translate({x:0,y:0});
                sidebar.hide();            
                navX = 0;            
            } else if (x > maxdist) {
                $nav.translate({x:maxdist,y:0});
                navX = maxdist;            
            } else {
                navX = x;                        
            }                               
        }
        
    });
    
    $(navCurrent.el).onDragEnd(function(gesture) {
        navCurrent.movable = true;
    });


}(Mootor));