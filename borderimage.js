/*! Copyright (c) 2010 Tom Ellis (http://www.webmuse.co.uk)
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {
    // Border Image set and get hooks
    
    
    if( !$.cssHooks )
    {
    	$.error( "jQuery 1.4.3+ is needed for this plugin to work" );
    }
    
	var div = document.createElement( "div" );
	
    $.support.borderImage =
    div.style.MozBorderImage === '' ? 'MozBorderImage' :
    (div.style.WebkitBorderImage === '' ? 'WebkitBorderImage' :
    (div.style.borderImage === '' ? 'borderImage' : false));

	
    if ( $.support.borderImage && $.support.borderImage !== "borderImage" )
    {
        $.cssHooks.borderImage = {
        
            get: function( elem, computed, extra ) {
            
                return $.css(elem, $.support.borderImage);
            },
            set: function( elem, value ) {
            
                elem.style[$.support.borderImage] = value;
            }
			
        };
		    
    }
        
    div = null;
    
})(jQuery); 