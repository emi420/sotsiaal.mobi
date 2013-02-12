/*
 * Sidebar module
 */

(function($) {

    "use strict";
    
    var app = $("main").app(),
        sidebar,
        Sidebar;
                
    var Sidebar = function() {
        return this;
    }
    
    Sidebar.prototype = {
    
    }
                
    sidebar = new Sidebar();
    
    // Public modules
    $.extend({modSidebar: sidebar}, app);
    
}(Mootor));