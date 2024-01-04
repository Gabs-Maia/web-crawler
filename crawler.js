const {JSDOM} = require('jsdom');
//  const fetch = require('node-fetch')

async function crawl_page(base_url, current_url, pages){
    console.log(`Crawling page :- ${current_url}`);

    const base_url_obj = new URL(base_url);
    const current_url_obj = new URL(current_url);

    if(base_url_obj.hostname !== current_url_obj.hostname){
        return pages;
    }
    const normal_current_url = normalURL(current_url);
    if(pages[normal_current_url] > 0){
        pages[normal_current_url]++;
        return pages;
    }
    pages[normal_current_url] = 1;
    console.log(`NOW... Crawling :- ${current_url}`);

    try{
        const response = await fetch(current_url);
        if(response.status > 399){
            console.log(`Error found on PAGE :- ${current_url} --> ${response.status}`);
            return pages
        }
        const content_type = response.headers.get("content-type");
        if(!content_type.includes("text/html")){
            console.log(`Non HTML response, CONTENT TYPE: ${response.status} On Page: ${current_url}`);
            return pages
        }
        const html_body = await response.text();
        const next_urls = get_urls_from(html_body, base_url);

        for(const next_url of next_urls) {
             pages = await crawl_page(base_url, next_url, pages);
        }
    }catch (error){
        console.log(`> Error :- ${error.message}, ON page: ${current_url}`);
    }
    return pages;
}

function get_urls_from(html_body, base_url){

    const urls = [];
    const dom = new JSDOM(html_body);
    const links = dom.window.document.querySelectorAll('a');

    for(const link of links){
        if(link.href.slice(0, 1) === '/'){
            try{
                const url_obj = new URL(`${base_url}${link.href}`);
                urls.push(url_obj.href);
            }catch(err){
                console.log(`Problem(s) with **RELATIVE** url :- ${err.message}`);
            }
        }else{
            try{
                const url_obj = new URL(link.href);
                urls.push(url_obj.href);
            }catch (err){
                console.log(`Problem(s) with **ABSOLUTE** url :- ${err.message}`);
            }
        }
    }
    return urls;
}

function normalURL(base_url){    
    const objURL = new URL(base_url);
    const hostPath = `${objURL.hostname}${objURL.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(0,-1) === '/'){
        //no last character
        return hostPath.slice(0, -1);
    }
    return hostPath;
}
module.exports = {

    normalURL,
    get_urls_from,
    crawl_page
}
