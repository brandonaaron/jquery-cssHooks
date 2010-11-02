module("boxShadow");

test("boxShadow", 2, function() {
    equals( jQuery("#test").css("boxShadow"), "rgb(0, 0, 0) 1px 2px 10px 0px", "returns values: color, x offset, y offset, blur, ???" );
    equals( jQuery("#test").css("boxShadow", "#ccc 5px 5px 5px").css("boxShadow"), "rgb(204, 204, 204) 5px 5px 5px 0px", "sets the value properly" );
});

test("boxShadowColor", 2, function() {
    equals( jQuery("#test").css("boxShadowColor"), "rgb(0, 0, 0)", "returns just the color" );
    equals( jQuery("#test").css("boxShadowColor", "#ccc").css("boxShadow"), "rgb(204, 204, 204) 1px 2px 10px 0px", "sets the color properly" );
});

test("boxShadowBlur", 3, function() {
    equals( jQuery("#test").css("boxShadowBlur"), "10px", "returns just the blur" );
    equals( jQuery("#test").css("boxShadowBlur", "42px").css("boxShadow"), "rgb(0, 0, 0) 1px 2px 42px 0px", "sets the blur properly" );
    stop();
    jQuery("#test").animate({ boxShadowBlur: 20 }, 100, function() {
        equals( jQuery("#test").css("boxShadowBlur"), "20px", "animates the value properly" );
        start();
    });
});

test("boxShadowSpread", 3, function() {
    equals( jQuery("#test").css("boxShadowSpread"), "0px", "returns just the spread" );
    equals( jQuery("#test").css("boxShadowSpread", "42px").css("boxShadow"), "rgb(0, 0, 0) 1px 2px 10px 42px", "sets the spread properly" );
    stop();
    jQuery("#test").animate({ boxShadowSpread: 20 }, 100, function() {
        equals( jQuery("#test").css("boxShadowSpread"), "20px", "animates the value properly" );
        start();
    });
});

test("boxShadowX", 3, function() {
    equals( jQuery("#test").css("boxShadowX"), "1px", "returns just the x offset" );
    equals( jQuery("#test").css("boxShadowX", "42px").css("boxShadow"), "rgb(0, 0, 0) 42px 2px 10px 0px", "sets the x offset properly" );
    stop();
    jQuery("#test").animate({ boxShadowX: 20 }, 100, function() {
        equals( jQuery("#test").css("boxShadowX"), "20px", "animates the value properly" );
        start();
    });
});

test("boxShadowY", 3, function() {
    equals( jQuery("#test").css("boxShadowY"), "2px", "returns just y offset" );
    equals( jQuery("#test").css("boxShadowY", "42px").css("boxShadow"), "rgb(0, 0, 0) 1px 42px 10px 0px", "sets the x offset properly" );
    stop();
    jQuery("#test").animate({ boxShadowY: 20 }, 100, function() {
        equals( jQuery("#test").css("boxShadowY"), "20px", "animates the value properly" );
        start();
    });
});
