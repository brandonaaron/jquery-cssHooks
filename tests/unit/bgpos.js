module("backgroundPosition");

test("backgroundPosition", 2, function() {
    equals( jQuery("#test").css("backgroundPosition"), "3px 5px", "returns values in the correct order" );
    equals( jQuery("#test").css("backgroundPosition", "1px 2px").css("backgroundPosition"), "1px 2px", "sets the values properly" );
});

test("backgroundPositionX", 3, function() {
    equals( jQuery("#test").css("backgroundPositionX"), "3px", "returns proper value" );
    equals( jQuery("#test").css("backgroundPositionX", "1px").css("backgroundPositionX"), "1px", "sets the value properly" );
    stop();
    jQuery("#test").animate({ backgroundPositionX: 10 }, 100, function() {
        equals( jQuery("#test").css("backgroundPositionX"), "10px", "animates the value properly" );
        start();
    });
});

test("backgroundPositionY", 3, function() {
    equals( jQuery("#test").css("backgroundPositionY"), "5px", "returns proper value" );
    equals( jQuery("#test").css("backgroundPositionY", "1px").css("backgroundPositionY"), "1px", "sets the value properly" );
    stop();
    jQuery("#test").animate({ backgroundPositionY: 10 }, 100, function() {
        equals( jQuery("#test").css("backgroundPositionY"), "10px", "animates the value properly" );
        start();
    });
});

