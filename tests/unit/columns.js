module("Multiplecolumns");

test("columnCount", 2, function() {
    equals( jQuery("#test").css("columnCount"), "2", "returns correct value" );
    equals( jQuery("#test").css("columnCount", "4").css("columnCount"), "4", "sets and retrieves new property" );
});
/*
test("columnCount", 2, function() {
    equals( jQuery("#test").css("boxReflect"), "below 3px none", "returns correct value" );
    equals( jQuery("#test").css('boxReflect', 'above 3px').css("boxReflect"), "above 3px none", "sets and retrieves new property" );
});

test("columnCount", 2, function() {
    equals( jQuery("#test").css("boxReflect"), "below 3px none", "returns correct value" );
    equals( jQuery("#test").css('boxReflect', 'above 3px').css("boxReflect"), "above 3px none", "sets and retrieves new property" );
});

test("columnCount", 2, function() {
    equals( jQuery("#test").css("boxReflect"), "below 3px none", "returns correct value" );
    equals( jQuery("#test").css('boxReflect', 'above 3px').css("boxReflect"), "above 3px none", "sets and retrieves new property" );
});

test("columnCount", 2, function() {
    equals( jQuery("#test").css("boxReflect"), "below 3px none", "returns correct value" );
    equals( jQuery("#test").css('boxReflect', 'above 3px').css("boxReflect"), "above 3px none", "sets and retrieves new property" );
});*/