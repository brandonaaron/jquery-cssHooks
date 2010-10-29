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

    // backgroundPosition[X,Y] get hooks
    var $div = $('<div style="background-position: 3px 5px">');
    $.support.backgroundPosition  = $div.css('backgroundPosition')  === "3px 5px" ? true : false;
    $.support.backgroundPositionX = $div.css('backgroundPositionX') === "3px"     ? true : false;
    $.support.backgroundPositionY = $div.css('backgroundPositionY') === "5px"     ? true : false;

    var xy = ["X","Y"];
    if (!$.support.backgroundPosition && $.support.backgroundPositionX && $.support.backgroundPositionY) {
        $.cssHooks.backgroundPosition = {
            get: function( elem, computed, extra ) {
                return $.map(xy, function( v, i ) {
                    return $.css(elem, "backgroundPosition" + v);
                }).join(" ");
            }
        };
    }
    if ($.support.backgroundPosition && !$.support.backgroundPositionX && !$.support.backgroundPositionY) {
        var rbgpos = /(\d+)(.+)\s(\d+)(.+)/;
        $.each(xy, function( i, v ) {
            $.cssHooks[ "backgroundPosition" + v ] = {
                get: function( elem, computed, extra ) {
                    var bgPos = $.css(elem, "backgroundPosition"),
                        parts = rbgpos.exec(bgPos),
                        x = parts[1]+parts[2], y = parts[3]+parts[4];
                    return v === "X" ? x : y
                }
            }
        });
    }
})(jQuery);
