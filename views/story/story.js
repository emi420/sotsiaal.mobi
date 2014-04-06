(function($) {
    
    "use strict";

    var app = m.app,
        $storyMod = $("#story-mod"),
        $storyModComments = $("#story-mod-comments"),
        modComments = m.app._mod.Comments,
        modStory = m.app._mod.Story;
        
    m.app.view("story").on("load", function(self) {
        // Get story
        var story  = m.app.models.Story.get(self.params[0]); 
        app.data.set("currentStory", story);
        ko.cleanNode($storyMod[0]);
        modStory.applyBindings(
            story,
            $storyMod[0]
        );
        m.app._mod.Comments.bindData();
    });

    m.app.view("story").on("ready", function(self) {
        
        // Comments module
        m.app._mod.Comments.on("ready", function(self) {
            $("#story-mod-comments").html(self.html);
            Mootor._Comments.init();
            m.app._mod.Reply.init();
        });
        
    });
    
/*    $("#story-mod-pop").onTapEnd(function() {

        app.modLogin.authRequired(
            function() {

                app.modVote.send({
                    value: 1
                }).success(function() {
                    var story = app.data.get("currentStory");
                    story.pop += 1;
                    story.put();
                    view.modStory.bindData(view.modStory.el);
                });

            }
        );

    });
*/
    
}(window.Zepto));