/*! 
* Copyright (c) 2011 Tom Ellis (http://www.webmuse.co.uk)
* User Interface cssHook for jQuery
* Limitations:
  - Works with jQuery 1.4.3 and higher
  - Works in Firefox 2+, Safari/Chrome (Partial support) only
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {

	var div = document.createElement( "div" ),
		divStyle = div.style,
		propertyName = 'user',
		suffix = 'User',
		props = [
			'Input',
			'Modify',
			'Select',
			'Focus'
		],
		testProperties = [
			propertyName,
			'Moz' + suffix,
			'Webkit' + suffix,
			'O' + suffix,
			'ms' + suffix
		],
		supportProperty,
		j = props.length;
		i = testProperties.length;
	
	o:for( var a = 0; a < j; a++ ){
	
		for( var b = 0; b < i; b++ ){
			if( ( testProperties[b] + props[a] ) in divStyle ){
				$.support[propertyName + props[a]] = ( testProperties[b] + props[a] );
				//If property is found continue to next item in outer loop
				continue o;
			}
		}
	}

	$.each( props, function( i, prop ){
		
		$.cssProps[propertyName+prop] = $.support[propertyName+prop];
		
		if ( $.support[propertyName+prop] && $.support[propertyName+prop] !== propertyName+prop ){
			
			$.cssHooks[propertyName+prop] = {
			
				get: function( elem, computed ) {
					return ( computed ? $.css( elem, $.support[propertyName+prop] ) : elem.style[$.support[propertyName+prop]] );
				},
				set: function( elem, value ) {			
					elem.style[$.support[propertyName+prop]] = value;
				}
			};		
		}
	
	});
		
	div = divStyle = null;
    
})(jQuery);