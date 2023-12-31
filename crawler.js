//Normalize urls when needed...
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

    normalURL
}