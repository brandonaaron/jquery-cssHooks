(function($) {
	var props = "Color X Y Blur".split(' '),
		support = $.support,
		rWhitespace = /\s/,
		div = document.createElement('div'),
		divStyle = div.style;

	support.textShadow = (divStyle.textShadow === '');
	div = null;

	if ($.cssHooks && support.textShadow) {
		$.each(props, function(i, suffix) {
			var hook = 'textShadow' + suffix;
			
			$.cssHooks[hook] = {
				get: function(elem, computed, extra) {
					return (function(elem, pos) {
						var shadow = $.css(elem, 'textShadow'),
							color = $.color.normalize(shadow),
							ret;

						if (pos === 0) {
							ret = 'rgb'
									+ (color.alpha ? 'a' : '') + '('
									+ color.r + ', '
									+ color.g + ', '
									+ color.b
									+ (color.alpha ? ', ' + color.alpha : '')
									+ ')';
						}
						else {
							ret = $.trim(shadow.replace(color.source, '')).split(rWhitespace)[pos - 1];
						}
						
						return ret;
					})(elem, i);
				},
				set: function(elem, value) {
					elem.style.textShadow = (function(string, value, index) {
						var color_part = $.style(elem, 'textShadowColor'),
							parts = string.replace(color_part, '').split(rWhitespace),
							ret;
						
						if (index === 0) {
							color_part = value;
						} else {
							parts[index] = value;
						}
						
						return color_part + parts.join(' ');
					})($.css(elem, 'textShadow'), value, i);
				}
			};
			
			if (i !== 0) {
				$.fx.step[hook] = function(fx) {
					$.cssHooks[hook].set(fx.elem, fx.now + fx.unit);
				};
			}
		});
	}
})(jQuery);
