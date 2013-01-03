/*
 * Application utilities
 */ 
 
(function($) {

    $(document).ready(function() {
    
       "use strict";       
     
       var app = $("main").app(),
           nav = $("#main").nav();

       /*
        * Custom bindings (using Knockout.js framework)
        */

       // Tap gestures 
       ko.bindingHandlers.tapStart = {
           init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
               $(element).onTapStart(function() {
                   valueAccessor()(viewModel);           
               });
           }
       }
       ko.bindingHandlers.tapEnd = {
           init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
               $(element).onTapEnd(function() {
                   valueAccessor()(viewModel);           
               });
           }
       }
       ko.bindingHandlers.tapHover = {
           init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
               $(element).onTapStart(function() {
                    $(element).setClass("moo-hover");
               });
               $(element).onTapEnd(function() {
                    $(element).removeClass("moo-hover");
               });
               $(element).onDragEnd(function() {
                    $(element).removeClass("moo-hover");
               });
           }
       }
              
       // UI 
       ko.bindingHandlers.mootorValue = {
            update: function(element, valueAccessor, allBindingsAccessor) {
                // First get the latest data that we're bound to
                var value = valueAccessor(), allBindings = allBindingsAccessor(),
                    ui = app.views[nav.current].ui,
                    uiElement,
                    imgElement,
                    i;

                if (ui !== undefined) {

                    uiElement = ui[element.id];
                    
                    if (uiElement !== undefined) {

                        if (value === undefined) {
                            value = "";
                        }
                    
                        switch(uiElement.type) {
                            case "Select":
                                uiElement.selectByValue(value);                                                    
                                break;
                            case "Date":
                                uiElement.set(value);                                                    
                                break;
                            case "Time":
                                uiElement.set(value);                                                    
                                break;
                            case "Checkbox":
                                uiElement.value = [];                                                   
                                uiElement.unselectAll();                                                   
                                uiElement.selectByValue(value);     
                                break;
                            case "Camera":
                                uiElement.clear();
                                uiElement.hide();
                                uiElement.value = [];
                                for (i = 0; i < value.length; i++) {
                                    imgElement = document.createElement("img");
                                    imgElement.src = value[i];
                                    uiElement.push(imgElement);
                                }
                                break;
                            default:
                                uiElement.el.value = value;                                                    
                                uiElement.value = value;                                                    
                                break;
                        }
                    
                    }
                    
                }
                 
            },
        };
        
       /*
        * Navigation controllers
        */
        
    });
    
}(window.Mootor))
