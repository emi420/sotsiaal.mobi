(function($) {
    
    "use strict";

    var app = m.app,
        $storyMod = $("#story-mod"),
        $storyModComments = $("#story-mod-comments"),
        modStory = m.app._mod.Story;
        
    m.app.view("story").on("load", function(self) {
        // Get story
        ko.cleanNode($storyMod[0]);
        modStory.applyBindings(
            m.app.models.Story.get(self.params[0]),
            $storyMod[0]
        )
    });


    
/*    $storyModComments.html($["mod-comments"].html);
    app.modComments.bindData();

    $("#story-mod-pop").onTapEnd(function() {

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