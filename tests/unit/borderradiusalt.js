module("borderRadiusAlt");

/*
See why this doesn't work?? (Because of shorthand?)
test("borderRadius", 3, function() {
    equals( jQuery("#test").css("borderRadius"), "5px 5px 5px 5px", "returns values in the correct order" );
    equals( jQuery("#test").css("borderRadius", "3px").css("borderRadius"), "3px 3px 3px 3px", "sets the values properly with 1 value" );
    equals( jQuery("#test").css("borderRadius", "3px 0 0 3px").css("borderRadius"), "3px 0px 0px 3px", "sets the values properly with multiple values" );
});
*/

test("borderTopLeftRadius", 2, function() {
    equals( jQuery("#test").css("borderTopLeftRadius"), "5px", "returns values in the correct order" );
    equals( jQuery("#test").css("borderTopLeftRadius", "3px").css("borderTopLeftRadius"), "3px", "sets the values properly" );
});

test("borderTopRightRadius", 2, function() {
    equals( jQuery("#test").css("borderTopRightRadius"), "5px", "returns values in the correct order" );
    equals( jQuery("#test").css("borderTopRightRadius", "3px").css("borderTopRightRadius"), "3px", "sets the values properly" );
});

test("borderBottomRightRadius", 2, function() {
    equals( jQuery("#test").css("borderBottomRightRadius"), "5px", "returns values in the correct order" );
    equals( jQuery("#test").css("borderBottomRightRadius", "3px").css("borderBottomRightRadius"), "3px", "sets the values properly" );
});

test("borderBottomLeftRadius", 2, function() {
    equals( jQuery("#test").css("borderBottomLeftRadius"), "5px", "returns values in the correct order" );
    equals( jQuery("#test").css("borderBottomLeftRadius", "3px").css("borderBottomLeftRadius"), "3px", "sets the values properly" );
});