module("boxSizing");

test("boxSizing", 2, function() {
	equals( jQuery("#test").css("boxSizing"), "border-box", "returns correct value" );
	equals( jQuery("#test").css("boxSizing","content-box").css("boxSizing"), "content-box", "sets and gets correct value" );
});