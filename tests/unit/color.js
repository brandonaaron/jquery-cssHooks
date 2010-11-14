module("color");

test("Basic getting & setting", 10, function() {
	equals( jQuery("#test").css("color"), "rgb(0, 0, 0)", "returns just the color" );
	equals( jQuery("#test").css("color", "rgb(100, 150, 200)").css("color"), "rgb(100, 150, 200)", "sets the color properly" );
	equals( jQuery("#test").css("color", "#bada55").css("color"), "#bada55", "sets the color properly" );
	equals( jQuery("#test").css("color", "red").css("color"), "red", "sets the color properly" );
	equals( jQuery("#test").css("color", "lawngreen").css("color"), "lawngreen", "sets the color properly" );
	equals( jQuery("#test").css("color", "rgba(0, 0, 0, 0.3)").css("color"), "rgba(0, 0, 0, 0.3)", "sets the color properly" );
	equals( jQuery("#test").css("color", "rgba(0, 255, 0, 0.5)").css("color"), "rgba(0, 255, 0, 0.5)", "sets the color properly" );
	equals( jQuery("#test").css("color", "rgb(33%, 66%, 99%)").css("color"), "rgb(33%, 66%, 99%)", "sets the color properly" );
	equals( jQuery("#test").css("color", "hsl(75%, 50%, 25%)").css("color"), "hsl(75%, 50%, 25%)", "sets the color properly" );
	equals( jQuery("#test").css("color", "hsla(10%, 20%, 30%, 0.4)").css("color"), "hsla(10%, 20%, 30%, 0.4)", "sets the color properly" );
});