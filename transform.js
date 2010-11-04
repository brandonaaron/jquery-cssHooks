// Translate will never work in Internet Explorer versions prior to IE9, be warned.
(function($) {

var div = document.createElement('div'),
  divStyle = div.style,
  support = $.support;

support.transform = 
  divStyle.MozTransform === ''? 'MozTransform' :
  (divStyle.MsTransform === ''? 'MsTransform' :
  (divStyle.WebkitTransform === ''? 'WebkitTransform' : 
  (divStyle.OTransform === ''? 'OTransform' :
  (divStyle.transform === ''? 'transform' :
  false))));
support.matrixFilter = !support.transform && divStyle.filter === '';
div = null;

// additive transform
$.cssHooks.transform = {
  set: function( elem, value ) {
    var _support = support,
      supportTransform = _support.transform;

    // TODO: parse transformation string to keep track of each transform property
    if (supportTransform && supportTransform != 'transform') {
      elem.style[supportTransform] += ' ' + value;

    } else if (support.matrixFilter) {
      
    }
  },
  get: function( elem, value ) {
    var _support = support,
      supportTransform = _support.transform;

    if (supportTransform && supportTransform != 'transform') {
      return elem.style[supportTransform];

    } else if (support.matrixFilter) {
      
    }
  }
}

// TODO: replacing transform
/*$.each("rotate scale scaleX scaleY skew skewX skewY translate translateX translateY".split(" "), function(i, property){

});*/

})(jQuery);