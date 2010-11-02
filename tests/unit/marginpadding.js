module("marginpadding");

test("margin", 5, function() {
    equals( jQuery("#test").css("margin"), "1px 2px 3px 4px", "returns values in the correct order" );
    equals( jQuery("#test").css("margin", "4px 3px 2px 1px").css("margin"), "4px 3px 2px 1px", "sets the top, right, bottom, left values properly" );
    equals( jQuery("#test").css("margin", "5px 6px 7px").css("margin"), "5px 6px 7px 6px", "sets the top, right & left, bottom values properly" );
    equals( jQuery("#test").css("margin", "8px 9px").css("margin"), "8px 9px 8px 9px", "sets the top & bottom, left & right values properly" );
    equals( jQuery("#test").css("margin", "1px").css("margin"), "1px 1px 1px 1px", "sets all the values properly" );
});

test("padding", 5, function() {
    equals( jQuery("#test").css("padding"), "1px 2px 3px 4px", "returns values in the correct order" );
    equals( jQuery("#test").css("padding", "4px 3px 2px 1px").css("padding"), "4px 3px 2px 1px", "sets the top, right, bottom, left values properly" );
    equals( jQuery("#test").css("padding", "5px 6px 7px").css("padding"), "5px 6px 7px 6px", "sets the top, right & left, bottom values properly" );
    equals( jQuery("#test").css("padding", "8px 9px").css("padding"), "8px 9px 8px 9px", "sets the top & bottom, left & right values properly" );
    equals( jQuery("#test").css("padding", "1px").css("padding"), "1px 1px 1px 1px", "sets all the values properly" );
});

