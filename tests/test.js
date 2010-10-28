test("padding", function() {
    ok( jQuery("#test").css("padding"), "1px 2px 3px 4px" );
    equals( jQuery("#test").css("padding"), "1px 2px 3px 4px", "returns values in the correct order" );
});

test("margin", function() {
    ok( jQuery("#test").css("margin"), "1px 2px 3px 4px" );
    equals( jQuery("#test").css("margin"), "1px 2px 3px 4px", "returns values in the correct order" );
});

test("backgroundPosition", function() {
    ok( jQuery("#test").css("backgroundPosition"), "3px 5px" );
    equals( jQuery("#test").css("backgroundPosition"), "3px 5px", "returns values in the correct order" );
});
