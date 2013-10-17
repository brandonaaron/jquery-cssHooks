/*! 
* Copyright (c) 2011 Tom Ellis (http://www.webmuse.co.uk)
* Box Reflect cssHook for jQuery
* Limitations:
  - Works with jQuery 1.4.3 and higher
  - Doesn't currently support gradients
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {
	var div = document.createElement('div'),
		divStyle = div.style;
		
	$.support.boxReflect = 
		divStyle.boxReflect === '' ? 'boxReflect' :
		(divStyle.MozBoxReflect === '' ? 'MozBoxReflect' :
		(divStyle.WebkitBoxReflect === '' ? 'WebkitBoxReflect' :
		(divStyle.OBoxReflect === '' ? 'OBoxReflect' : false)));
    
	if ( $.support.boxReflect && $.support.boxReflect !== 'boxReflect' ) {
		
		$.cssHooks.boxReflect = {			
			get: function( elem, computed, extra ) {
				return $.css( elem, $.support.boxReflect );
			},
			set: function( elem, value ) {
				elem.style[$.support.boxReflect] = value;
			}
		};	
	}
	div = divStyle = null;
		
})(jQuery);