module("gradient");
test("linearGradient", 1, function() {
	//Different for Moz and Webkit
    ok( /linear-gradient|gradient/i.test( jQuery("#test").css("backgroundImage","linearGradient(grey, blue)").css("backgroundImage") ) , "returns correct value" );
	//ok( /^url(.*) 30 27 30 27 round round$/i.test( jQuery("#test").css("borderImage", "url(border.png) 30 27 30 27 round round").css("borderImage") ) , "sets and returns correct value" );
});