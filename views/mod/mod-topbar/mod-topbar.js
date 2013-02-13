(function($) {

    "use strict";
    
    var app = $("main").app();
    
    var $topbar = $("#index-mod-topbar"),
        $modTopbarNow = $("#mod-topbar-now"),
        $modTopbar7d = $("#mod-topbar-7d"),
        $modTopbar30d = $("#mod-topbar-30d"),
        $modTopbar365d = $("#mod-topbar-365d"),
        $modTopbarEver = $("#mod-topbar-ever");

    $modTopbarNow.onTapEnd(function() {
        app.modStoryList.updateBindings(
            app.models.Story.getPopularByDateNow()
        )
    });

    $modTopbar7d.onTapEnd(function() {
        app.modStoryList.updateBindings(
            app.models.Story.getPopularByDate7d()
        )
    });
    
}(Mootor));