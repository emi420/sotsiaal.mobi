(function($) {
    
    "use strict";
    
    var app = m.app,
        modStoryList = m.app._mod.StoryList,
        story;
    
    m.app.view("index").on("ready", function(self) {
        
        // Story List module
        modStoryList.on("ready", function(self) {
            $("#index-mod-story-list").html(self.html);
            app.models.Story.getAll().success(
                function(data) {
                    // Bind data
                    modStoryList.bindData($("#index-mod-story-list")[0], data);
                }
            )
        });

    }).on("load", function(self) {
        
        // Get all stories
        app.models.Story.getAll().success(
            function(data) {
                modStoryList.updateBindings(data)             
            }
        );
    });

}(window.Zepto));