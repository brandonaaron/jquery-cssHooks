module("boxSizing");

test("boxSizing", 2, function() {
	equal( jQuery("#test").css("boxSizing"), "border-box", "returns correct value" );
	equal( jQuery("#test").css("boxSizing","content-box").css("boxSizing"), "content-box", "sets and gets correct value" );
});