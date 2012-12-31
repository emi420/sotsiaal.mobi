(function($) {

    "use strict";

    var app = $("main").app(),
        modStoryList,
        modStory;
        
    modStoryList = {
        
        init: function() {
        
            var storyList = app.models.Story.all(),
                story,
                user,
                category;
                
                // TMP: Create sample data

                if (storyList.length < 2) {                
                    user = app.models.User.create({
                        username: "emi420",
                        email: "emi420@gmail.com",
                        picture: "img/default/_temp/avatar.png"
                    });
                    user.save();

                    category = app.models.Category.create({
                        title: "test",
                    });
                    category.save();

                    story = app.models.Story.create({
                        title: "This is my story",
                        pop: 0,
                        date: "2d",
                        comments: 2,
                        description: "Lorem ipsum dolor amet, yes.",
                        user: user,
                        category: category,
                    });
                    story.save();

                    story = app.models.Story.create({
                        title: "This is my story 2",
                        pop: 3,
                        date: "3m",
                        comments: 10,
                        description: "Lorem ipsum dolor amet, yes.",
                        user: user,
                        category: category,
                    });
                    story.save();
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
            var story = app.data.set(
                "story", 
                app.models.Story.all()
            );
            
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
 
        },
                    
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
    
    // FIXME CHECK
    $._modContinue();
            
}(Mootor));