(function($) {

    "use strict";

    var app = $("main").app(),
        modStoryList,
        modStory,
        story;

    modStoryList = {
        
        init: function() {
        
            var storyList = app.models.Story._all(),
                story,
                user,
                comment,
                category,
                i;
                
                /*** SAMPLE DATA ***/
                if (storyList.length < 2) {                
                    user = app.models.User.create({
                        nickname: "emi420",
                        avatar: "img/tmp/avatar.jpg"
                    });
                    user.save();

                    category = app.models.Category.create({
                        title: "test",
                    });
                    category.save();

                    for (i = 0; i < 5; i++) {
                        story = app.models.Story.create({
                            title: "This is my story, my story number " + i,
                            pop: 0,
                            date: "2d",
                            picture: "img/tmp/story.jpg",
                            commentsCount: 2,
                            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                            user: user,
                            category: category,
                        });
                        story.save();
                    }

                    comment = app.models.Comment.create({
                        text: "This is a comment",
                        user: user,
                        date: "2h ago",
                        pop: "14",
                        story: story
                    });
                    comment.save();

                }
            
        },
        
        onLoadView: function() {
            app.data.get("story").sort(app.models.sort);
        },
        
        handlers: {
            go: function(story) {
                app.data.set("currentStory", story);
                app.go("story");
            },
        },
        
        /*
         * Bind data
         */         
        bindData: function(element) {
            var view = this;
            app.models.Story.all().success(
                function(result) {
                    view.showStoryList(element, result);
                }
            );
        },
        
        showStoryList: function(element, story) {
            var i;

            for (i = story.length; i--;) {
                story[i].commentsCount = app.models.Comment.filter({
                    story: story[i]
                }).length;
                story[i].category = app.models.Category.get(story[i].category);
                story[i].user = app.models.User.get(story[i].user);
            }
            
            $.extend({
                showEmptyMsg:function() {
                    if (this.length === 0) {
                        return "visible";
                    } else {
                        return "";
                    }
                },    
                showList: function() {
                    if (this.length === 0) {
                        return "";
                    } else {
                        return "visible";
                    }
                }
            }, story);
            
            app.models.bind(
                 {"story": app.models.observableArray(story)},
                 element,
                 {
                    go: modStoryList.handlers.go,
                 }
            );
            
        }
                    
    }
    
    // Initialize story-list
    modStoryList.init()

    modStory = {
        /*
         * Bind data
         */         
        bindData: function(element) {
            var currentStory = app.data.get("currentStory");

            if (currentStory === undefined) {
                currentStory = app.models.Story.create({});
            }

            app.models.applyBindings(
                { 
                    story: currentStory 
                },
                element
            );
        },
    }
    
    // Public modules
    $.extend({modStoryList: modStoryList}, app);
    $.extend({modStory: modStory}, app);
            
}(Mootor));