/*! Copyright (c) 2010 Tom Ellis (http://www.webmuse.co.uk)
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {
    // Linear and Radial Gradients get hooks
    
    if( !$.cssHooks )
    {
    	$.error( "jQuery 1.4.3+ is needed for this plugin to work" );
    	return;
    }
    
    /*
    * Need to check when setting background gradient or other such images
    background - fails to return a value
    background-image
    border-image
    list-style-image
    content property - doesn't work through jQuery / JavaScript
    */
    
	//Improved regex reuse and logic
	var rWhitespace = /\s/,
	rWhiteGlobal = /\s/g,
	rRgba = /\,rgb/gi,
	rHsla = /\,hsl/gi,
	sRgbaReplace = "|rgb",
	sHslaReplace = "|hsl",
	rContainRgborHsl = /(rgb|hsl)(a?)(\()/i,
	//prefix = "Moz Webkit ".split(rWhitespace),
	cssProps1 = "background backgroundImage listStyleImage";
	
	
	/*
	* Need to do tests for border support
	* Currently Moz doesn't support gradient as border images
	* Need to test in other browers too.
	//Border
	var cssProps2 = "border borderStyle borderCornerImage borderImage borderTopImage borderRightImage borderBottomImage borderLeftImage "+
	"borderTopLeftImage borderTopRightImage borderBottomLeftImage borderBottomRightImage";
	
	var borderImages = "borderCornerImage borderImage borderTopImage borderRightImage borderBottomImage borderLeftImage "+
	"borderTopLeftImage borderTopRightImage borderBottomLeftImage borderBottomRightImage";
    
	var cssProps = (cssProps1 + " " + cssProps2).split(/\s/);
	*/
	
	var cssProps = cssProps1.split(rWhitespace);
	
    var div = document.createElement( "div" );
    var css = "background-image:gradient(linear,left top,right bottom, from(#9f9), to(white));background-image:-webkit-gradient(linear,left top,right bottom,from(#9f9),to(white));background-image:-moz-gradient(linear,left top,right bottom,from(#9f9),to(white));background-image:-o-gradient(linear,left top,right bottom,from(#9f9),to(white));background-image:-ms-gradient(linear,left top,right bottom,from(#9f9),to(white));background-image:-khtml-gradient(linear,left top,right bottom,from(#9f9),to(white));background-image:linear-gradient(left top,#9f9, white);background-image:-webkit-linear-gradient(left top,#9f9, white);background-image:-moz-linear-gradient(left top,#9f9, white);background-image:-o-linear-gradient(left top,#9f9, white);background-image:-ms-linear-gradient(left top,#9f9, white);background-image:-khtml-linear-gradient(left top,#9f9, white);";    
    div.style.cssText = css;

		
    $.support.linearGradient =
    div.style.backgroundImage.indexOf( "-moz-linear-gradient" )  > -1 ? '-moz-linear-gradient' :
    (div.style.backgroundImage.indexOf( "-webkit-gradient" )  > -1 ? '-webkit-gradient' :
    (div.style.backgroundImage.indexOf( "linear-gradient" )  > -1 ? 'linear-gradient' : false));
    
    var css2 = "background-image:-webkit-gradient(radial, center center, 0, center center, 100, from(orange), to(red)); gradient(radial,left top,right bottom, from(#9f9), to(white));background-image:-webkit-gradient(radial,left top,right bottom,from(#9f9),to(white));background-image:-moz-gradient(radial,left top,right bottom,from(#9f9),to(white));background-image:-o-gradient(radial,left top,right bottom,from(#9f9),to(white));background-image:-ms-gradient(radial,left top,right bottom,from(#9f9),to(white));background-image:-khtml-gradient(radial,left top,right bottom,from(#9f9),to(white));background-image:radial-gradient(left top,#9f9, white);background-image:-webkit-radial-gradient(left top,#9f9, white);background-image:-moz-radial-gradient(left top,#9f9, white);background-image:-o-radial-gradient(left top,#9f9, white);background-image:-ms-radial-gradient(left top,#9f9, white);background-image:-khtml-radial-gradient(left top,#9f9, white);";    
    div.style.cssText = css2;
    
    $.support.radialGradient =
    div.style.backgroundImage.indexOf( "-moz-radial-gradient" )  > -1 ? '-moz-radial-gradient' :
    (div.style.backgroundImage.indexOf( "-webkit-gradient" )  > -1 ? '-webkit-gradient' :
    (div.style.backgroundImage.indexOf( "radial-gradient" )  > -1 ? 'radial-gradient' : false));
    
    
    //Remove these as some point not needed
    var webkitlinear = "-webkit-gradient(linear, {position} {colours} )";    
    var webkitradial = "-webkit-gradient(radial, {position} {colours} )";
    var moz          = "-moz-linear-gradient( {position} {colours} )";
    
    var el = null;
    
    //Normalises between Moz/W3c and Webkit
    //Moz/W3c uses shorter position, Webkit uses longer position
    var posLinear = {
    
        "left top" : "left top, right bottom",
        "left bottom" : "left bottom, right bottom",
        "right top" : "right top, left bottom",
        "right bottom" : "right bottom, left bottom",
        "right center" : "right bottom, left bottom",
        "left center" : "left bottom, right bottom",
        "center top" : "left top, left bottom",
        "center bottom" : "left bottom, left top",
        "center center" : "-100% -100%, 0% 0%",
        "top left" : "top left, bottom right",
        "top" : "left top, left bottom",
        "bottom" : "left bottom, left top",
        "left" : "left top, right top",
        "right" : "left top, right top"
    };
    
    var posRadial = {
    
        "center" : "center center, 0, center center",
		"farthest-side" : "60%",
		"standard" : "center center, 0, center center"
    };
    

    
	//Needed as Webkit browsers support gradients differently	
    $.support.isWebkit = ( $.support.linearGradient === "-webkit-gradient" ) ? true : false;
    
    if( !$.cssHooks )
    {
    	$.error( "jQuery 1.4.3+ is needed for this plugin to work" );
    }
    
	
    if ( $.support.linearGradient && $.support.linearGradient !== "linear-gradient" )
    {
				
		$.each( cssProps, function( i, prop ){
			
			$.cssHooks[prop] = {
        
        		//Causes recursion error due to checking for "get: in cssHook
        		//Not really needed as we only want to be able to override setting a style, not really getting
				/*get: function( elem, computed, extra ) {
				
					return $.css(elem, prop);
				},*/
				set: function( elem, value ) {
					//alert( value  );
					if( /^(.*)(:?linear-gradient|linearGradient)(.*)$/i.test( value ) )
					{
						//TODO: need to check for mulitple backgrounds
						elem.style[prop] = linearSettings( value );
					}
					else if ( /(^|\s)(:?radial-gradient|radialGradient)(.*)$/i.test( value ) )
					{
						//TODO: need to check for mulitple backgrounds
						//alert( value );
						el = elem;
						elem.style[prop] = radialSettings( value );
					}
					else
					{
						//Do default
						elem.style[prop] = value;
					}
				}
			};
		
		});
    
    }
    
    function linearSettings( value ){
    
    	//alert( value );
    
        var parts = /^(.*)(:?linear-gradient|linearGradient)(\()(.*)(\))(.*)$/i.exec( value );
        var details = [], colourFrom, colourTo, position, percentage, isRgb = false, isHsl = false;
         
		//part[1] & [6] = other settings	
        //parts[2] = gradient name;
        //parts[3] & [5] = ( and )
        //parts[4] = gradient settings (position, colours);
        
        //Replaces linear-gradient with browser specific gradient e.g. -moz-linear-gradient
        value = value.replace( parts[2] , $.support.linearGradient );

        
        //rgb/rgba colours
        /*if ( containsRGB( parts[4] ) )
        {
        	details = parseRGB( parts[4] );
        	isRgb = true; //not sure if needed
        }
        else if ( containsHSL( parts[4] )  )
        {
        	//alert( parts[4] );
        	details = parseHSL( parts[4] );
        	isHsl = true; //not sure if needed
        }*/
        
        if( containsRGBorHSL( parts[4] ) )
        {
        	//alert("yeah");
        	details = parseRGBandHSL( parts[4] );
        }
        else
        {
        	details = $.trim(parts[4]).split(",");
        }

        //Only colours passed
        if ( details.length === 2 )
        {
            //need to not overwrite other parts of background settings
            if ( $.support.isWebkit )
            {

                var template = webkitlinear;

				template = template.replace( "{colours}",  "left top, left bottom, from(" + details[0] + "), to(" + details[1] + ")" );
				template = template.replace( "{position}", "" );
                

                value =  parts[1] + template + " " + parts[6];
            }

            return value;
        }
                
        //Position and 2 ( or more ) Colours set
        position = details[0];
        
        details[1] = $.trim(details[1]);
        
        percentage = (details[1].split(rWhitespace).length !== 1) ? parseInt(details[1].split(rWhitespace)[1])/100 : "0",
        
        colourFrom = "color-stop(" + percentage + "%, " + details[1].split(" ")[0] + ")";
        
        //colourTo
        var otherColours = [];
        colourTo = "";
        
        
        var a = 1;
        for ( var i = 2; i < details.length; i++ )
        {
            details[i] = $.trim( details[i] );
            
            percentage = 0;
            
            if( containsRGBorHSL( details[i] ) )
            {
            	percentage = ( i == ( details.length - 1 ) ) ? "100" : ( 100 / i );
            }
            else
            {
            	percentage = (details[i].split(rWhitespace).length !== 1) ? parseInt(details[i].split(rWhitespace)[1])/100 : Math.round( 100 / (details.length - 2) ) / 100;
            	percentage = ( i == ( details.length - 1 ) ) ? "100" : ( percentage * a );
            }
            otherColours.push ("color-stop(" + percentage + "%, " + details[i].split(rWhitespace)[0] + ")" );
            a++;
        }
        
        
        colourTo = otherColours.join(", ");
        
        
        //Change formatting of css
        //Don't need to do this for firefox as it is same as W3C Spec
        if ( $.support.isWebkit )
        {
        	//Need to Improve this logic
            var template = webkitlinear;
            template = template.replace( "{colours}", "," + colourFrom + "," + colourTo );
            
            //template = template.replace( "{position}", position + ",  right bottom" );
            //var pos = pos[position] || position;

            var pos2 = posLinear[position] || position;
            template = template.replace( "{position}", pos2 );
            
            
            value =  parts[1] + template + " " + parts[6];
        }
        return value;            
    }
    
    function radialSettings( value ){
    
    	//alert( value );
    	var parts = /^(.*)(:?radial-gradient|radialGradient)(\()(.*)(\))(.*)$/i.exec( value );
        var details = [], colourFrom, colourTo, position, percentage;
         
		//part[1] & [6] = other settings	
        //parts[2] = gradient name;
        //parts[3] & [5] = ( and )
        //parts[4] = gradient settings (position, colours);
        
        //Replaces linear-gradient with browser specific gradient e.g. -moz-linear-gradient
        value = value.replace( parts[2] , $.support.radialGradient );

        
        if( containsRGBorHSL( parts[4] ) )
        {
        	//alert("yeah");
        	details = parseRGBandHSL( parts[4] );
        }
        else
        {
        	details = $.trim(parts[4]).split(",");
        }

        //Only colours passed
        if ( details.length === 2 )
        {
            //need to not overwrite other parts of background settings
            if ( $.support.isWebkit )
            {
                var template = webkitradial;
                                
                //Put back together
                value =  parts[1] + template + " " + parts[6];
                
                var width = $(el).width() * 0.8;
                
                template = template.replace( "{colours}",  posRadial['standard'] + "," + width + ", from(" + details[0] + "), to(" + details[1] + ")" );
				template = template.replace( "{position}", "" );
                

                value =  parts[1] + template + " " + parts[6];
                
            }
            return value;
        }
                
        //Position and 2 ( or more ) Colours set
        
        position = details[0];
        
        details[1] = $.trim(details[1]);
        
        percentage = (details[1].split(rWhitespace).length !== 1) ? parseInt(details[1].split(rWhitespace)[1])/100 : "0",
        
        colourFrom = "color-stop(" + percentage + ", " + details[1].split(" ")[0] + ")";
        
        //colourTo
        var otherColours = [];
        colourTo = "";
        
        var a = 1;
        for ( var i = 2; i < details.length; i++ )
        {
            details[i] = $.trim( details[i] );
            
            percentage = 0;
            
            if( containsRGBorHSL( details[i] ) )
            {
            	percentage = ( i == ( details.length - 1 ) ) ? "100" : ( 100 / i );
            }
            else
            {
            	percentage = (details[i].split(rWhitespace).length !== 1) ? parseInt(details[i].split(rWhitespace)[1])/100 : Math.round( 100 / (details.length - 2) ) / 100;
            	percentage = ( i == ( details.length - 1 ) ) ? "100" : ( percentage * a );
            }
            
            otherColours.push ("color-stop(" + percentage + "%, " + details[i].split(rWhitespace)[0] + ")" );
            a++;
        }
        
        colourTo = otherColours.join(", ");
        
        
        //Change formatting of css
        //Don't need to do this for firefox as it is same as W3C Spec
        if ( $.support.isWebkit )
        {
        	//Need to Improve this logic
            var template = webkitradial;
            template = template.replace( "{colours}", "," + colourFrom + "," + colourTo );
            //template = template.replace( "{position}", position + ",  right bottom" );
            //var pos = pos[position] || position;
            var pos2 = posRadial[position] || position;
            
            var width = $(el).width() * 0.8;
            
            template = template.replace( "{position}", pos2 + "," + width);
            
            value =  parts[1] + template + " " + parts[6];
        }

        return value;  
    }
        
    function parseRGBandHSL( value )
    {
    	
    	var newValue;
    	//Hsl
    	newValue = $.trim( value ).replace(rWhiteGlobal, "").replace(rHsla, sHslaReplace);
    	//Rgb
    	newValue = newValue.replace(rRgba, sRgbaReplace);

    	return newValue.split("|");
    }
    
    function containsRGBorHSL( value )
    {   
    	return ( rContainRgborHsl.test(  $.trim( value ) ) );
    }
    
    div = null;
    
})(jQuery); 