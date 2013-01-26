(function($) {

    var nav = $("#main").nav(),
        app = $("main").app(),
        view = nav.get("story"),
        $storyMod = $("#story-mod"),
        $storyModComments = $("#story-mod-comments"),
        $navSearch = $(nav.header.navLinks.navSearch);
        
    
    $.extend({
        
        init: function() {
            // Set onLoad callbacks
            $storyModComments.html($["mod-comments"].html);
        },
        
        onLoad: function() {
            $navSearch.hide();            
            app.modStory.bindData($storyMod[0]);
            app.modComments.bindData();
        },
                    
    }, view);
    
    // Initialize view
    view.init()
    
}(Mootor));