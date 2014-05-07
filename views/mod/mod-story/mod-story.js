(function($) {

    "use strict";

    var app = m.app,
        modStory,
        ModStory,
        story;
    
    modStory = function() {
        return new ModStory();
    }
        
    ModStory = function() {
        return this;
    }
    
    ModStory.prototype = {
        
        /*
         * Bind data
         */         
        applyBindings: function(story, element) {
            app.models.applyBindings(
                { story: story },
                element
            );
        },

    }

  
    $.extend(m.app._mod.Story, ModStory.prototype);
    
}(window.Zepto));