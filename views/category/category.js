(function($) {
    
    "use strict";
    
    var app = m.app,
        modStoryList = m.app._mod.StoryList,
        story;
    
    
    // TODO
    /*
     m.app.view("category").on({
         ready: {},
         load: {},
     });
    */
        
    m.app.view("category").on("ready", function(self) {
        
        // Story List module
        modStoryList.on("ready", function(self) {
            // Load html
            $("#category-mod-story-list").html(self.html);
            // Bind data
            modStoryList.bindData($("#category-mod-story-list")[0], []);
        });

    }).on("load", function(self) {
        
        var category = app.models.Category.get(self.params[0]);
        
        // Category title
        app.models.applyBindings(
            {"categoryTitle": category.title},
            $("#mod-category-title")[0]
        );

        // Story list for category
        var stories = app.models.Story.filter({category: category});
        modStoryList.updateBindings(stories)             
    });

}(window.Zepto));

