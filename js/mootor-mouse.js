/*
 * Mouse support
 */ 
 
(function($) {

    $(document).ready(function() {
    
       "use strict";    
       
       var scrollBars = false;
       
       if(document.body.ontouchmove === undefined) {
       
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
           
           $.prototype.onDragStart = function(callback){};
           $.prototype.onDragEnd = function(callback){};
           $.prototype.onDragMove = function(callback){};

           scrollBars = true;
       
       }
       
       /*
        * Styles
        */
       if (scrollBars === true) {
            $("#main")[0].style.overflow = "auto";
       }
       
    });
    
}(window.Mootor))
