/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 */
(function($) {
    // padding and margin get hooks
    var dirs = "Top Right Bottom Left".split(" ");
    $.each(["margin", "padding"], function( i, hook ) {
        $.cssHooks[ hook ] = {
            get: function( elem, computed, extra ) {
                return $.map(dirs, function( dir ) {
                    return $.css( elem, hook + dir );
                }).join(" ");
            },
            set: function( elem, value ) {
                var parts  = value.split(/\s/),
                    values = {
                        "Top":    parts[0],
                        "Right":  parts[1] || parts[0],
                        "Bottom": parts[2] || parts[0],
                        "Left":   parts[3] || parts[1] || parts[0]
                    };
                $.each(dirs, function( i, dir ) {
                    elem.style[ hook + dir ] = values[ dir ];
                });
            }
        };
    });
})(jQuery);
