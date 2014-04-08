(function($) {

    "use strict";
    
    var app,
        Mod;

    // Routes

    app = m.app({
        views: ["index"]
    }).init();
    
    // Routes
    
    app.route("^$", app.view("index"));
    app.route("^#story/(.*)$", app.view("story"));
    app.route("^#category/(.*)$", app.view("category"));
    app.route("^#create$", app.view("story-create"));
    
    
    /*
     * Modules support
     */
    
    Mod = function(name) {
        var path = 'views/mod/' + name + '/' + name,
            self = this;
            
        this.name = name;
            
        $.get(path + '.html', function(response) {

            self.html = response;
            

            var script = document.createElement("script");
            script.src =  path + '.js';
            script.setAttribute("type", "text/javascript");
            document.head.appendChild(script);
            script.addEventListener("load", function() {
                Mootor.Event.dispatch(name + ":ready", this);
                self._ready = true;
            });
            self.script = script;

            var css = document.createElement("link");
            css.setAttribute("type", "text/css");
            css.setAttribute("rel", "stylesheet");
            css.href =  path + '.css';
            document.head.appendChild(css);
            self.css = css;
            
        });
    }
    
    Mod.prototype = {
        _ready: false,
        html: "",
        css: {},
        script: {},
        on: function(event, callback) {
            Mootor.Event.on(this.name + ":" + event, callback);
            if (this._ready === true) {
                Mootor.Event.dispatch(this.name + ":ready", this);
            }
        }
    }
    

    // Load modules
    
    m.app._mod = {
        Comments: new Mod("mod-comments"),
        Modal: new Mod("mod-modal"),
        Reply: new Mod("mod-reply"),
        Story: new Mod("mod-story"),
        StoryList: new Mod("mod-story-list"),
        Vote: new Mod("mod-vote"),
        Category: new Mod("mod-category"),
        Sidebar: new Mod("mod-sidebar"),
    };
    
    
}(window.Zepto));
