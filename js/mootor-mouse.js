/*
 * Mouse support
 */ 
 
(function($) {

    $(document).ready(function() {
    
       "use strict";    
       
       /*
        * Gestures
        */
       var gestures = {
           onTapEnd:    $.prototype.onTapEnd,
           onTapStart:  $.prototype.onTapStart,
       };
     
       $.prototype.onTapEnd = function(callback) {
           this.onTapEnd = gestures.onTapEnd;
           this.onTapEnd(callback);           
           this.el.onclick = function(){return false};
           $(this.el).on("mouseup", function(e) {
                callback({el:this,e:e});
           });
       }

       $.prototype.onTapStart = function(callback) {
           this.onTapStart = gestures.onTapStart;
           this.onTapStart(callback);           
           this.el.onclick = function(){return false};
           $(this.el).on("mousedown", function(e) {
                callback({el:this,e:e});
           });

       }
       
       /*
        * Styles
        */
       $("#main")[0].style.overflow = "auto";
       
    });
    
}(window.Mootor))
