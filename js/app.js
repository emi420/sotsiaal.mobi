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
         * Modules
         */
         
         
       $.extend({
            modStoryList: {},
            modTopbar: {},
       }, $);
       
       // FIXME CHECK
       var loadModules = function(callback) {
        
            $._modContinue = callback;
            
            var i,
                modules,
                loadModule;
            
            modules = [
                {
                    name: "mod-topbar",
                },
                {
                    name: "mod-story-list",
                    js: false
                },
                {
                    name: "mod-story",
                    html: false
                },
            ]
            
            loadModule = function(module) {
            
                if (module.js !== false) {
                    callback = function() {
                        $.require("views/mod/" +  module.name + "/" + module.name + ".js")
                    }
                }
 
                if (module.html !== false) {
                    $.ajax({
                        url: "views/mod/" +  module.name + "/" + module.name + ".html",
                        callback: function(response) {
                            if ($[module.name] === undefined) {
                                $[module.name] = {};
                            }
                            $[module.name].html = response;
                            callback();
                        }
                    });
                    
                } else {
                    callback();
                }
 
            }
            
            for (i = 0; i < modules.length; i++) {
                if (modules[i])
                loadModule(modules[i])
            }

        }
        
        loadModules(function() {
        
           // Preload all views
           for (i = views.length; i--;) {
               app.preload(views[i]);   
           }

        });


   });
   
}(Mootor));



