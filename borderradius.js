/*! Copyright (c) 2010 Burin Asavesna (http://helloburin.com)
 * Licensed under the MIT License (LICENSE.txt).
 */
(function($) {
    // borderRadius get hooks
    var div = document.createElement('div'),
        divStyle = div.style,
        support = $.support,
        dirs = "TopLeft TopRight BottomRight BottomLeft".split(" ");

    // WebKit supports "borderRadius" as well as "WebKitBorderRadius", weird
    support.borderRadius =
        divStyle.MozBorderRadius     === ''? 'MozBorderRadius'    :
        (divStyle.MsBorderRadius     === ''? 'MsBorderRadius'     :
        (divStyle.WebkitBorderRadius === ''? 'WebkitBorderRadius' :
        (divStyle.OBorderRadius      === ''? 'OBorderRadius'      :
        (divStyle.borderRadius       === ''? 'BorderRadius'       :
        false))));

    div = null;

    function borderCornerRadius(direction, prefix) {
        prefix = prefix === undefined || prefix === '' ? 'border' : prefix + 'Border';
        if ( support.borderRadius && support.borderRadius == "MozBorderRadius" ) {
            // e.g. MozBorderRadiusTopleft
            return prefix + "Radius" + direction.charAt(0).toUpperCase()+direction.substr(1).toLowerCase();
        } else {
            // e.g. WebKitBorderTopLeftRadius, borderTopLeftRadius, etc
            return prefix + direction + "Radius";
        }
    }

    if ( support.borderRadius && support.borderRadius !== "BorderRadius" ) {
        var vendor_prefix = support.borderRadius.replace('BorderRadius','');
        $.cssHooks.borderRadius = {
            get: function( elem, computed, extra ) {
                // return each of the directions, topleft, topright, bottomright, bottomleft
                return $.map(dirs, function( dir ) {
                    return $.css(elem, borderCornerRadius( dir, vendor_prefix ));
                }).join(" ");
            },
            set: function( elem, value ) {
                // takes in a single value or shorthand (just letting the browser handle this) 
                // e.g. 5px to set all, or 5px 0 0 5px to set left corners
                elem.style[ borderCornerRadius( '', vendor_prefix ) ] = value;
            }
        };

        $.each(dirs, function( i, dir ) {
            $.cssHooks[ "borderRadius" + dir ] = {
                get: function( elem, computed, extra ) {
                    return $.css(elem, borderCornerRadius( dir, vendor_prefix ));
                },
                set: function( elem, value ) {
                    elem.style[ borderCornerRadius( dir, vendor_prefix ) ] = value;
                }
            };
        });

    }

})(jQuery);
