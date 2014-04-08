(function($) {

    var app = m.app,
        $modStoryCreateTitle = $("#mod-story-create-title"),
        $modStoryCreateTextarea = $("#mod-story-create-textarea"),
        story = {};
    
    // TODO: categories
    var category = app.models.Category.get(1);

    m.app.view("story-create").on("load", function(self) {
        
        story = app.models.Story.create({
            title:          "",
            description:    "",
            user:           app.models.User.getCurrent(),
            picture:        "",
            date:           "a moment",
            pop:            0,
            category:       1
        });
        
        self.ui.panel.on("transitionEnd", function() {
            $modStoryCreateTitle.focus();
        });

    });
    
    $("#button-create-story").on("tap", function() {

        story.title = $modStoryCreateTitle[0].value;
        story.description = $modStoryCreateTextarea[0].value;
        story.save();
        
        // FIXME CHECK
        story = app.models.Story.loadForeign(story);
        
        app.go("#story/" + story.id);
    });

    /*
     * Story w/ picture
     */

   /* var camera = $("#mod-story-create-picture").ui({
        type: "Camera"
    });    
    camera.onSuccess(function(imageURI) {
        $(this.input).setClass("mod-story-create-picture-active");
        this.hide();
        story.picture = imageURI;
    });*/
    
    
}(window.$));