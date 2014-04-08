(function($) {

    $(document).ready(function() {
    
      "use strict";
       
       var app = m.app,
           Model,
           ViewModel,
           Story,
           User,
           Vote,
           Category,
           _data = {};
           
           
       $.extend(m.app, {
           data: {
               set: function(key, value) {
                   if (value !== undefined) {
                        _data[key] = value;
                   }
               }, 
               
               get: function(key) {
                   return _data[key];
               }
           }
       });
            

       /*
        * Models
        */        

       // Story
       
       Story = function(options) {
       
           this.id =            options.id;
           this.title =         options.title;           
           this.pop =           options.pop;           
           this.order =         options.order;           
           this.date =          options.date;
           this.commentsCount = options.commentsCount;
           this.picture =       options.picture;
           this.description =   options.description;
           this.user =          options.user;
           this.category =      options.category;
  
           return this;
       }; 
       
       app.models.Story = app.Model({ 
            model: Story, 
            localStoragePrefix: "sotsiaal-story"
       });

       /* 
        * Custom methods
        */
        
       // .all()
       
       $.extend(app.models.Story, {
           
            getAll: function(options) {
                var result;
    
                // TODO: Get from API
                result = app.models.Story.all();
                result = this.loadForeign(result);
                this._delayedSuccess = true;
                this.cache = result;
                return this;
            },
            
            getWithForeign: function(id) {
                var result = app.models.Story.get(id);
                result = this.loadForeign(result);
                return result;
            },
            
            success: function(callback) {
                this._success = callback;
                if (this._delayedSuccess === true) {
                    this._success(this.cache);
                }          
            },
            
            getPopularByDateNow: function() {
                // FIXME CHECK (sample data)
                var result = app.models.Story.all();
                result = this.loadForeign(result);
                return result;
            },
            getPopularByDate7d: function() {
                // FIXME CHECK (sample data)
                var result = [app.models.Story.get(1)];
                result = this.loadForeign(result);
                return result;
            },

            loadForeign: function(data) {
               
                var i,
                    item,
                    isArray = true;
                    
                if ($.isArray(data) === false) {
                    data = [data];
                    isArray = false;
                }
                for (i = data.length; i--;) {
                    item = data[i];
                    item.commentsCount = app.models.Comment.countForStory(
                        item.id
                    );
                    
                    if (typeof item.category !== "object") {
                        item.category = app.models.Category.get(item.category);
                    }
                    if (typeof item.user !== "object") {
                        item.user = app.models.User.get(item.user);                                
                    }

                }
                
                if (isArray === true) {
                    return data;                
                } else {
                    return data[0];
                }
           },
       
       });
       
       // Vote
       
       Vote = function(options) {
       
           this.id =            options.id;
           this.story =         options.story;           
           this.user =          options.user;
           this.value =         options.value;
  
           return this;
       }; 
       
       app.models.Vote = app.Model({ 
            model: Vote, 
            localStoragePrefix: "sotsiaal-vote"
       });

       // Category
       
       Category = function(options) {
       
           this.id =        options.id;
           this.title =  options.title;           
  
           return this;
       }; 
       
       app.models.Category = app.Model({ 
            model: Category, 
            localStoragePrefix: "sotsiaal-category"
       });

       $.extend(app.models.Category, {

            getAll: function(options) {
                var result;
    
                // TODO: Get from API
                result = app.models.Category.all();
                this._delayedSuccess = true;
                this.cache = result;
                return this;
            },
            
            success: function(callback) {
                this._success = callback;
                if (this._delayedSuccess === true) {
                    this._success(this.cache);
                }          
            }
       
       });
       
       // User
       
       User = function(options) {
       
           this.id =        options.id;
           this.nickname =  options.nickname;      
           this.email =     options.email;     
           this.avatar =    options.avatar;           
  
           return this;
       }; 
       
       app.models.User = app.Model({ 
            model: User, 
            localStoragePrefix: "sotsiaal-user"
       });
       
       $.extend(app.models.User, {
            getCurrent: function() {
                return app.data.get("currentUser");
            },
            auth: function(options) {
                // TODO: API
                var user = app.data.set("currentUser", app.models.User.filter({
                    nickname: options.username
                })[0]);
                if (user !== undefined) {
                    return true
                } else {
                    return false;
                }
            },
            logout: function() {
                app.data.unset("currentUser");
            }
       });
       
       // Sample user
       app.data.set("currentUser",1 );
       
       
       // Comment
       
       Comment = function(options) {
       
           this.id =        options.id;
           this.text =      options.text;           
           this.user =      options.user;           
           this.parent =    options.parent;
           this.story =     options.story;
           this.type =      options.type;
           this.video =     options.video;
           this.map =       options.map;
           this.date =      options.date || "a moment ago";
           this.pop =       options.pop || 0;
           this.picture =   options.picture || "";
  
           return this;
       }; 
       
       app.models.Comment = app.Model({ 
            model: Comment, 
            localStoragePrefix: "sotsiaal-comment"
       });
      
       $.extend(app.models.Comment, {
            _filter: app.models.Comment.filter,

            filter: function(options) {
                var result,
                    i;

                // TODO: Get from API
                result = app.models.Comment._filter(options);

                result = this.loadForeign(result);

                this._delayedSuccess = true;
                this.cache = result;
                return this;
            },



            loadForeign: function(data) {
               
                 var i,
                     item,
                     isArray = true;
                    
                 if ($.isArray(data) === false) {
                     data = [data];
                     isArray = false;
                 }
                 for (i = data.length; i--;) {
                     item = data[i];
                     if (typeof item.user !== "object") {
                         item.user = app.models.User.get(item.user);                                
                     }

                 }
                
                 if (isArray === true) {
                     return data;                
                 } else {
                     return data[0];
                 }
            },            
            success: function(callback) {
                this._success = callback;
                if (this._delayedSuccess === true) {
                    this._success(this.cache);
                }          
            },
            countForStory: function(id) {
                return app.models.Comment._filter({
                    story: id
                }).length;
            }
       
       });
                     
       /*
        * View model & data binding
        */        
    
       ViewModel = function(options) {
           this[options.model] = options.data[options.model];
           $.extend(this, options.handlers);
           
       };
    
       $.extend(app.models, {
            /*
             * Bind data
             */
            bind: function(data, element, handlers) {                        
                var i,
                    model;
                                
                if (handlers === undefined) {
                    handlers = {};
                }
                
                // FIXME CHECK    
                for (i in data) {
                    model = i;
                }
                
                
                ko.applyBindings(
                    new ViewModel({
                        model: model,
                        data: data,
                        handlers: handlers
                    }),
                    element                 
                )
           },
           
           observableArray: function(value) {
               return ko.observableArray(value);
           },
           
           observable: function(value) {
               return ko.observable(value);
           },
           
           applyBindings: function(viewModel, element) {
               ko.cleanNode(element);
               return ko.applyBindings(viewModel, element);
           },
           
           sort: function(left, right) {
               
               return left.order == right.order ? 
                               0 : (left.order < right.order ?
                              -1 : 1)
           }
           
       });
          
   });
   
   
}(window.Zepto));
