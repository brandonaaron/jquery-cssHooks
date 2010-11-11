module("boxreflect");

test("boxReflect", 2, function() {
    equals( jQuery("#test").css("boxReflect"), "below 3px none", "returns correct value" );
    equals( jQuery("#test").css('boxReflect', 'above 3px').css("boxReflect"), "above 3px none", "sets and retrieves new property" );
});