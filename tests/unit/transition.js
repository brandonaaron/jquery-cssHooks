module("transition");

test("transition", 2, function() {
    equals( jQuery("#test").css("transition"), "border 1s cubic-bezier(0, 0, 1, 1)", "returns values in the correct order" );
    equals( jQuery("#test").css("transition", "color 2s ease-in").css("transition"), "color 2s cubic-bezier(0.42, 0, 1, 1)", "sets the values properly" );
});

test("transitionProperty", 2, function() {
    equals( jQuery("#test").css("transitionProperty"), "border", "returns proper value" );
    equals( jQuery("#test").css("transitionProperty", "color").css("transitionProperty"), "color", "sets the values properly" );
});

test("transitionDuration", 2, function() {
    equals( jQuery("#test").css("transitionDuration"), "1s", "returns proper value" );
    equals( jQuery("#test").css("transitionDuration", "2s").css("transitionDuration"), "2s", "sets the values properly" );
});

test("transitionTimingFunction", 2, function() {
    equals( jQuery("#test").css("transitionTimingFunction"), "cubic-bezier(0, 0, 1, 1)", "returns proper value" );
    equals( jQuery("#test").css("transitionTimingFunction", "ease-in").css("transitionTimingFunction"), "cubic-bezier(0.42, 0, 1, 1)", "sets the values properly" );
});
