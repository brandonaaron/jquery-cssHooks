/*! 
* Copyright (c) 2011 Tom Ellis (http://www.webmuse.co.uk)
* User Select cssHook for jQuery
* Limitations:
  - Works with jQuery 1.4.3 and higher
  - Doesn't work in all CSS3 browers (currently)
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {
    // Border Image set and get hooks
    
	var div = document.createElement( "div" ),
		divStyle = div.style;
    	$.support.borderImage =
    		divStyle.MozBorderImage === '' ? 'MozBorderImage' :
    		(divStyle.WebkitBorderImage === '' ? 'WebkitBorderImage' :
    		(divStyle.borderImage === '' ? 'borderImage' : false));

    if ( $.support.borderImage && $.support.borderImage !== "borderImage" ){
        
        $.cssHooks.borderImage = {
        
            get: function( elem, computed, extra ) {
            
                return $.css(elem, $.support.borderImage);
            },
            set: function( elem, value ) {
            
                elem.style[$.support.borderImage] = value;
            }
			
        };
    }
        
    div = divStyle = null;
    
})(jQuery)