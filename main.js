const {crawl_page} = require('./crawler.js');


async function main(){

    if(process.argv.length < 3){
        console.log("No website provided.");
        process.exit(1);
    }

    if(process.argv.length > 3){       
        console.log("Too many arguments!");
        process.exit(1);
    }
    const input_url = process.argv[2];

    console.log(`Starting to crawl :- ${input_url}`);  
    const pages = await crawl_page(input_url, input_url, {});

    console.log(pages);

    for(const page of Object.entries(pages)){
        console.log(page);
    }
    
}   

main();