module("Multiplecolumns");

test("columnCount", 2, function() {
    equal( jQuery("#test").css("columnCount"), "2", "returns correct value" );
    equal( jQuery("#test").css("columnCount", "4").css("columnCount"), "4", "sets and retrieves new property" );
});
