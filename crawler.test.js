const {normalURL, get_urls_from} = require('./crawler.js')
const {test, expect} = require('@jest/globals')

test('normalURL strip', () => {
    const input_url = 'https://blog.boot.dev/path';
    const output_url = normalURL(input_url);
    const expected_url = 'blog.boot.dev/path';
    //comparing urls in output and expectations... Jest will test it.
    expect(output_url).toEqual(expected_url);
})

test('normalURL strip trailing slash', () => {
    const input_url = 'https://blog.boot.dev/path/';
    const output_url = normalURL(input_url);
    const expected_url = 'blog.boot.dev/path/';
    expect(output_url).toEqual(expected_url);
})

test('normalURL capitals', () => {
    const input_url = 'https://BLOG.boot.dev/path';
    const output_url = normalURL(input_url);
    const expected_url = 'blog.boot.dev/path';
    expect(output_url).toEqual(expected_url);
})

test('normalURL strip http', () => {
    const input_url = 'http://blog.maia.dev/path';
    const output_url = normalURL(input_url);
    const expected_url = 'blog.maia.dev/path';
    expect(output_url).toEqual(expected_url);
})

test('get_urls_from', () =>{
    const html_body = `
    <html>
        <body>
            <a href="https://blog.maia.dev/">
                Maia.dev blog
            </a>
        </body>
    </html>
    `
    const input_url = "https://blog.maia.dev"
    const outputed = get_urls_from(html_body, input_url);
    const expected = ["https://blog.maia.dev/"];
    expect(outputed).toEqual(expected);
})

test('get_urls_from absolute', () =>{
    const html_body = `
    <html>
        <body>
            <a href="https://blog.maia.dev/path/">
                Maia.dev blog
            </a>
        </body>
    </html>
    `
    const input_url = "https://blog.maia.dev/path/"
    const outputed = get_urls_from(html_body, input_url);
    const expected = ["https://blog.maia.dev/path/"];
    expect(outputed).toEqual(expected);
})

test('get_urls_from relative', () =>{
    const html_body = `
    <html>
        <body>
            <a href="/path/">
                Maia.dev blog
            </a>
        </body>
    </html>
    `
    const input_url = "https://blog.maia.dev"
    const outputed = get_urls_from(html_body, input_url);
    const expected = ["https://blog.maia.dev/path/"];
    expect(outputed).toEqual(expected);
})

test('get_urls_from both', () =>{
    const html_body = `
    <html>
        <body>
            <a href="https://blog.maia.dev/path1/">
                Maia.dev blog path one
            </a>
            <a href="/path2/">
                Maia.dev blog path two
            </a>
        </body>
    </html>
    `
    const input_url = "https://blog.maia.dev"
    const outputed = get_urls_from(html_body, input_url);
    const expected = ["https://blog.maia.dev/path1/", "https://blog.maia.dev/path2/"];
    expect(outputed).toEqual(expected);
})

test('get_urls_from invalid', () =>{
    const html_body = `
    <html>
        <body>
            <a href="invalid">
                Invalid URL
            </a>
        </body>
    </html>
    `
    const input_url = "https://blog.maia.dev"
    const outputed = get_urls_from(html_body, input_url);
    const expected = [];
    expect(outputed).toEqual(expected);
})

