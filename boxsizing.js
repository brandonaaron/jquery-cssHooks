/*! 
* Copyright (c) 2011 Tom Ellis (http://www.webmuse.co.uk)
* User Select cssHook for jQuery
* Limitations:
  - Works with jQuery 1.4.3 and higher
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {

    // Box Sizing set and get hooks
	
	var div = document.createElement("div"),
		divStyle = div.style,
		$.support.boxSizing =
			divStyle.MozBoxSizing === ''? 'MozBoxSizing' : 
			(divStyle.WebkitBoxSizing === ''? 'WebkitBoxSizing' : 
			(divStyle.MsBoxSizing === ''? 'msBoxSizing' :
			(divStyle.boxSizing === ''? 'boxSizing' : false)));

	if ( $.support.boxSizing && $.support.boxSizing !== "boxSizing" ){
	
		$.cssHooks.boxSizing = {
			get: function( elem, computed, extra ) {
				return $.css(elem, $.support.boxSizing);
			},
			set: function( elem, value ) {
				elem.style[ $.support.boxSizing ] = value;
			}
		};
			
	}
	
	div = divStyle = null;
	
})(jQuery);