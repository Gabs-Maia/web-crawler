const {crawl_page} = require('./crawler.js');

function main(){

    if(process.argv.length < 3){
        console.log("no website provided.");
        process.exit(1);
    }

    if(process.argv.length > 3){       
        console.log("too many arguments!");
        process.exit(1);
    }
    const input_url = process.argv[2];

    console.log(`Starting to crawl :- ${input_url}`);  
    const pages = crawl_page(input_url, input_url, {});

    for(const page of pages){
        console.log(page);
    }
    
}   

main();