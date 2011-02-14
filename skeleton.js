/*
 * <property name>: A jQuery cssHooks adding a cross browser <property name> property to $.fn.css() and $.fn.animate()
 * 
 * limitations:
 * - requires jQuery 1.4.3+
 * - compatible with Firefox <version>, Chrome <version>, Safari <version>, Opera <version>, Internet Explorer <version>
 * - <additional limitations>
 * 
 * Copyright
 * License
 */
(function( $ ) {

var div = document.createElement('div'),
	divStyle = div.style,
	propertyName = '<property name>',
	suffix = propertyName[0].toUpperCase() + propertyName.slice(1),
	testProperties = [
		'Moz' + suffix,
		'Webkit' + suffix,
		'0' + suffix,
		// 'ms', not 'Ms'
		'ms' + suffix,
		// prefix-less property
		propertyName
	],
	i = testProperties.length,
	// use local variables instead of jQuery.support and jQuery.cssHooks
	// throughout the plugin to reduce file size once minified
	supportProperty,
	supportMsAlternative,
	propertyHook;

// test different vendor prefixes of this property
while ( i-- ) {
	if ( divStyle[ testProperties[i] ] === '' ) {
		$.support[propertyName] = supportProperty = testProperties[i];
		continue;
	}
}
// If a proprietary alternative exists for IE678, include another test for it
if ( !supportProperty ) {
	$.support.MsAlternative = supportMsAlternative = divStyle['<IE alternative>'] === '';
}
// prevent IE memory leak
div = divStyle = null;

// the following line should be removed if 'px' is the default unit for this property
$.cssNumber[propertyName] = true;

// prefix-less property will likely not need a hook
if ( supportProperty && supportProperty != propertyName ) {
	propertyHook = {
		get: function( elem, computed, extra ) {
			return (computed ?
				// the availability of getComputedStyle can be infered from the CSS3 feature test
				getComputedStyle(elem):
				elem.style
			)[ supportProperty ];
		},
		set: function( elem, value ) {
			elem[supportProperty] = value;
		}
	};
// If a proprietary alternative exists for IE678, implement a special hook for it
} else if ( supportMsAlternative ) {
	propertyHook = {
		get: function( elem, computed, extra ) {
			// Handle crazy conversion from the proprietary alternative 
		},
		set: function( elem, value ) {
			// Handle crazy conversion to the proprietary alternative
		}
	}
}
// populate jQuery.cssHooks with the appropriate hook
$.cssHooks[propertyName] = propertyHook;

$.fx.step[propertyName] = function( fx ) {
	// fx.start and fx.end will probably be parsed on the first step to be computable
	if ( !fx.start || typeof fx.start === 'string' ) {
		// fix fx.start value
		if ( !fx.start ) {
			fx.start =  propertyHook.get( fx.elem, true );
		}
		fx.start = parse(fx.start);
		fx.end = parse(fx.end);
	}

	// the code that calculates the value or components of it, is specific to the property
	// but it is likely to look like the following
	var value = fx.start + ( fx.end - fx.start ) * fx.pos;

	// set the value once it has been calculated
	supportProperty ?
		fx.elem[supportProperty] = value:
		propertyHook.set( fx.elem, value );
}

})( jQuery );