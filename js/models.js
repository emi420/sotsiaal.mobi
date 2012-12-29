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
           this.comments =      options.comments;
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
       
       app.models.Story._get = app.models.Story.get;       
       app.models.Story.get = function(index) {
           var story;
           story = this._get(index);
           if (story) {
              story.user = app.models.User.get(story.user);
              story.category = app.models.Category.get(story.category);
           }
           return story;
       }       
       
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
       
       // User
       
       User = function(options) {
       
           this.id =        options.id;
           this.username =  options.username;           
           this.email =     options.email;           
  
           return this;
       }; 
       
       app.models.User = app.Model({ 
            model: User, 
            localStoragePrefix: "sotsiaal-user"
       });
       
              
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
