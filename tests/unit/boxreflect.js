module("boxreflect");

test("boxReflect", 2, function() {
    equal( jQuery("#test").css("boxReflect"), "below 3px none", "returns correct value" );
    equal( jQuery("#test").css('boxReflect', 'above 3px').css("boxReflect"), "above 3px none", "sets and retrieves new property" );
});