/*! 
* Copyright (c) 2011 Tom Ellis (http://www.webmuse.co.uk)
* Border Radius cssHook for jQuery
* Limitations:
  - Works with jQuery 1.4.3 and higher
  - Can't animate border radius in IE
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {

	var div = document.createElement("div"),
		divStyle = div.style,
		rWhiteSpace = /\s/,
		dirs = "TopLeft TopRight BottomRight BottomLeft".split(rWhiteSpace),
		getRadii = function( n ){
		    if( !n ) {
		        return [0]; 
		    } else if(typeof n == 'number') {
		        return [n];
		    } else {
			    r = n.match(/(\-\d+|\d+)/g) || [0];
			    for(var i in r) {
			        r[i] = parseInt(r[i]);
		    	}
		    }
			return r;
		};

	$.support.borderRadius =
		divStyle.borderRadius === '' ? 'borderRadius' :
		(divStyle.MozBorderRadius === '' ? 'MozBorderRadius' :
		(divStyle.WebkitBorderRadius === '' ? 'WebkitBorderRadius' : false));
	
	//Browsers support border radius corners differently (For now)

	$.support.TopLeft = false;
	$.support.TopRight = false;
	$.support.BottomLeft = false;
	$.support.BottomRight = false;
		
	if( $.support.borderRadius === 'borderRadius' ) {

		$.support.TopLeft = 'borderTopLeftRadius';
		$.support.TopRight = 'borderTopLeftRadius';
		$.support.BottomLeft = 'borderTopLeftRadius';
		$.support.BottomRight = 'borderTopLeftRadius';		
		
	} else if( $.support.borderRadius === 'MozBorderRadius' ) {
		
		$.support.TopLeft = 'borderTopLeftRadius';
		$.support.TopRight = 'borderTopLeftRadius';
		$.support.BottomLeft = 'borderTopLeftRadius';
		$.support.BottomRight = 'borderTopLeftRadius';
		
	} else if( $.support.borderRadius === 'WebkitBorderRadius' ) {
		
		$.support.TopLeft = 'borderTopLeftRadius';
		$.support.TopRight = 'borderTopLeftRadius';
		$.support.BottomLeft = 'borderTopLeftRadius';
		$.support.BottomRight = 'borderTopLeftRadius';		
	}
	
	if ( $.support.borderRadius && $.support.borderRadius !== "borderRadius" ){	
		//alert('here');
		//BorderRadius
		$.cssHooks.borderRadius = {
			get: function( elem, computed, extra ) {

				return $.map(dirs, function( dir ) {
					return $.css( elem, $.support[dir], computed );
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
			
				/*
				
				function ii( n ){
				    if( !n ) {
				        return [0]; 
				    } else if(typeof n == 'number') {
				        return [n];
				    } else {
					    r = n.match(/(\-\d+|\d+)/g) || [0];
					    for(var i in r) {
					        r[i] = parseInt(r[i]);
				    	}
				    }
					return r;
				}
				
                if(!fx.endx) {
                    
					var i = ii($(fx.elem).css( $.support[dir] ) );
                    
					fx.startx = i[0];
                    fx.starty = i[1]||i[0];
                    fx.f = ii(fx.end);
                    fx.endx = fx.f[0];
                    fx.endy = fx.f[1]||fx.f[0];

                    if((fx.endy - fx.starty) < (fx.endx - fx.startx)) {
                        fx.which = true;
                        fx.end = fx.endx;
                        fx.start = fx.startx;
                        fx.now = fx.start;
                        fx.now2 = fx.starty;
                    } else {
                        fx.which = false;
                        fx.end = fx.endy;
                        fx.start = fx.starty;
                        fx.now = fx.start;
                        fx.now2 = fx.startx;
                    }
                }
                fx.now2 = (fx.which)?
                    fx.starty + ((fx.endy - fx.starty) * fx.pos)
                :
                    fx.startx + ((fx.endx - fx.startx) * fx.pos);
                var set = (fx.which)?
                    (fx.now + fx.unit+" "+fx.now2 + fx.unit)
                :
                    (fx.now2 + fx.unit+" "+fx.now + fx.unit);

				$.cssHooks[ "border" + dir + "Radius" ].set( fx.elem, fx.now + fx.unit+" "+fx.now2 + fx.unit );
				*/
                
				//$.cssHooks[ "border" + dir + "Radius" ].set( fx.elem, set );	
				//console.log( fx.now + fx.unit+" "+fx.now2 + fx.unit );
				
				//$.cssHooks[ "border" + dir + "Radius" ].set( fx.elem, fx.now + fx.unit+" "+fx.now2 + fx.unit );	
			
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
		
	}

	div = divStyle = null;
	
})(jQuery);