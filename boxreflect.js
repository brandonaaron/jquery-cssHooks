/*! 
* Copyright (c) 2011 Tom Ellis (http://www.webmuse.co.uk)
* User Select cssHook for jQuery
* Limitations:
  - Works with jQuery 1.4.3 and higher
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {
    // Css3 Box Reflect set and get hooks 
	var div = document.createElement('div'),
		divStyle = div.style;
		$.support.boxReflect =  divStyle.WebkitBoxReflect === '' ? 'WebkitBoxReflect' :
			(divStyle.MozBoxReflect === '' ? 'MozBoxReflect' :
			(divStyle.OBoxReflect === '' ? 'OBoxReflect' :
			(divStyle.boxReflect === '' ? 'boxReflect' : false)));
    
	if ( $.support.boxReflect && $.support.boxReflect !== 'boxReflect' ){
		
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
	
	div = divStyle = null;
	
})(jQuery);