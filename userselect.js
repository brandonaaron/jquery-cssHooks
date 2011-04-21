/*! Copyright (c) 2011 Tom Ellis (http://www.webmuse.co.uk)
* User Select cssHook for jQuery 1.4.3+
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {

	//User Select cssHook
	
	var div = document.createElement( "div" ),
		divStyle = div.style,
		$.support.userSelect =
		div.style.MozUserSelect === "" ? 'MozUserSelect' :
		(div.style.WebkitUserSelect === "" ? 'WebkitUserSelect' :
		(div.style.userSelect === ""  ? 'userSelect' : false));
			
	if ( $.support.userSelect && $.support.userSelect !== "userSelect" ){
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