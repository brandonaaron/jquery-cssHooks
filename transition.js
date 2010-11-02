/*! Copyright (c) 2010 Burin Asavesna (http://helloburin.com)
 * Licensed under the MIT License (LICENSE.txt).
 */
(function($) {
    // boxShadow get hooks
    var div = document.createElement('div'),
        divStyle = div.style,
        support = $.support;

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
                return $.css(elem, support.transition + "Property") + " " + $.css(elem, support.transition + "Duration") + " " + $.css(elem, support.transition + "TimingFunction");
            },
            set: function( elem, value ) {
                elem.style[ support.transition ] = value;
            }
        };

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


        // setup fx hooks
        var fxHooks = "Blur Spread X Y".split(" ");
        $.each(fxHooks, function( i, suffix ) {
            var hook = "boxShadow" + suffix;
            $.fx.step[ hook ] = function( fx ) {
                $.cssHooks[ hook ].set( fx.elem, fx.now + fx.unit );
            };
        });
    }

})(jQuery);
