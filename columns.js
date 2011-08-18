/*!
* Copyright (c) 2011 Tom Ellis (http://www.webmuse.co.uk)
* Columns cssHook for jQuery
* Limitations:
  - Works with jQuery 1.4.3 and higher
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {
    
    var div = document.createElement("div"),
		divStyle = div.style,
		rWhitespace = /\s/,
    	column = "Column",
    	props = "Span Count Gap Width RuleColor RuleStyle RuleWidth".split(rWhitespace),
    	prefix = divStyle.WebkitColumnGap === ''? 'Webkit' : (divStyle.MozColumnGap === '' ? 'Moz' : ''),
		getCssProperty = function( prefix, prop ) {
    		return prefix + ( (prefix === '') ? column.toLowerCase() : column ) + prop;
	    };
    
    $.support.columnCount =
		divStyle.columnCount === '' ? 'columnCount' :
		(divStyle.MozColumnCount === ''? 'MozColumnCount' :
		(divStyle.WebkitColumnCount === ''? 'WebkitColumnCount' : false));
		
    if ( $.support.columnCount && $.support.columnCount !== "columnCount" ) {
       
		$.each(props, function( i, prop ) {
			
            $.cssHooks["column" + prop ] = {
                get: function( elem, computed, extra ) {
                    return $.css(elem, getCssProperty( prefix, prop ) );
                },
                set: function( elem, value ) {
                    elem.style[ getCssProperty( prefix, prop ) ] = value;
                }
            };

        });
    }
   
    div = divStyle = null;
   
})(jQuery);