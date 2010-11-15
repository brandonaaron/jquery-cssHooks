module("color");

test("Basic getting & setting", 10, function() {
	equals( jQuery("#test").css("color"), "rgb(0, 0, 0)", "returns just the color" );
	equals( jQuery("#test").css("color", "rgb(100, 150, 200)").css("color"), "rgb(100, 150, 200)", "sets the color properly" );
	equals( jQuery("#test").css("color", "#bada55").css("color"), "rgb(186, 218, 85)", "sets the color properly" );
	equals( jQuery("#test").css("color", "red").css("color"), "rgb(255, 0, 0)", "sets the color properly" );
	equals( jQuery("#test").css("color", "lawngreen").css("color"), "rgb(124, 252, 0)", "sets the color properly" );
	equals( jQuery("#test").css("color", "rgba(0, 0, 0, 0.3)").css("color"), "rgba(0, 0, 0, 0.3)", "sets the color properly" );
	equals( jQuery("#test").css("color", "rgba(0, 255, 0, 0.5)").css("color"), "rgba(0, 255, 0, 0.5)", "sets the color properly" );
	equals( jQuery("#test").css("color", "rgb(33%, 66%, 99%)").css("color"), "rgb(84, 168, 252)", "sets the color properly" );
	equals( jQuery("#test").css("color", "hsl(75%, 50%, 25%)").css("color"), "rgb(63, 31, 95)", "sets the color properly" );
	equals( jQuery("#test").css("color", "hsla(10%, 20%, 30%, 0.4)").css("color"), "rgba(91, 79, 61, 0.4)", "sets the color properly" );
});	