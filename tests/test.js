test("width", function() {
    equals( jQuery("#test").css("width"), "10px", "returns correct values" );
});

test("padding", function() {
    equals( jQuery("#test").css("padding"), "1px 2px 3px 4px", "returns values in the correct order" );
});

test("margin", function() {
    equals( jQuery("#test").css("margin"), "1px 2px 3px 4px", "returns values in the correct order" );
});

test("backgroundPosition", function() {
    equals( jQuery("#test").css("backgroundPosition"), "3px 5px", "returns values in the correct order" );
});

test("backgroundPositionX", function() {
    equals( jQuery("#test").css("backgroundPositionX"), "3px", "returns proper value" );
});

test("backgroundPositionY", function() {
    equals( jQuery("#test").css("backgroundPositionY"), "5px", "returns proper value" );
});
