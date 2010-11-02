/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
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
            }
        };
    }

})(jQuery);
