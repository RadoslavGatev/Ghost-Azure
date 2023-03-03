# Downsize

Tag-safe HTML and XML text-truncation!

```sh
npm install downsize
```

## Usage

### Word-truncation

```javascript
downsize("<p>some markup here...</p>",{"words": 2});
```

```html
<p>some markup</p>
```

### Character truncation

```javascript
downsize("<p>some markup here...</p>",{"characters": 6});
```

```html
<p>some m</p>
```

### Appending an ellipsis

```javascript
downsize("<p>some markup here...</p>",{"characters": 6, "append": "..."});
```

```html
<p>some m...</p>
```

### Rounding to the end of the paragraph

```javascript
downsize("<p>Why, hello there!</p><p>Hello again!</p>",{"characters": 6, round:true});
```

```html
<p>Why, hello there!</p>
```

## Notes

Downsize is designed to handle bad markup, and should count words and 
characters accurately in spite of it. But it won't hold your hand.

It does close outstanding open tags for you, but leaves erroneous close-tags 
for which the opening tag couldn't be found or was erroneously nested.

## Testing

```sh
npm test
```

## Maintainers

* [Christopher Giffard]([http://github.com/cgiffard)
* [Adam Zethraeus]([http://github.com/zethraeus)

[Thanks also to all the contributors!](https://github.com/cgiffard/Downsize/graphs/contributors)