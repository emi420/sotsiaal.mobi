/*
 * Category
 */
 
(function($) {

    "use strict";
    
    var app = m.app,
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
            category = app.models.observableArray([]);
            app.models.Category.getAll().success(   
                function(result) {
                    var i;
                    for (i = 0; i < result.length; i++) {
                        category.push(result[i]);
                    }
                    console.log(category);
                    console.log(element);
                    m.app.models.applyBindings(
                        {category: category},
                        element
                    )
                }
            );
        },    

        handlers: {
            go: function(category) {
                if (m.app.view().id !== "category") {
                    app.data.set("currentCategory", category);
                    app.go("#/category/" + category.id);                 
                } else {
                    /*app.get("category").storyList.updateBindings(
                        app.models.Story.filter({
                            category: category
                        })
                    );
                    app.models.applyBindings(
                        {"categoryTitle": category.title},
                        $("#mod-category-title")[0]
                    );*/
                }
            },
        },
    }
    
    /*
     * Initialize module
     */
    category = new Category();
    
    // Go public
    $.extend(m.app._mod.Category, Category.prototype);
    


}(window.Zepto));