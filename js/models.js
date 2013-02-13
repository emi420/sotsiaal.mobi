(function($) {

    $(document).ready(function() {
    
      "use strict";
       
       var app = $("main").app(),
           Model,
           ViewModel,
           Story,
           User,
           Category;

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
       
       $.extend({
            getAll: function(options) {
                var result;
    
                // TODO: Get from API
                result = app.models.Story.all();
                this._delayedSuccess = true;
                this.cache = result;
                return this;
            },
            
            success: function(callback) {
                this._success = callback;
                if (this._delayedSuccess === true) {
                    this._success(this.cache);
                }          
            },
            
            getPopularByDateNow: function() {
                return app.models.Story.all();
            },
            getPopularByDate7d: function() {
                return [app.models.Story.get(1)];
            }
       
       }, app.models.Story)

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

       $.extend({

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
       
       }, app.models.Category)
       
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
       
       $.extend({
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
       }, app.models.User);
       
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
      
       $.extend({
            _filter: app.models.Comment.filter,

            filter: function(options) {
                var result;
    
                // TODO: Get from API
                result = app.models.Comment._filter(options);
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
       
       }, app.models.Comment)
                     
       /*
        * View model & data binding
        */        
    
       ViewModel = function(options) {
           this[options.model] = options.data;
           $.extend(options.handlers, this);
       };
    
       $.extend({
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
                        data: app.data.set(
                           model,
                           data[model]
                        ),
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
           
           applyBindings: function(values, viewModel) {
               return ko.applyBindings(values, viewModel);
           },
           
           sort: function(left, right) {
               
               return left.order == right.order ? 
                               0 : (left.order < right.order ?
                              -1 : 1)
           }
           
       }, app.models);
          
   });
   
   
}(Mootor));
