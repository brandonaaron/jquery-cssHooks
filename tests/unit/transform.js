module("transform");

test("transform", 1, function() {
  var $test = jQuery("#test");
  // clear transforms in IE
  $test[0].style.filter = "";
  // clear transforms in other browsers
  $test[0].setAttribute('style', '');
  $test.css('transform', 'rotate(90deg) scale(2) translateX(100px)');
  ok( ~jQuery("#test").css("transform").indexOf('matrix'), "computed matrix is not 'none'" );
});
