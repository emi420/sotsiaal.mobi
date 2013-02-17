(function($) {

    "use strict";
    
    var app = $("main").app(),
        $topbar = $("#index-mod-topbar"),
        $modTopbarNow = $("#mod-topbar-now"),
        $modTopbar7d = $("#mod-topbar-7d"),
        $modTopbar30d = $("#mod-topbar-30d"),
        $modTopbar365d = $("#mod-topbar-365d"),
        $modTopbarEver = $("#mod-topbar-ever"),
        storyList,
        indexView = app.get("index");
        
    $modTopbarNow.onTapEnd(function() {
        indexView.storyList.updateBindings(
            app.models.Story.getPopularByDateNow()
        )
    });

    $modTopbar7d.onTapEnd(function() {
        indexView.storyList.updateBindings(
            app.models.Story.getPopularByDate7d()
        )
    });
  
    
}(Mootor));