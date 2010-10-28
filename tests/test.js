test("padding", function() {
    ok( jQuery("#test").css("padding"), "1px 2px 3px 4px" );
});

test("margin", function() {
    ok( jQuery("#test").css("margin"), "1px 2px 3px 4px" );
});

test("backgroundPosition", function() {
    ok( jQuery("#test").css("backgroundPosition"), "5px 5px" );
});
