/*! Copyright (c) 2010 Tom Ellis (http://www.webmuse.co.uk)
* User Select cssHook for jQuery 1.4.3+
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {

	//User Select cssHook
	var div = document.createElement( "div" );
	
	/*
	Values:	none | text | toggle | element | elements | all | inherit
	Initial:	text
	*/
	
    $.support.userSelect =
    div.style.MozUserSelect === "" ? 'MozUserSelect' :
    (div.style.WebkitUserSelect === "" ? 'WebkitUserSelect' :
    (div.style.userSelect === ""  ? 'userSelect' : false));
	

	
	var CssToJs = {
	
		"none" : "on",
		"text" : "off",
		"element" : "off",
		"elements" : "off",
		"all" : "off",
		"inherit" : "off"
	};

	var isIE = (document.all) ? true : false; 
		
	if ( $.support.userSelect && $.support.userSelect !== "userSelect" && !isIE)
	{
		$.cssHooks.userSelect = {
		
			get: function( elem, computed, extra ) {
				return $.css(elem, $.support.userSelect);
			},
			set: function( elem, value ) {
				elem.style[ $.support.userSelect ] = value;
			}
		};	
			
	}
	
	div = null;
    
})(jQuery); 