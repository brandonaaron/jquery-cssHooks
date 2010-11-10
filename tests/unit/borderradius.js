module("borderRadius");

test("borderRadius", 3, function() {
    equals( jQuery("#test").css("borderRadius"), "5px 5px 5px 5px", "returns values in the correct order" );
    equals( jQuery("#test").css("borderRadius", "3px").css("borderRadius"), "3px 3px 3px 3px", "sets the values properly with 1 value" );
    equals( jQuery("#test").css("borderRadius", "3px 0 0 3px").css("borderRadius"), "3px 0px 0px 3px", "sets the values properly with multiple values" );
});

test("borderRadiusTopLeft", 2, function() {
    equals( jQuery("#test").css("borderRadiusTopLeft"), "5px", "returns values in the correct order" );
    equals( jQuery("#test").css("borderRadiusTopLeft", "3px").css("borderRadiusTopLeft"), "3px", "sets the values properly" );
});

test("borderRadiusTopRight", 2, function() {
    equals( jQuery("#test").css("borderRadiusTopRight"), "5px", "returns values in the correct order" );
    equals( jQuery("#test").css("borderRadiusTopRight", "3px").css("borderRadiusTopRight"), "3px", "sets the values properly" );
});

test("borderRadiusBottomRight", 2, function() {
    equals( jQuery("#test").css("borderRadiusBottomRight"), "5px", "returns values in the correct order" );
    equals( jQuery("#test").css("borderRadiusBottomRight", "3px").css("borderRadiusBottomRight"), "3px", "sets the values properly" );
});

test("borderRadiusBottomLeft", 2, function() {
    equals( jQuery("#test").css("borderRadiusBottomLeft"), "5px", "returns values in the correct order" );
    equals( jQuery("#test").css("borderRadiusBottomLeft", "3px").css("borderRadiusBottomLeft"), "3px", "sets the values properly" );
});