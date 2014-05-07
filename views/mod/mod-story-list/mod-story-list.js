(function($) {
    
    "use strict";

    var app = m.app,
        modStoryList,
        ModStoryList,
        storyList;
    
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
            
            // FIXME CHECK:
            // TODO: support multiple instances of modules
            
            console.log("now");
            /*for (i = 0; i < data.length; i++) {
                this.data.push(data[i]);
            };*/
        },        
                
        /*
         * Bind
         */         
        bindData: function(element, data) {
            this.data = ko.observableArray(data);;

            console.log(this);

            this.data.showEmptyMsg = "";
            this.data.showList = "visible";
            ko.cleanNode(element)
            m.app.models.bind(
                {story: this.data},
                element,
                this.handlers
            )

        },
                                    
    }
    
    m.app.on("ready", function() {
       var story = m.app.models.Story.get(1);
       if (story === null) {
           m.app._mod.StoryList.sampleData();
       }
    });
    
    
    $.extend(m.app._mod.StoryList, ModStoryList.prototype);

}(window.Zepto));