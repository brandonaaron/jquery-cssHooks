module("transform");

$(function() {
  jQuery("#test").css('transform', 'rotate(90deg) scale(2) translateX(100px)');
});

test("transform", 2, function() {
    equals( jQuery("#test").css("transform"), "rotate(90deg) scale(2) translateX(100px)", "returns raw property" );
    jQuery("#test").css('transform', 'skew(45deg)');
    equals( jQuery("#test").css("transform"), "rotate(90deg) scale(2) translateX(100px) skew(45deg)", "appends new property" );
});
