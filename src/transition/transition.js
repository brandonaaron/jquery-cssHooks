/*! Copyright (c) 2010 Burin Asavesna (http://helloburin.com)
 * Licensed under the MIT License (LICENSE.txt).
 */
(function($) {
    var div = document.createElement('div'),
        divStyle = div.style,
        support = $.support,
        props = "Property Duration TimingFunction".split(" ");

    support.transition =
        divStyle.MozTransition     === ''? 'MozTransition'    :
        (divStyle.MsTransition     === ''? 'MsTransition'     :
        (divStyle.WebkitTransition === ''? 'WebkitTransition' :
        (divStyle.OTransition      === ''? 'OTransition'      :
        (divStyle.transition       === ''? 'Transition'       :
        false))));

    div = null;

    if ( support.transition && support.transition !== "Transition" ) {
        $.cssHooks.transition = {
            get: function( elem, computed, extra ) {
                return $.map(props, function( prop, i ) {
                    return $.css(elem, support.transition + prop);
                }).join(" ");
            },
            set: function( elem, value ) {
                elem.style[ support.transition ] = value;
            }
        };

        $.each(props, function( i, prop ) {
            $.cssHooks[ "transition" + prop ] = {
                get: function( elem, computed, extra ) {
                    return $.css(elem, support.transition + prop);
                },
                set: function( elem, value ) {
                    elem.style[ support.transition + prop ] = value;
                }
            };
        });

    }

})(jQuery);
