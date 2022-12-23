let request = require("request");
let cheerio = require("cheerio");
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";
console.log("Before");
request(url, cb);

function cb(error, response, html){
    if(error){
        console.log(err);
    }else{
        // console.log(html);
        extractHTMl(html);
    }
}
console.log("after");

function extractHTMl(html){
    let $ =  cheerio.load(html);
    let elementsArr = $(".ds-ml-4 .ci-html-content");
    let text = $(elementsArr[0]).text();
    let htmlData = $(elementsArr[0]).html();
    console.log("text data", text);
    console.log("html data", htmlData);
    // console.log(text);
    // console.log(elementArr.length);

}