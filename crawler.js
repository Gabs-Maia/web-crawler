//Normalize urls when needed...
const axios = require('axios');
const cheerio = require('cheerio');
const {JSDOM} = require('jsdom');

async function crawl_page(current_url){
    try{
        const response = await fetch(current_url);
        if(response.status > 399){
            console.log(`Error found on page :- ${current_url}`);
            return
        }

        let content_type = response.headers.get("content-type");
        if(!content_type.includes("text/html")){
            console.log();
            return
        }

    }catch (error){
        console.error('msg')
    }
}

function get_urls_from(html_body, input_url){

    const urls = [];
    const dom = new JSDOM(html_body);
    const links = dom.window.document.querySelectorAll('a');

    for(const link of links){

        if(link.href.slice(0, 1) === '/'){

            try{
                const url_obj = new URL(`${input_url}${link.href}`);
                urls.push(url_obj.href);
            }catch(err){
                console.log(`error with relative url :- ${err.message}`);
            }
        }else{
            try{

                const url_obj = new URL(link.href);
                urls.push(url_obj.href);
            }catch (err){
                console.log(`error with absolute url :- ${err.message}`);
            }
        }
    }
    return urls;
}

async function get_urls(url){
    try{
    let urls = [];
    let{data} = await axios.get(url);
    let load = cheerio.load(data);
    let a_tags = load("body");

    for(let i = 0; i < a_tags.length; i ++){

        let href = load(a_tags).find("a").attr("href");

        if(href !== null){
            urls.push(href);
        }else{
            return urls;
        }
    }
    return urls;    
}catch(error){
    console.error(`Could not conclude the operations due to :- ${error}`);
}
}

function normalURL(url_string){
    
    const objURL = new URL(url_string);
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