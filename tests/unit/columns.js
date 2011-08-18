module("Multiplecolumns");

test("columnCount", 2, function() {
    equals( jQuery("#test").css("columnCount"), "2", "returns correct value" );
    equals( jQuery("#test").css("columnCount", "4").css("columnCount"), "4", "sets and retrieves new property" );
});
