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
            app.models.Category.all().success(   
                function(category) {
                    app.models.applyBindings(
                        {category: category},
                        element[0]
                    );
                }
            );            
        },    
    }
    
    /*
     * Initialize module
     */
    category = new Category();
    // Go public
    $.extend({modCategory: category}, app);    


}(Mootor));