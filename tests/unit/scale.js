module("scale");

test("scale", 1, function() {
  var $test = jQuery("#test");
  // clear transforms in IE
  $test[0].style.filter = "";
  // clear transforms in other browsers
  $test[0].setAttribute('style', '');
  $test.css('scale', '2');
  equals( $test.css("scale"), "2", "returns raw property" );
});
