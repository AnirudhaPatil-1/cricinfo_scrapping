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
    let teamsBatBowlTable = $(".ds-rounded-lg.ds-mt-2 .ds-p-0");
    let currentHTML = "";
    currentHTML += $(teamsBatBowlTable).html();
    // console.log(currentHTML);
    // console.log(teamsBatBowlTable.length);
    let htmlStr = "";
    
    let batting = $(teamsBatBowlTable).find(".ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table");
    // console.log(batting.length);
    let rows = $(batting[0]).find("tbody>tr");
    // console.log(rows.length);
    let links = [];
    for(let i = 0; i < rows.length; i++){
        let isLink = $(rows[i]).find("a").hasClass("ds-inline-flex ds-items-start ds-leading-none");
        // console.log(isLink);
        if(isLink == true){
            let playerHref = $(rows[i]).find("a").attr("href");
            // console.log(playerHref);
            let fullLink = "https://www.espncricinfo.com/" + playerHref;
            links.push(fullLink); 
            getBirthdayPage(fullLink);       
        } 
        // let playerName = $(rows[i]).find("span").text();
        // playerName = playerName[0];
        
        // console.log("playerName: " + playerName);
        // let playerHref = $(rows[i]).find("a").attr("href");
        // console.log(playerName + "link: " + playerHref);
        // console.log(playerHref);
    }
    


    

}

function  getBirthdayPage(url){
    request(url, cb);
    function cb(err, response, html){
        if(err){
            console.log(err);
        }else{
            extractBirthday(html);
        }
    }
}

function extractBirthday(html){
    let $ = cheerio.load(html);
    let playerNameBox = $(".ds-pt-8.ds-px-6.ds-pb-2.ds-text-raw-white");
    // console.log(playerNameBox.length);
    let playerName = $(playerNameBox).find(".ds-text-title-l.ds-font-bold").text();
    // console.log(playerName);
    let playerBox = $(".ds-grid.ds-grid-cols-2.ds-gap-4.ds-mb-8");
    let playerDetailsArr = $(playerBox).find(".ds-text-title-s.ds-font-bold.ds-text-ui-typo");
    let playerBD = $(playerDetailsArr[1]).text();

    // console.log( playerName + " " + playerBD);
    console.log(`${playerName}  was born on ${playerBD}`);
    // console.log(playerPerDetails.length);

}

