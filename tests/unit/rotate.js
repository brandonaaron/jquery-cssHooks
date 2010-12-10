module("rotate");

test("rotate", 1, function() {
  var $test = jQuery("#test");
  // clear transforms in IE
  $test[0].style.filter = "";
  // clear transforms in other browsers
  $test[0].setAttribute('style', '');
  $test.css('rotate', '2rad');
  equals( $test.css("rotate"), "2", "returns raw property" );
});
