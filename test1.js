const axios = require('axios');
const fs = require('fs');
const {get_urls_from, normalURL} = require('./crawler.js');

const current_url = "https://en.wikipedia.org/wiki/Karl_Marx";

async function test_url_data(url){
    try{
        const {data} = await axios.get(url);
        fs.writeFileSync("example.txt", data);

    }catch (error){
        console.error(`An error was found :- ${error}`);
    }
}

async function crawl_page(base_url, current_url, pages){
    console.log(`Crawling page :- ${current_url}`);

    const base_url_obj = new URL(base_url);
    const current_url_obj = new URL(current_url);
    //debug
    console.log(base_url_obj && current_url_obj);

    if(base_url_obj.hostname !== current_url_obj.hostname){
        return pages;
    }
    //debug
    console.log(pages);

    const normal_current_url = normalURL(current_url);
    //debug
    console.log(normal_current_url);

    if(pages[normal_current_url] > 0){
        pages[normal_current_url]++;
        return pages;
    }
    //debug
    console.log(pages);

    pages[normal_current_url] = 1;
    console.log(`NOW... Crawling :- ${current_url}`);

    try{
        const response = await fetch(current_url);
        //debug
        console.log(response);

        if(response.status > 399){
            console.log(`Error found on PAGE :- ${current_url} --> ${response.status}`);
            return pages
        }
        //debug
        console.log(pages);

        const content_type = response.headers.get("content-type");
        //debug
        console.log(content_type);

        if(!content_type.includes("text/html")){
            console.log(`No HTML response, CONTENT TYPE: ${response.status} On Page: ${current_url}`);
            return pages
        }
        //debug
        console.log(pages);

        const html_body = await response.text();
        //debug
        console.log(html_body);

        const next_urls = get_urls_from(html_body, base_url);
        //debug
        console.log(next_urls);

        for(const next_url of next_urls) {
            const pages = await crawl_page(base_url, next_url, pages);
            //debug
            console.log(pages);
        }
    }catch (error){
        console.log(`> Error :- ${error.message}, ON page: ${current_url}`);
    }
    return pages;
    //debug
    console.log(pages);
}

crawl_page();
