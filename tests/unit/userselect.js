module("userSelect");

test("userSelect", 7, function() {
    equals( jQuery("#test").css("userSelect"), "none", "returns correct value" );
    equals( jQuery("#test").css("userSelect", "text").css("userSelect"), "text", "sets 1st new value, and reads new value properly" );
    equals( jQuery("#test").css("userSelect", "toggle").css("userSelect"), "toggle", "sets 2nd new value, and reads new value properly" );
    equals( jQuery("#test").css("userSelect", "element").css("userSelect"), "element", "sets 3rd new value, and reads new value properly" );
    equals( jQuery("#test").css("userSelect", "elements").css("userSelect"), "elements", "sets 4th new value, and reads new value properly" );
    equals( jQuery("#test").css("userSelect", "all").css("userSelect"), "all", "sets 5th new value, and reads new value properly" );
    equals( jQuery("#test").css("userSelect", "inherit").css("userSelect"), "inherit", "sets 6th new value, and reads new value properly" );
});
