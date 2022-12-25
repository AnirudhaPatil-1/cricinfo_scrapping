const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");
request(url, cb);

function cb(err, response, html){
    if(err){
        console.log(err);
    }else{
        extractHTML(html);
    }
}

function extractHTML(html){
    let $ = cheerio.load(html);
    // let teams = [];
    let teamsArr = $(".ds-w-full.ds-bg-fill-content-prime.ds-overflow-hidden.ds-border.ds-border-line.ds-mb-4");
    // console.log(teamsArr.length);
    for(let i = 0; i < teamsArr.length; i++){
        let hasClass = $(teamsArr[i]).hasClass(".ds-flex.ds-px-4.ds-border-b.ds-border-line.ds-py-3.ds-bg-ui-fill-translucent-hover");
        if(hasClass == true){
            // let team = teamsArr[i];
            // console.log(team.length);
            
        }
    }
    console.log(teamsArr.length);

}