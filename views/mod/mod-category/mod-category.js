/*
 * Category
 */
 
(function($) {

    "use strict";
    
    var app = $("main").app(),
        nav = $("#main").nav(),
        Category,
        category;
        
    /*
     * Category
     */
             
    var Category = function() {
        return this;
    }
    
    Category.prototype = {
    
        bindData: function(element) {
            app.models.Category.getAll().success(   
                function(result) {
                    app.models.bind(
                        {category: result},
                        element[0],
                        {
                            go: category.handlers.go
                        }
                    );
                }
            );            
        },    

        handlers: {
            go: function(category) {
                app.data.set("currentCategory", category);
                if (nav.items[nav.current].id !== "category") {
                    app.go("category");                 
                } else {
                    // FIXME CHECK
                    app.modStoryList.updateBindings(
                        app.models.Story.filter({
                            category: category
                        })
                    );
                    app.models.applyBindings(
                        {"categoryTitle": category.title},
                        $("#mod-category-title")[0]
                    );
                }
            },
        },
    }
    
    /*
     * Initialize module
     */
    category = new Category();
    // Go public
    $.extend({modCategory: category}, app);    


}(Mootor));