(function($) {
    
    "use strict";       

    $(document).ready(function() {

       var nav = {},
           app = {},
           $mainDiv,
           viewDiv,
           views,
           viewId,
           appId = "main",
           i;
           
       console.log("Ready! making app...");
           
         
       /*
        * Views
        */
        
       views = [
            "story",
            "index",                
       ]

       /*
       "story-create",
       "story-list",
       "user",
       "user-edit",
       */
       
       $mainDiv = $("#" + appId);
       for (i = views.length; i--;) {
            viewDiv = document.createElement("div");
            viewDiv.setAttribute("class","moo-panel");
            viewDiv.setAttribute("id",views[i]);
            $mainDiv.el.appendChild(viewDiv);
       }
                      
       /*
        * Navigation init
        */        
       nav = $mainDiv.nav();             
       nav.header.navLinks = $(nav.header.el).find(".moo-nav");      

       /*
        * Create App
        */
       app = $.app({
           id: appId,
           path: "views",
           views: views,
           nav: nav
       });
       
       /*
        * Settings
        */
        
       app.settings = {
           debug: true
       };

       $.extend({
           /*
            * Pre-load views
            */   
           preload: function(id, options) {
                var view = app.get(id),
                    navInstance = nav.get(id);
                
                app.load(
                     view,
                     navInstance
                );              
           },
           /*
            * Go to view (load nav / app view)
            */   
           go: function(id, options) {
                if (options !== undefined) {
                    if (options.direction !== undefined) {
                        nav._config.direction = options.direction;                                        
                    } else {
                        nav._config.direction = 0;                                        
                    }
                } else {
                    nav._config.direction = 0;                    
                }
                nav.set(id);
           },
           /*
            * Preload and go to view
            */   
           preloadAndGo : function(id, options) {
               app.preload(id);
               app.go(id);
           }
           
       }, app);

       
       /*
        * App controllers
        */
        
       /*
        *
        * Example:
        *
        * $("#mybutton").onTapEnd(function() {
        *   alert("hello!");
        * });
        */       


        /*
         * Modules
         */
         
         
       $.extend({
            modStoryList: {},
            modTopbar: {},
       }, $);
       
       var loadModules = function(callback) {
        
            $._modContinue = callback;

            // Load 'topbar' module
            $.ajax({
                url: "views/mod/mod-topbar/mod-topbar.html",
                callback: function(response) {

                    $.modTopbar.html = response;

                    $.ajax({
                        url: "views/mod/mod-story-list/mod-story-list.html",
                        callback: function(response) {

                            $.modStoryList.html = response;
    
                            $.require(
                                "views/mod/mod-topbar/mod-topbar.js",
                                function() {
                                    $.require(
                                        "views/mod/mod-story-list/mod-story-list.js"
                                    );                                
                                }
                            );
                        }
                   });

                }
            });

        }
        
        loadModules(function() {
        
           // Preload all views
           for (i = views.length; i--;) {
               app.preload(views[i]);      
           }

        });
       
       /*
        * Initialization
        */

   });
   
}(Mootor));



