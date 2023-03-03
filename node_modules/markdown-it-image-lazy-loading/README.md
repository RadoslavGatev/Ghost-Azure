A markdown-it plugin supporting Chrome 75's [native image lazy-loading](https://addyosmani.com/blog/lazy-loading/) and [async decoding](https://github.com/whatwg/html/pull/3221).

## Install

```bash
$ npm install markdown-it-image-lazy-loading
```

## Usage

```javascript
const md = require('markdown-it')();
const lazy_loading = require('markdown-it-image-lazy-loading');
md.use(lazy_loading);

md.render(`![](example.png "image title")`);
// <p><img src="example.png" alt="" title="image title" loading="lazy"></p>\n
```

If you want the `decoding="async"` attribute, enable the plugin's `decoding` option.

```javascript
md.use(lazy_loading, {
  decoding: true,
});

md.render(`![](example.png "image title")`);
// <p><img src="example.png" alt="" title="image title" loading="lazy" decoding="async"></p>\n
```

The plugin can also add `width` and `height` attributes to each image. This can prevent [cumulative layout shifts (CLS)](https://web.dev/cls/):

```javascript
md.use(lazy_loading, {
  image_size: true,

  // Where your images are stored
  base_path: __dirname + 'src/',
});

md.render(`![](example.png "image title")`);
// <p><img src="example.png" alt="" title="image title" loading="lazy" width="100" height="100"></p>\n
```

To keep images responsive, also include the following CSS:
```css
img{
    max-width: 100%;
    height: auto;
}
```

## License

MIT
