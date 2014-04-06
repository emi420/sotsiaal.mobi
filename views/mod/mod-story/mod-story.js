(function($) {

    "use strict";

    var app = m.app,
        modStoryList,
        ModStoryList,
        modStory,
        ModStory,
        story,
        storyList;

    
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

    modStoryList = function(modStory) {
        return new ModStoryList(modStory);
    }
    
    ModStoryList = function(modStory) {
        this.modStory = modStory;
        return this;
    }
    
    ModStoryList.prototype = {
        
        el: {},
        
        sampleData: function() {
        
            var story,
                user,
                comment,
                category1,
                category2,
                i;
                
                /*** SAMPLE DATA ***/
                user = app.models.User.create({
                    nickname: "emi420",
                    avatar: "img/tmp/avatar.jpg"
                });
                user.save();

                category1 = app.models.Category.create({
                    title: "Misc",
                });
                category1.save();
                category2 = app.models.Category.create({
                    title: "Etc",
                });
                category2.save();


                for (i = 0; i < 5; i++) {
                   try{ story = app.models.Story.create({
                        title: "This is my story, my story number " + i,
                        pop: i,
                        date: "2d",
                        picture: "img/tmp/story.jpg",
                        commentsCount: 2,
                        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        user: user,
                        category: category1,
                    });
                    story.save();} catch(e) {debugger;}
                }

                story = app.models.Story.create({
                    title: "This is my story, my story number " + i,
                    pop: 0,
                    date: "2d",
                    picture: "img/tmp/story.jpg",
                    commentsCount: 2,
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    user: user,
                    category: category2,
                });
                story.save();

                comment = app.models.Comment.create({
                    text: "This is a comment",
                    user: user,
                    date: "2h ago",
                    pop: "14",
                    story: story
                });
                comment.save();             
        },
        
        handlers: {
            go: function(story) {
                app.go("#story/" + story.id);
            },
        },

        /*
         * Update
         */         
        updateBindings: function(data) {
            var i;
            this.data.removeAll();
            for (i = 0; i < data.length; i++) {
                this.data.push(data[i]);
            };
        },        
                
        /*
         * Bind
         */         
        bindData: function(element, data) {

            var stories = ko.observableArray(data);
            this.data = stories;
            stories.showEmptyMsg = "";
            stories.showList = "visible";
            
            m.app.models.bind(
                {story: stories},
                $("#index-mod-story-list")[0],
                this.handlers
            )

        },
                                    
    }
    
    
    $.extend(m.app._mod.StoryList, ModStoryList.prototype);
    $.extend(m.app._mod.Story, ModStory.prototype);
    
}(window.Zepto));