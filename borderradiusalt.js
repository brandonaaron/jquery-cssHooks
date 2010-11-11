/*! Copyright (c) 2010 Tom Ellis (http://www.webmuse.co.uk)
* Licensed under the MIT License (LICENSE.txt).
* Ideas from Brandon Aaron's cssHooks
*/
(function($) {
    // Border Radius set and get hooks

	var div = document.createElement("div"),
	divStyle = div.style;

	var dirs = "TopLeft TopRight BottomRight BottomLeft".split(/\s/);
	
	$.support.borderRadius =
    divStyle.WebkitBorderRadius === ''? 'WebkitBorderRadius' :
	(divStyle.MozBorderRadius === ''? 'MozBorderRadius' : 
	(divStyle.BorderRadius === ''? 'BorderRadius' 
	: false));
	
	
	//Browsers support border radius corners differently
	
	//Top Left
	$.support.TopLeft =
    divStyle.WebkitBorderRadius === ''? 'WebkitBorderTopLeftRadius' : 
	(divStyle.MozBorderRadius === ''? 'MozBorderRadiusTopleft' : 
	(divStyle.borderRadius === ''? 'borderTopLeftRadius' : false));
	
	//Top Right
	$.support.TopRight =
    divStyle.WebkitBorderRadius === ''? 'WebkitBorderTopRightRadius' : 
	(divStyle.MozBorderRadius === ''? 'MozBorderRadiusTopright' : 
	(divStyle.borderRadius === ''? 'borderTopRightRadius' : false));
	
	//Bottom Left
	$.support.BottomLeft =
    divStyle.WebkitBorderRadius === ''? 'WebkitBorderBottomLeftRadius' : 
	(divStyle.MozBorderRadius === ''? 'MozBorderRadiusBottomleft' : 
	(divStyle.borderRadius === ''? 'borderBottomLeftRadius' : false));
	
	//Bottom Right
	$.support.BottomRight =
    divStyle.WebkitBorderRadius === ''? 'WebkitBorderBottomRightRadius' : 
	(divStyle.MozBorderRadius === ''? 'MozBorderRadiusBottomright' : 
	(divStyle.borderRadius === ''? 'borderBottomRightRadius' : false));
	
	if ( $.support.borderRadius && $.support.borderRadius !== "borderRadius" && $.cssHooks ) //make it only work with 1.4.3+
	{		
		//BorderRadius
		$.cssHooks.borderRadius = {
			get: function( elem, computed, extra ) {

				return $.map(dirs, function( dir ) {
					return $.css( elem, $.support[dir] );
				}).join(" ");
				
			},
			set: function( elem, value ) {
			
			
				var parts = value.split(/\s/),
				values = {
					"TopLeft": parts[0],
					"TopRight": parts[1] || parts[0],
					"BottomLeft": parts[2] || parts[0],
					"BottomRight": parts[3] || parts[1] || parts[0]
				};
				
				
				//Not sure what is better to use
                /*$.each(dirs, function( i, dir ) {
					//alert(  $.support[dir] );
                    elem.style[ $.support[dir] ] = values[ dir ];
                });*/

				elem.style[ $.support.borderRadius ] = value;
			}
		};
		
		$.each( dirs, function( i, radius ) {

			$.cssHooks[ "border" + radius + "Radius"] = {
				get: function( elem, computed, extra ) {

					return $.css( elem, $.support[radius] );
				},
				set: function( elem, value ){

					elem.style[ $.support[radius] ] = value;
				}
			};
			
			
			
			$.fx.step[ "border" + radius + "Radius" ] = function( fx ) {
				$.cssHooks[ "border" + radius + "Radius" ].set( fx.elem, fx.now + fx.unit );
			};

			
		});
		
		// setup fx hooks
		$.fx.step.borderRadius = function( fx ) {
			$.cssHooks.borderRadius.set( fx.elem, fx.now + fx.unit );
		};

	}
	else if ( !$.support.borderRadius )
	{
		//BorderRadius Plugin
		$.cssHooks.borderRadius = {
			get: function( elem, computed, extra ) {

				return $.data(elem, "borderRadiusIE");
			},
			set: function( elem, value ) {

				var css = ($.data( elem, "borderRadiusIECSS")) ? $.data( elem, "borderRadiusIECSS") : document.createStyleSheet("ie_style.css");

				var parts = value.split(/\s/);
				var one = parts[0];
				var two = parts[1] || parts[0];
				var three = parts[2] || parts[0];
				var four = parts[3] || parts[1] || parts[0];
				
				var values = [
					one,
					two,
					three,
					four
				];
				
				css.cssText = "";
				css.addRule( "#results", "border-radius:" + values.join(" ") );

				elem.style.behavior = "url(js/border-radius.htc)";
				
				$.data(elem, "borderRadiusIE", values.join(" "));
				$.data( elem, "borderRadiusIECSS", css);
				

			}
		};
		
		//Todo: Add support for each corner
		$.each( dirs, function( i, radius ) {

			$.cssHooks[ "border" + radius + "Radius"] = {
			
				get: function( elem, computed, extra ) {

				},
				set: function( elem, value ){

				}
			};
			
		});
		
		// setup fx hooks
		$.fx.step.borderRadius = function( fx ) {
		
			//Todo: Doesn't seem to work correctly
			$(fx.elem).css("border-radius", fx.now + fx.unit);
			//$.cssHooks.borderRadius.set( fx.elem, fx.now + fx.unit );
		};
		
		
		$.fx.step[ "border" + radius + "Radius" ] = function( fx ) {
			//Todo: Add support for animation
			//$.cssHooks[ "border" + radius + "Radius" ].set( fx.elem, fx.now + fx.unit );
		};
		
		
		
	}

	div = divStyle = null;
	
})(jQuery);