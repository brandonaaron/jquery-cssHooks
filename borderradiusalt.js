/*! 
* Copyright (c) 2011 Tom Ellis (http://www.webmuse.co.uk)
* User Select cssHook for jQuery
* Limitations:
  - Works with jQuery 1.4.3 and higher
  - Can't animate border radius in IE
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {
    // Border Radius set and get hooks

	var div = document.createElement("div"),
		divStyle = div.style,
		rWhiteSpace = /\s/,
		dirs = "TopLeft TopRight BottomRight BottomLeft".split(rWhiteSpace);
		
	$.support.borderRadius =
		divStyle.WebkitBorderRadius === ''? 'WebkitBorderRadius' :
		(divStyle.MozBorderRadius === ''? 'MozBorderRadius' : 
		(divStyle.BorderRadius === ''? 'BorderRadius' : false));
	
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
	
	if ( $.support.borderRadius && $.support.borderRadius !== "borderRadius" ){		
		//BorderRadius
		$.cssHooks.borderRadius = {
			get: function( elem, computed, extra ) {

				return $.map(dirs, function( dir ) {
					return $.css( elem, $.support[dir] );
				}).join(" ");
				
			},
			set: function( elem, value ) {
			
				var parts = value.split(rWhiteSpace),
					values = {
						"TopLeft": parts[0],
						"TopRight": parts[1] || parts[0],
						"BottomLeft": parts[2] || parts[0],
						"BottomRight": parts[3] || parts[1] || parts[0]
					};
				
				elem.style[ $.support.borderRadius ] = value;
			}
		};
		
		$.each( dirs, function( i, dir ) {

			$.cssHooks[ "border" + dir + "Radius"] = {
				get: function( elem, computed, extra ) {

					return $.css( elem, $.support[dir] );
				},
				set: function( elem, value ){

					elem.style[ $.support[dir] ] = value;
				}
			};
			
			$.fx.step[ "border" + dir + "Radius" ] = function( fx ) {
				$.cssHooks[ "border" + dir + "Radius" ].set( fx.elem, fx.now + fx.unit );
			};

			
		});
		
		// setup fx hooks
		$.fx.step.borderRadius = function( fx ) {
			$.cssHooks.borderRadius.set( fx.elem, fx.now + fx.unit );
		};

	} else if ( !$.support.borderRadius && "createStyleSheet" in document ) {
		//BorderRadius Plugin
		$.cssHooks.borderRadius = {
			get: function( elem, computed, extra ) {

				return $.data(elem, "borderRadiusIE");
			},
			set: function( elem, value ) {

				var css,
					parts = value.split(rWhiteSpace),
					one = parts[0],
					two = parts[1] || parts[0],
					three = parts[2] || parts[0],
					four = parts[3] || parts[1] || parts[0],
					values = [
						one,
						two,
						three,
						four
					];
					
					css = ($.data( elem, "borderRadiusIECSS")) ? 
					$.data( elem, "borderRadiusIECSS") : document.createStyleSheet("ie_style.css")
					css.cssText = "";
					css.addRule( "#results", "border-radius:" + values.join(" ") );
					//Needs to be the directory from root of index.html
					//or page that uses this js file to the border radius htc file
					elem.style.behavior = "url(js/border-radius.htc)";
				
				$.data(elem, "borderRadiusIE", values.join(" "));
				$.data( elem, "borderRadiusIECSS", css);
	
			}
		};
		
		//Todo: Add support for each corner
		/*$.each( dirs, function( i, dir ) {

			$.cssHooks[ "border" + dir + "Radius"] = {
			
				get: function( elem, computed, extra ) {

				},
				set: function( elem, value ){
				
					
				}
			};
			
		});
		*/
	}

	div = divStyle = null;
	
})(jQuery);