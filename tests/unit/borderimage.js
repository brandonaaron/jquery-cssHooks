module("borderImage");

test("borderImage", 2, function() {
    ok( /^url(.*) 27 27 27 27 round round$/i.test( jQuery("#test").css("borderImage") ) , "returns correct value" );
	ok( /^url(.*) 30 27 30 27 round round$/i.test( jQuery("#test").css("borderImage", "url(border.png) 30 27 30 27 round round").css("borderImage") ) , "sets and returns correct value" );
});