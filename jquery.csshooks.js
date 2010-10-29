/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 */
(function($) {
    // padding and margin get hooks
    var dirs = "Top Right Bottom Left".split(" ");
    $.each(["padding", "margin"], function( i, hook ) {
        $.cssHooks[ hook ] = {
            get: function( elem, computed, extra ) {
                return $.map(dirs, function( dir ) {
                    return $.css( elem, hook + dir );
                }).join(" ");
            }
        };
    });
    // backgroundPosition get hook
    var xy = ["X, Y"];
    $.cssHooks.backgroundPosition = {
        get: function( elem, computed, extra ) {
            return $.map(xy, function( k ) {
                return $.style( elem, "backgroundPosition" + k ) + "px";
            }).join(" ");
        }
    };
})(jQuery);
