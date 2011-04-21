(function($) {
	var propStr = 'textShadow',
		colorStr = 'Color',
		props = (colorStr + " X Y Blur").split(' '),
		support = $.support,
		rWhitespace = /\s/,
		div = document.createElement('div'),
		divStyle = div.style;

	support.textShadow = (divStyle.textShadow === '');
	div = divStyle = null;

	if ($.cssHooks && support.textShadow) {
		$.each(props, function(i, suffix) {
			var hook = propStr + suffix;
			
			$.cssHooks[hook] = {
				get: function(elem, computed, extra) {
					return (function(elem, pos, prop) {
						var shadow = $.css(elem, propStr),
							color = $.color.normalize(shadow),
							ret;

						if (prop === colorStr) {
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
					})(elem, i, suffix);
				},
				set: function(elem, value) {
					elem.style.textShadow = (function(string, value, index) {
						var color_part = $.style(elem, propStr + colorStr),
							parts = string.replace(color_part, '').split(rWhitespace),
							ret;
						
						if (index === 0) {
							color_part = value;
						} else {
							parts[index] = value;
						}
						
						return color_part + parts.join(' ');
					})($.css(elem, propStr), value, i);
				}
			};
			
			if (suffix !== colorStr) {
				$.fx.step[hook] = function(fx) {
					$.cssHooks[hook].set(fx.elem, fx.now + fx.unit);
				};
			}
		});
	}
})(jQuery);
