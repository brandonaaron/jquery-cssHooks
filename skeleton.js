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

var div = document.createElement("div"),
	divStyle = div.style,
	propertyName = "<propertyName>",
	// with leading upper-case
	suffix = "<PropertyName>",
	testProperties = [
		"O" + suffix,
		// "ms", not "Ms"
		"ms" + suffix,
		"Webkit" + suffix,
		"Moz" + suffix,
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
	if ( testProperties[i] in divStyle ) {
		$.support[propertyName] = supportProperty = testProperties[i];
		continue;
	}
}
// If a proprietary alternative exists for IE678, include another test for it
if ( !supportProperty ) {
	$.support.MsAlternative = supportMsAlternative = divStyle["<IE alternative>"] === "";
}

// the following line should be removed if "px" is the default unit for this property
$.cssNumber[propertyName] = true;

// prefix-less property will likely not need a hook
if ( supportProperty && supportProperty != propertyName ) {
	// Modern browsers can use jQuery.cssProps as a basic hook
	$.cssProps[propertyName] = supportProperty;

	// Real cssHooks might be used to normalize implementations inconsistencies in some browsers
	// for example
	if ( supportProperty == "Moz" + suffix ) {
		propertyHook = {
			set: function( elem, value ) {
				elem.style[ supportProperty ] = normalizeFirefoxSet( value );
			}
		};
	/* Fix two jQuery bugs present before jQuery 1.6
	 * - rupper is incompatible with IE9, see http://jqbug.com/8346
	 * - jQuery.css is not really jQuery.cssProps aware, see http://jqbug.com/8402
	 */
	} else if ( /^1\.[0-5](?:\.|$)/.test($.fn.jquery) ) {
		propertyHook = {
			get: function( elem, computed ) {
				return (computed ?
					$.css( elem, supportProperty.replace(/^ms/, "Ms") ):
					elem.style[supportProperty]
				)
			}
		}
	}
// If a proprietary alternative exists for IE678, implement a complete hook for it
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
// populate jQuery.cssHooks with the appropriate hook if necessary
if ( propertyHook ) {
	$.cssHooks[propertyName] = propertyHook;
}
// uncomment following line if the animation logic uses the getter
//var propertyGet = propertyHook && propertyHook.get || $.css;*/

// animation for simple values
$.fx.step[propertyName] = function( fx ) {
	var value = fx.now + fx.unit;
	propertyHook && propertyHook.set?
		// Use a setter hook if it exists
		propertyHook.set( elem, transform ):
		// Otherwise modify raw DOM for maximum performances
		elem.style[supportProperty] = transform;
}
// The following code can be used as a base to animate more complex values
/*$.fx.step[propertyName] = function( fx ) {
	// fx.start and fx.end will probably be parsed on the first step to be computable
	if ( !fx.start || typeof fx.start === "string" ) {
		// fix fx.start value
		if ( !fx.start ) {
			fx.start =  propertyGet( fx.elem, supportProperty );
		}
		fx.start = parse(fx.start);
		fx.end = parse(fx.end);
	}

	// the code that calculates the value or components of it, is specific to the property
	// but it is likely to look like the following
	var value = fx.start + ( fx.end - fx.start ) * fx.pos;

	// set the value once it has been calculated
	propertyHook.set?
		propertyHook.set( elem, transform ):
		elem.style[supportProperty] = transform;
}*/

})( jQuery );