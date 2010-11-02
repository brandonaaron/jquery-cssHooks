test("margin", function() {
    equals( jQuery("#test").css("margin"), "1px 2px 3px 4px", "returns values in the correct order" );
    equals( jQuery("#test").css("margin", "4px 3px 2px 1px").css("margin"), "4px 3px 2px 1px", "sets the top, right, bottom, left values properly" );
    equals( jQuery("#test").css("margin", "5px 6px 7px").css("margin"), "5px 6px 7px 6px", "sets the top, right & left, bottom values properly" );
    equals( jQuery("#test").css("margin", "8px 9px").css("margin"), "8px 9px 8px 9px", "sets the top & bottom, left & right values properly" );
    equals( jQuery("#test").css("margin", "1px").css("margin"), "1px 1px 1px 1px", "sets all the values properly" );
});

test("padding", function() {
    equals( jQuery("#test").css("padding"), "1px 2px 3px 4px", "returns values in the correct order" );
    equals( jQuery("#test").css("padding", "4px 3px 2px 1px").css("padding"), "4px 3px 2px 1px", "sets the top, right, bottom, left values properly" );
    equals( jQuery("#test").css("padding", "5px 6px 7px").css("padding"), "5px 6px 7px 6px", "sets the top, right & left, bottom values properly" );
    equals( jQuery("#test").css("padding", "8px 9px").css("padding"), "8px 9px 8px 9px", "sets the top & bottom, left & right values properly" );
    equals( jQuery("#test").css("padding", "1px").css("padding"), "1px 1px 1px 1px", "sets all the values properly" );
});

test("backgroundPosition", function() {
    equals( jQuery("#test").css("backgroundPosition"), "3px 5px", "returns values in the correct order" );
    equals( jQuery("#test").css("backgroundPosition", "1px 2px").css("backgroundPosition"), "1px 2px", "sets the values properly" );
});

test("backgroundPositionX", function() {
    equals( jQuery("#test").css("backgroundPositionX"), "3px", "returns proper value" );
    equals( jQuery("#test").css("backgroundPositionX", "1px").css("backgroundPositionX"), "1px", "sets the value properly" );
    stop();
    jQuery("#test").animate({ backgroundPositionX: 10 }, 100, function() {
        equals( jQuery("#test").css("backgroundPositionX"), "10px", "animates the value properly" );
        start();
    });
});

test("backgroundPositionY", function() {
    equals( jQuery("#test").css("backgroundPositionY"), "5px", "returns proper value" );
    equals( jQuery("#test").css("backgroundPositionY", "1px").css("backgroundPositionY"), "1px", "sets the value properly" );
    stop();
    jQuery("#test").animate({ backgroundPositionY: 10 }, 100, function() {
        equals( jQuery("#test").css("backgroundPositionY"), "10px", "animates the value properly" );
        start();
    });
});

test("boxShadow", function() {
    equals( jQuery("#test").css("boxShadow"), "rgb(0, 0, 0) 1px 1px 10px 0px", "returns values: color, x offset, y offset, blur, ???" );
    equals( jQuery("#test").css("boxShadow", "#ccc 5px 5px 5px").css("boxShadow"), "rgb(204, 204, 204) 5px 5px 5px 0px", "sets the value properly" );
});

test("boxShadowColor", function() {
    equals( jQuery("#test").css("boxShadowColor"), "rgb(0, 0, 0)", "returns just the color" );
    equals( jQuery("#test").css("boxShadowColor", "#ccc").css("boxShadow"), "rgb(204, 204, 204) 1px 1px 10px 0px", "sets the color properly" );
});
