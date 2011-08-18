module("gradient");

test("linearGradient", 3, function() {		
	ok( /linear-gradient/i.test( jQuery("#test2").css("backgroundImage", "linear-gradient(top, blue, red)").css("backgroundImage") ) , "returns correct value using colour names" );
	ok( /linear-gradient/i.test( jQuery("#test2").css("backgroundImage", "linear-gradient(top, rgb(0,0,225), rgb(255,0,0))").css("backgroundImage") ) , "returns correct value using rgb values" );
	ok( /linear-gradient/i.test( jQuery("#test2").css("backgroundImage", "linear-gradient(top, hsl(240,100%, 50%), hsl(0,100%, 50%))").css("backgroundImage") ) , "returns correct value using hsl values" );			
});

test("radialGradient", 3, function() {
    jQuery("#test").css("backgroundImage", "radial-gradient(50% 50%, circle, red, blue)");
    ok( /radial-gradient/i.test( jQuery("#test2").css("backgroundImage","radial-gradient(50% 50%, circle, grey, blue)").css("backgroundImage") ) , "returns correct value using colour names" );
	ok( /radial-gradient/i.test( jQuery("#test2").css("backgroundImage", "radial-gradient(50% 50%, circle, top, rgb(0,0,225), rgb(255,0,0))").css("backgroundImage") ) , "returns correct value using rgb colours" );
	ok( /radial-gradient/i.test( jQuery("#test2").css("backgroundImage", "radial-gradient(50% 50%, circle, top, hsl(240,100%, 50%), hsl(0,100%, 50%))").css("backgroundImage") ) , "returns correct value using rgb colours" );
});