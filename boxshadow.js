/*! Copyright (c) 2010 Burin Asavesna (http://helloburin.com)
 * Licensed under the MIT License (LICENSE.txt).
 */
(function($) {
    // boxShadow get hooks
    var div = document.createElement('div'),
    divStyle = div.style,
    support = $.support;

    support.boxShadow = 
    divStyle.MozBoxShadow === ''? 'MozBoxShadow' :
    (divStyle.MsBoxShadow === ''? 'MsBoxShadow' :
    (divStyle.WebkitBoxShadow === ''? 'WebkitBoxShadow' : 
    (divStyle.OBoxShadow === ''? 'OBoxShadow' :
    (divStyle.BoxShadow === ''? 'BoxShadow' :
    false))));

    if ($.support.boxShadow) {
        $.cssHooks.boxShadow = {
            get: function( elem, computed, extra ) {
                return $.css(elem, support.boxShadow);
            },
            set: function( elem, value ) {
                elem.style[ support.boxShadow ] = value;
            }
        };
        
        $.cssHooks.boxShadowColor = {
            get: function ( elem, computed, extra ) {
                return $.css(elem, support.boxShadow).split(/\)\s/)[0] + ')';
            },
            set: function( elem, value ) {
                elem.style[ support.boxShadow ] = value + " " + $.css(elem, support.boxShadow).split(/\)\s/)[1];
            }
        };
    }

})(jQuery);
