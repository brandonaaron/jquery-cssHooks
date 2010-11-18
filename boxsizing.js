/*! Copyright (c) 2010 Tom Ellis (http://www.webmuse.co.uk)
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {

    // Box Sizing set and get hooks

    if( !$.cssHooks )
    {
    	$.error( "jQuery 1.4.3+ is needed for this plugin to work" );
    	return;
    }
	
	var div = document.createElement("div");
	
	$.support.boxSizing =
    div.style.MozBoxSizing === ''? 'MozBoxSizing' : 
	(div.style.WebkitBoxSizing === ''? 'WebkitBoxSizing' : 
	(div.style.MsBoxSizing === ''? 'MsBoxSizing' :
    (div.style.OBoxSizing === ''? 'OBoxSizing' : 
	(div.style.ICabBoxSizing === ''? 'ICabBoxSizing' : 
	(div.style.KhtmlBoxSizing === ''? 'KhtmlBoxSizing' : 
	(div.style.boxSizing === ''? 'boxSizing' : false))))));

	if ( $.support.boxSizing && $.support.boxSizing !== "boxSizing" )
	{
	
		$.cssHooks.boxSizing = {
			get: function( elem, computed, extra ) {
				return $.css(elem, $.support.boxSizing);
			},
			set: function( elem, value ) {
				elem.style[ $.support.boxSizing ] = value;
			}
		};
			
	}
	
	div = null;
	
})(jQuery);