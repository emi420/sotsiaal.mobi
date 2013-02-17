(function($) {

    "use strict";

    var app = $("main").app(),
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
    
        el: {},
        
        /*
         * Bind data
         */         
        bindData: function(element) {
            var currentStory = app.data.get("currentStory");
            
            this.el = element;

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

        loadForeign: function(data) {
            data.commentsCount = app.models.Comment.filter({
                story: data
            }).length;
            data.category = app.models.Category.get(data.category);
            data.user = app.models.User.get(data.user);            
            return data;
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
        
        init: function() {
        
            var story,
                user,
                comment,
                category1,
                category2,
                i;
                
                /*** SAMPLE DATA ***/
                if (app.models.Story.count() < 2) {                
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
                        story = app.models.Story.create({
                            title: "This is my story, my story number " + i,
                            pop: i,
                            date: "2d",
                            picture: "img/tmp/story.jpg",
                            commentsCount: 2,
                            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                            user: user,
                            category: category1,
                        });
                        story.save();
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

                }
            
        },
        
        handlers: {
            go: function(story) {
                app.data.set("currentStory", story);
                app.go("story");
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
            // FIXME CHECK
            $.extend({
                showList: function() {return "visible"},
                showEmptyMsg: function() {return ""},
            }, data);

            this.el = element;
            this.data = app.models.observableArray(data);
            this.viewModel = {story: this.data};
            app.models.bind(
                this.viewModel,
                element,
                {
                    go: this.handlers.go
                }
            );
        },
                                    
    }
    
    $.extend({
        list: function() {
            //console.log(this);
            return modStoryList(this);
        }   
    }, ModStory.prototype)
    
    // Public modules
    $.extend({
        modStory: modStory
    }, app);

    
    /*
     * modVote connector
     * FIXME CHECK: move to story view?
     */     
    $("#story-mod-pop").onTapEnd(function() {
        app.modVote.send({
            value: 1
        }).success(function() {
            var story = app.data.get("currentStory"),
                user = story.user,
                category = story.category;
                
            story.pop += 1;
            // FIXME CHECK: put?
            //debugger;
            story.user = user.id;
            story.category = category.id;
            story.put()
            story.user = user;
            story.category = category;
            modStory.bindData(
                modStory.el
            );
        });
    });
            
}(Mootor));