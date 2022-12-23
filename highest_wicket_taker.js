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
    let winningTeamName;
    for(let i = 0; i < teamsArr.length; i++){
        let hasClass = $(teamsArr[i]).hasClass("ds-opacity-50");
        if(hasClass == false){
            //winning team
            //find does the search inside a container
            let teamNameElem = $(teamsArr[i]).find(".ds-font-bold");
            winningTeamName = teamNameElem.text().trim();
            // console.log(teamNameElem.text());
        }
    }
    let inningsArr = $(".ds-rounded-lg.ds-mt-2");
    let htmlStr = "";
    for(let i = 0; i < inningsArr.length; i++){
        // let currentHTML = $(inningsArr[i]).html();
        // htmlStr += currentHTML;
        //team names
        let teamNameElem = $(inningsArr[i]).find(".ds-text-title-xs.ds-font-bold.ds-capitalize");
        let teamName = teamNameElem.text();
        // console.log(teamName);
        teamName = teamName.trim();
        //team table
        //console.log(teamName);


        let highestWicketTaken = 0;
        let highestWicketTakerName = "";
        if(teamName == winningTeamName){
            //winning team 
            // console.log(teamName); 
            let winningTeamTables = $(inningsArr[i]).find(".ds-w-full.ds-table.ds-table-md.ds-table-auto");
            // console.log(winningTeamTables.length);
            for(let i = 0; i < winningTeamTables.length; i++){
                let hasClass = $(winningTeamTables[i]).hasClass("ci-scorecard-table");
                if(hasClass == false){
                    // bowling table
                    let wBowlingTable = winningTeamTables[i];
                    // console.log(wBowlingTable);
                    let allBowlers = $(wBowlingTable).find("tr");
                    // console.log(allBowlers.length);
                    for(let j = 0; j < allBowlers.length; j++){
                        let allColsOfPlayer = $(allBowlers[j]).find("td");
                        // console.log(allColsOfPlayer.length);
                        let playerName = $(allColsOfPlayer[0]).text();
                        let wickets = $(allColsOfPlayer[4]).text();
                        // console.log(playerName + " " + wickets);
                        if(wickets >= highestWicketTaken){
                            highestWicketTaken = wickets;
                            highestWicketTakerName = playerName;
                        }
                    } 
                    console.log(`Winning team ${winningTeamName} playerName: ${highestWicketTakerName} wickets: ${highestWicketTaken}`);

                }
            }
        }
    }
    // console.log(htmlStr);

}

// console.log("after");