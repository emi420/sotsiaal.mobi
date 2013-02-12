/*
 * Category
 */
 
(function($) {

    "use strict";
    
    var app = $("main").app(),
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
                app.go("category");
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