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
						var color_part = $.css(elem, 'textShadowColor'),
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
		
		// $.fx.step.textShadow = function(fx) {
		// 	var css = $.css(fx.elem, 'textShadow'),
		// 		color_part = $.color.normalize(css).source,
		// 		parts = css.replace(color_part, '').split(rWhitespace),
		// 		css_props = {},
		// 		options = {
		// 			duration: fx.options.duration,
		// 			easing: fx.options.easing,
		// 			complete: fx.options.complete,
		// 			step: fx.options.step,
		// 			queue: fx.options.queue,
		// 			specialEasing: fx.options.specialEasing
		// 		};
		// 		
		// 	// console.log(fx.pos, fx);
		// 	// console.log('css', css)
		// 	// console.log('color', color_part)
		// 	// console.log('parts', parts)
		// 	
		// 	$.each(props, function(i, suffix) {
		// 		css_props['textShadow' + suffix] = (i === 0) ? color_part : parts[i];
		// 	});
		// 	
		// 	// console.log('properties', css_props);
		// 	// console.log('options', options)
		// 	
		// 	$(fx.elem).animate(css_props, options);
		// };
	}
})(jQuery);
