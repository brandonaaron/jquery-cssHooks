module("transform");

test("transform", 2, function() {
  var $test = jQuery("#test");
  // clear transforms in IE
  $test[0].style.filter = "";
  // clear transforms in other browsers
  $test[0].setAttribute('style', '');
  $test.css('transform', 'rotate(90deg) scale(2) translateX(100px)');
  equals( jQuery("#test").css("transform"), {
      translate: [100, 0],
      rotate: Math.PI/2,
      scale: [2,2],
      skew: [0,0]
    }, "returns properties as an object" );
  jQuery("#test").css('transform', 'skew(45deg)');
  equals( jQuery("#test").css("transform"), {
      translate: [100, 0],
      rotate: Math.PI/2,
      scale: [2,2],
      skew: [Math.PI/4,0]
    }, "appends new property" );
});
