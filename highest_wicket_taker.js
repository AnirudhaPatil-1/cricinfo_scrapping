const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");
request(url, cb);
// console.log("before");
function cb(err, response, html){
    if(err){
        console.log(err);
    }else{
        extractHTML(html);
    }
}

function extractHTML(html){
    let $ = cheerio.load(html);
    //$ does the full page search
    let teamsArr = $(".ci-team-score.ds-flex.ds-justify-between.ds-items-center.ds-text-typo-title.ds-mb-2");
    for(let i = 0; i < teamsArr.length; i++){
        let hasClass = $(teamsArr[i]).hasClass("ds-opacity-50");
        if(hasClass == false){
            //winning team
            //find does the search inside a container
            let teamNameElem = $(teamsArr[i]).find(".ds-font-bold");
            console.log(teamNameElem.text());
        }
    }
}

// console.log("after");