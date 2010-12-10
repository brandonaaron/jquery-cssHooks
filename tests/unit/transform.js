module("transform");

test("transform", 2, function() {
  var $test = jQuery("#test");
  // clear transforms in IE
  $test[0].style.filter = "";
  // clear transforms in other browsers
  $test[0].setAttribute('style', '');
  $test.css('transform', 'rotate(90deg) scale(2) translateX(100px)');
  equals( jQuery("#test").css("transform"), "rotate(90deg) scale(2) translateX(100px)", "returns raw property" );
  jQuery("#test").css('transform', 'skew(45deg)');
  equals( jQuery("#test").css("transform"), "rotate(90deg) scale(2) translateX(100px) skew(45deg)", "appends new property" );
});
