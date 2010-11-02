/*! Copyright (c) 2010 Burin Asavesna (http://helloburin.com)
 * Licensed under the MIT License (LICENSE.txt).
 */
(function($) {
    // boxShadow get hooks
    var div = document.createElement('div'),
        divStyle = div.style,
        support = $.support,
        props = "Property Duration TimingFunction".split(" ");

    support.transition =
        divStyle.MozTransition     === ''? 'MozTransition'    :
        (divStyle.MsTransition     === ''? 'MsTransition'     :
        (divStyle.WebkitTransition === ''? 'WebkitTransition' :
        (divStyle.OTransition      === ''? 'OTransition'      :
        (divStyle.Transition       === ''? 'Transition'       :
        false))));

    div = null;
    
    if (support.transition) {
        $.cssHooks.transition = {
            get: function( elem, computed, extra ) {
                return $.map(props, function( l, i ) {
                    return $.css(elem, support.transition + l);
                }).join(" ");
            },
            set: function( elem, value ) {
                elem.style[ support.transition ] = value;
            }
        };
        
        // breaks in Safari, stack overflow :o
        // $.each(props, function( i, prop ) {
        //     $.cssHooks[ support.transition + prop ] = {
        //         get: function( elem, computed, extra ) {
        //             return $.css(elem, support.transition + prop);
        //         },
        //         set: function( elem, value ) {
        //             elem.style[ support.transition + prop ] = value;
        //         }
        //     };
        // });

        $.cssHooks.transitionProperty = {
            get: function ( elem, computed, extra ) {
                return $.css(elem, support.transition + "Property");
            },
            set: function( elem, value ) {
                elem.style[ support.transition + "Property" ] = value;
            }
        };

        $.cssHooks.transitionDuration = {
            get: function ( elem, computed, extra ) {
                return $.css(elem, support.transition + "Duration");
            },
            set: function( elem, value ) {
                elem.style[ support.transition + "Duration" ] = value;
            }
        };

        $.cssHooks.transitionTimingFunction = {
            get: function ( elem, computed, extra ) {
                return $.css(elem, support.transition + "TimingFunction");
            },
            set: function( elem, value ) {
                elem.style[ support.transition + "TimingFunction" ] = value;
            }
        };

    }

})(jQuery);
