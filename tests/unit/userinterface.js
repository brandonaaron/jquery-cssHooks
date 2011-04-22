module("User Interface");

test("userSelect", 6, function() {
    equals( jQuery("#test").css("userSelect"), "none", "returns correct value" );
    equals( jQuery("#test").css("userSelect", "text").css("userSelect"), "text", "sets 1st new value, and reads new value properly" );
    equals( jQuery("#test").css("userSelect", "toggle").css("userSelect"), "toggle", "sets 2nd new value, and reads new value properly" );
    equals( jQuery("#test").css("userSelect", "element").css("userSelect"), "element", "sets 3rd new value, and reads new value properly" );
    equals( jQuery("#test").css("userSelect", "elements").css("userSelect"), "elements", "sets 4th new value, and reads new value properly" );
    equals( jQuery("#test").css("userSelect", "all").css("userSelect"), "all", "sets 5th new value, and reads new value properly" );
});

test("userInput", 2, function() {
    equals( jQuery("#test").css("userInput"), "disabled", "returns correct value" );
    equals( jQuery("#test").css("userInput", "enabled").css("userInput"), "enabled", "sets 1st new value, and reads new value properly" );
});

test("userFocus", 2, function() {
    equals( jQuery("#test").css("userFocus"), "ignore", "returns correct value" );
    equals( jQuery("#test").css("userFocus", "normal").css("userFocus"), "normal", "sets 1st new value, and reads new value properly" );
});

test("userModify", 2, function() {
    equals( jQuery("#test").css("userModify"), "read-only", "returns correct value" );
    equals( jQuery("#test").css("userModify", "read-write").css("userModify"), "read-write", "sets 1st new value, and reads new value properly" );
});
