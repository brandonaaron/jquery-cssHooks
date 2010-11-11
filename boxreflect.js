/*! Copyright (c) 2010 Tom Ellis (http://www.webmuse.co.uk)
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {
    // Css3 Box Reflect set and get hooks 
	var div = document.createElement('div');
	
	//Only works in Chrome and Safari so far
	
	//Need to test in FF 4 beta
	
	$.support.boxReflect =  div.style.WebkitBoxReflect === '' ? 'WebkitBoxReflect' :
    (div.style.MozBoxReflect === '' ? 'MozBoxReflect' :
    (div.style.OBoxReflect === '' ? 'OBoxReflect' :
    (div.style.boxReflect === '' ? 'boxReflect' :
    false)));
    
    if( !$.cssHooks )
    {
    	$.error( "jQuery 1.4.3+ is needed for this plugin to work" );
    }
	
	if ( $.support.boxReflect && $.support.boxReflect !== 'boxReflect' )
	{
		$.cssHooks.boxReflect = {
			
			get: function( elem, computed, extra ) {
				//Need to add support for gradients
				return $.css( elem, $.support.boxReflect );
			},
			set: function( elem, value ) {
				//Need to add support for gradients
				elem.style[$.support.boxReflect] = value;
			}
		};
			
	}
	
	div = null;
	
})(jQuery);