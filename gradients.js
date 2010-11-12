/*! Copyright (c) 2010 Tom Ellis (http://www.webmuse.co.uk)
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {
    // Linear and Radial Gradients get hooks
    
    //Need to check when setting background gradient or other such images
    
    /*
    background - fails to return a value
    background-image
    border-image
    list-style-image
    content property - doesn't work through jQuery / JavaScript
    */
    
	//Todo: improve regex reuse / logic
	var rWhitespace = /\s/,
	prefix = "Moz Webkit ".split(rWhitespace),
	cssProps1 = "background backgroundImage listStyleImage";
	
	
	/*
	Need to do tests for border support
	Currently Moz doesn't support gradient as border images
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
    (div.style.backgroundImage.indexOf( "gradient" )  > -1 ? 'gradient' : false));
    
    
    //Remove these as some point not needed
    var webkitlinear = "-webkit-gradient(linear, {position} {colours} )";    
    var webkitradial = "-webkit-gradient(radial, {position} {colours} )";
    var moz          = "-moz-linear-gradient( {position} {colours} )";
    
    
    
    //Normalises between Moz/W3c and Webkit
    //Moz/W3c uses shorter position, Webkit uses longer position
    var pos = {
    
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
    }
    
	//Needed as Webkit browsers support gradients differently	
    $.support.isWebkit = ( $.support.linearGradient === "-webkit-gradient" ) ? true : false;
    
    if( !$.cssHooks )
    {
    	$.error( "jQuery 1.4.3+ is needed for this plugin to work" );
    }
    
	
    if ( $.support.linearGradient && $.support.linearGradient !== "gradient" )
    {
				
		$.each( cssProps, function( i, prop ){
			
			$.cssHooks[prop] = {
        
        		//Causes recursion error due to checking for "get: in cssHook
        		//Not really needed
				/*get: function( elem, computed, extra ) {
				
					return $.css(elem, prop, "background-image");
				},*/
				set: function( elem, value ) {
				
					if( /^(.*)(:?linear-gradient|linearGradient)(.*)$/i.test( value ) )
					{
						//alert( linearSettings( value ) );
						elem.style[prop] = linearSettings( value );
					}
					else if ( /^(.*)(:?radial-gradient|radialGradient)(.*)$/i.test( value ) )
					{
						//todo
						//elem.style[prop] = radialSettings( value );
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
    
        var parts = /^(.*)(:?linear-gradient|linearGradient)(\()(.*)(\))(.*)$/i.exec( value );
        var details = [], colourFrom, colourTo, position, percentage;
         
		//part[1] & [6] = other settings	
        //parts[2] = gradient name;
        //parts[3] & [5] = ( and )
        //parts[4] = gradient settings (position, colours);
        
        //Replaces linear-gradient with browser specific gradient e.g. -moz-linear-gradient
        value = value.replace( parts[2] , $.support.linearGradient );
        //alert( value );
        
        details = $.trim(parts[4]).split(",");
        
        //Only colours passed
        if ( details.length === 2 )
        {
            //need to not overwrite other parts of background settings
            if ( $.support.isWebkit )
            {
                var template = webkitlinear;
                
                var colours = parts[4].split(",");
                
                template = template.replace( "{colours}",  "left top, left bottom, from(" + colours[0] + "), to(" + colours[1] + ")" );
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
            
            percentage = (details[i].split(rWhitespace).length !== 1) ? parseInt(details[i].split(rWhitespace)[1])/100 : Math.round( 100 / (details.length - 2) ) / 100;
            
            percentage = ( i == ( details.length - 1 ) ) ? "100" : ( percentage * a );
            
            otherColours.push ("color-stop(" + percentage + ", " + details[i].split(rWhitespace)[0] + ")" );
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
            var pos2 = pos[position] || position;
            template = template.replace( "{position}", pos2 );
            
            value =  parts[1] + template + " " + parts[6];
        }
		
		
        return value;            
    }
    
    function radialSettings(){
    
    	//Todo
    }
    
    div = null;
    
})(jQuery); 