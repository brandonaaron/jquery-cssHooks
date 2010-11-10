/*! Copyright (c) 2010 Burin Asavesna (http://helloburin.com)
 * Licensed under the MIT License (LICENSE.txt).
 */
(function($) {
    // borderRadius get hooks
    var div = document.createElement('div'),
        divStyle = div.style,
        support = $.support,
        dirs = "TopLeft TopRight BottomRight BottomLeft".split(" ");

    support.borderRadius =
        divStyle.MozBorderRadius     === ''? 'MozBorderRadius'    :
        (divStyle.MsBorderRadius     === ''? 'MsBorderRadius'     :
        (divStyle.WebkitBorderRadius === ''? 'WebkitBorderRadius' :
        (divStyle.OBorderRadius      === ''? 'OBorderRadius'      :
        (divStyle.borderRadius       === ''? 'BorderRadius'       :
        false))));

    div = null;
    
    function borderCornerRadius(dir) {
        if ( support.borderRadius && support.borderRadius == "MozBorderRadius" ) {
            return "MozBorderRadius" + "Topleft"; // e.g. MozBorderRadiusTopleft
        } else {
            return "border" + dir + "Radius";
        }
    }
    
    if ( support.borderRadius && support.borderRadius !== "BorderRadius" ) {
        $.cssHooks.borderRadius = {
            get: function( elem, computed, extra ) {
                return $.map(dirs, function( dir ) {
                    return $.css(elem, borderCornerRadius( dir ));
                }).join(" ");
            },
            set: function( elem, value ) {
                $.each( dirs, function( i, dir ) {
                    elem.style[ borderCornerRadius( dir ) ] = value;
                });
            }
        };

        $.each(dirs, function( i, dir ) {
            $.cssHooks[ "borderRadius" + dir ] = {
                get: function( elem, computed, extra ) {
                    return $.css(elem, borderCornerRadius( dir ));
                },
                set: function( elem, value ) {
                    elem.style[ borderCornerRadius( dir ) ] = value;
                }
            };
        });

    }

})(jQuery);
