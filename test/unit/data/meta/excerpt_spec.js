const should = require('should');
const getExcerpt = require('../../../../core/frontend/meta/excerpt');

describe('getExcerpt', function () {
    it('should return html excerpt with no html', function () {
        const html = '<p>There are <br />10<br> types<br/> of people in <img src="a">the world:' +
                '<img src=b alt="c"> those who <img src="@" onclick="javascript:alert(\'hello\');">' +
                'understand trinary,</p> those who don\'t <div style="" class=~/\'-,._?!|#>and' +
                '< test > those<<< test >>> who mistake it &lt;for&gt; binary.';

        const expected = 'There are 10  types of people in the world: those who understand trinary,  those who ' +
            'don\'t and those>> who mistake it &lt;for&gt; binary.';

        getExcerpt(html, {}).should.equal(expected);
    });

    it('should return html excerpt strips multiple inline footnotes', function () {
        const html = '<p>Testing<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>, ' +
                'my footnotes. And stuff. Footnote<sup id="fnref:2"><a href="#fn:2" ' +
                'rel="footnote">2</a></sup><a href="http://google.com">with a link</a> ' +
                'right after.';

        const expected = 'Testing, my footnotes. And stuff. Footnotewith a link right after.';

        getExcerpt(html, {}).should.equal(expected);
    });

    it('should return html excerpt striping inline and bottom footnotes', function () {
        const html = '<p>Testing<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a>' +
                '</sup> a very short post with a single footnote.</p>\n' +
                '<div class="footnotes"><ol><li class="footnote" id="fn:1"><p>' +
                '<a href="https://ghost.org">https://ghost.org</a> <a href="#fnref:1" ' +
                'title="return to article">↩</a></p></li></ol></div>';

        const expected = 'Testing a very short post with a single footnote.';

        getExcerpt(html, {}).should.equal(expected);
    });

    it('should return html excerpt truncated by word', function () {
        const html = '<p>Hello <strong>World! It\'s me!</strong></p>';
        const expected = 'Hello World!';

        getExcerpt(html, {words: '2'}).should.equal(expected);
    });

    it('should return html excerpt truncated by words with non-ascii characters',
        function () {
            const html = '<p>Едквюэ опортэат <strong>праэчынт ючю но, квуй эю</strong></p>';
            const expected = 'Едквюэ опортэат';

            getExcerpt(html, {words: '2'}).should.equal(expected);
        });

    it('should return html excerpt truncated by character',
        function () {
            const html = '<p>Hello <strong>World! It\'s me!</strong></p>';
            const expected = 'Hello Wo';

            getExcerpt(html, {characters: '8'}).should.equal(expected);
        });

    it('should fall back to 50 words if not specified',
        function () {
            const html = '<p>There are <br />10<br> types<br/> of people in <img src="a">the world:' +
                    '<img src=b alt="c"> those who <img src="@" onclick="javascript:alert(\'hello\');">' +
                    'understand trinary,</p> those who don\'t <div style="" class=~/\'-,._?!|#>and' +
                    '< test > those<<< test >>> who mistake it &lt;for&gt; binary.';

            const expected = 'There are 10  types of people in the world: those who understand trinary,  those who ' +
                'don\'t and those>> who mistake it &lt;for&gt; binary.';

            getExcerpt(html).should.equal(expected);
        });

    it('should truncate plain text for custom excerpts',
        function () {
            const html = 'This is a custom excerpt. It should always be rendered in full length and not being cut ' +
                       'off. The maximum length of a custom excerpt is 300 characters. Enough to tell a bit about ' +
                       'your story and make a nice summary for your readers. It\s only allowed to truncate anything ' +
                       'after 300 characters. This give';

            const expected = 'This is a custom excerpt. It should always be rendered in full length and not being cut ' +
                       'off. The maximum length of a custom excerpt is 300 characters. Enough to tell a bit about ' +
                       'your story and make a nice summary for your readers. It\s only allowed to truncate anything ' +
                       'after 300 characters. This give';

            getExcerpt(html, {characters: '300'}).should.equal(expected);
        });
});
