# cssHooks

A collection of cssHooks that work with jQuery 1.4.3+.

Currently normalizes the margin, padding, backgroundPosition, backgroundPositionX, and backgroundPositionY css getters and setters.

# Usage

Super simple. Just request the margin, padding, backgroundPosition, backgroundPositionX, and/or backgroundPositionY like you would other CSS properties.

    // #myElement { margin: 1px 2px 3px 4px; }
    $('#myElement').css('margin'); // "1px 2px 3px 4px"

What about setting properties?

    // #myElement { box-shadow: #000 1px 1px 3px; }
    $('#myElement').css('boxShadow', '#ccc 5px 5px');
    $('#myElement').css('boxShadowColor', '#ff5e99');
    $('#myElement').css('boxShadowBlur', '0px');

# What are cssHooks?

jQuery 1.4.3 introduced the concept of cssHooks. They allow you to hook directly into jQuery and override how certain css properties are retrieved or set. This allows for browser normalization or even the creation of your own unique css properties.

## License

The cssHooks plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2010 [Brandon Aaron](http://brandonaaron.net) and [Burin Asavesna](http://helloburin.com)
