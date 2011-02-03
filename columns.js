/*! Copyright (c) 2010 Tom Ellis (http://www.webmuse.co.uk)
* Licensed under the MIT License (license.txt).
*/
(function($) {
    // Multiple Columns set and get hooks

    if( !$.cssHooks )
    {
    	$.error( "jQuery 1.4.3+ is needed for this plugin to work" );
    }
    
    var div = document.createElement("div");

    var rWhitespace = /\s/,
    column = "Column",
    props = "Span Count Gap Width RuleColor RuleStyle RuleWidth".split(rWhitespace),
    prefix = div.style.WebkitColumnGap === ''? 'Webkit' : (div.style.MozColumnGap === '' ? 'Moz' : '');
    
    $.support.columnCount =
    div.style.WebkitColumnCount === ''? 'WebkitColumnCount' :
    (div.style.MozColumnCount === ''? 'MozColumnCount' :
    (div.style.columnCount === ''? 'columnCount' : false));

    
    function getCssProperty( prefix, prop )
    {
    	return prefix + ( (prefix === '') ? column.toLowerCase() : column ) + prop;
    }

    if ( $.support.columnCount && $.support.columnCount !== "columnCount" )
    {
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
   
    div = null;
   
})(jQuery);