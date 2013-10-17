# cssHooks

A collection of cssHooks that work with jQuery 1.4.3+.

Current Hooks:

 * margin and padding
 * backgroundPosition, backgroundPositionX, backgroundPositionY
 * borderRadius, borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft
 * boxShadow, boxShadowColor, boxShadowBlur, boxShadowSpread, boxShadowX, boxShadowY
 * borderImage
 * Alternative Border Radius Plugin with support for IE 6, 7, and 8
 * boxReflect
 * boxSizing
 * textShadow, and textShadowColor, textShadowX, textShadowY, and textShadowBlur
 * color animations for backgroundColor, borderBottomColor, borderLeftColor, borderRightColor, borderTopColor, borderColor, boxShadowColor, color, outlineColor, and textShadowColor
 * columnCount, columnSpan, columnGap, columnWidth, columnRuleColor, columnRuleStyle, columnRuleWidth
 * 2D transforms
 * linear and radial gradients

# Usage

Super simple. Just request the margin, padding, backgroundPosition, boxShadow, etc like you would other CSS properties.

    // #myElement { margin: 1px 2px 3px 4px; }
    $('#myElement').css('margin'); // "1px 2px 3px 4px"

What about setting properties?

    // #myElement { box-shadow: #000 1px 1px 3px; }
    $('#myElement').css('boxShadow', '#ccc 5px 5px');
    $('#myElement').css('boxShadowColor', '#ff5e99');
    $('#myElement').css('boxShadowBlur', '0px');
    $('#myElement').css('borderImage', 'url(image.jpg) 27 27 27 27 round round');

And even animating?!

    $('#myElement').animate({ backgroundPositionY: 100 }, 500);

# What are cssHooks?

jQuery 1.4.3 introduced the concept of cssHooks. They allow you to hook directly into jQuery and override how certain css properties are retrieved or set. This allows for browser normalization or even the creation of your own unique css properties.

## License

The cssHooks plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2013 [Brandon Aaron](http://brandonaaron.net), [Burin Asavesna](http://helloburin.com), [Tom Ellis](http://www.webmuse.co.uk), [Phil Dokas](http://jetless.org) and [Louis-Rémi Babé](http://twitter.com/louis_remi).
