const {normalURL} = require('./crawler.js')
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