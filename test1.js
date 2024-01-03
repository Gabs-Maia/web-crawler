const axios = require('axios');
const fs = require('fs');

let url = "https://en.wikipedia.org/wiki/Karl_Marx";

async function test_url_data(url){
    try{
        const {data} = await axios.get(url);
        fs.writeFileSync("example.txt", data);

    }catch (error){
        console.error(`An error was found :- ${error}`);
    }
}

test_url_data(url);