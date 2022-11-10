$(function() {
//  console.log(localStorage.getItem("cache_weeklyResults-3_2022_58663_1665792000"));
//  console.log(franchiseDatabase);
    console.log("current week",real_ls_week);
    var content = "<table>";
    //starts at week3
    for(i = 3;i < real_ls_week;i++) {
        let formattedWeek = i.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        // var liveScoring,liveStats;
        // const d = new Date();
        // let ms = d.getMilliseconds();
        // $.ajax({
        //     async: false, 
        //     url: "https://www80.myfantasyleague.com/fflnetdynamic2022/live_stats_"+formattedWeek+".txt?RANDOM="+ms,
        //     dataType: 'text',
        //     success: function( data ) {
        //         // if(console)console.log("nickdebug2",data)
        //         liveStats = data
        //     }
        // }).fail(function() {
        //         if(console)console.log( "error" );
        // });
        // $.ajax({
        //     async: false,
        //     url: "https://www80.myfantasyleague.com/2022/export?TYPE=liveScoring&L=58663&W="+i+"&JSON=1",
        //     dataType: 'json',
        //     success: function( data ) {
        //         // if(console)console.log("nickdebug3",data)
        //         liveScoring = data
        //     }
        // }).fail(function() {
        //         if(console)console.log( "error" );
        // });
        switch(i) {
            case 3:
                var maxPointsFranchise = mostTeamPoints(getLiveScoring(i),franchiseDatabase);
                content += '<tr><td>Week 3</td><td>' +  maxPointsFranchise.name + ' -- ' + maxPointsFranchise.score + '</td></tr>';
                break;
            case 4: 
                week4(getLiveScoring(i),getLiveStats(formattedWeek),franchiseDatabase,playerDatabase);
                break;
            case 5:
                var maxKickerPoints = mostKickerPoints(getLiveScoring(i),franchiseDatabase,playerDatabase);
                console.log(maxKickerPoints)
                // content += '<tr><td>Week 5</td><td>' +  maxKickerPoints.name + ' -- ' + maxKickerPoints.score + '</td></tr>';
                break;
            default:
                if(console)console.log("well this isn't good")
        }
        // console.log("nickdebug",liveScoring,liveStats);
    }
    $('#weekly-challenges-box').append(content);
// console.log($.get("https://www80.myfantasyleague.com/fflnetdynamic2022/live_stats_idp_08.txt?RANDOM="+ms));
});

function getLiveStats(formattedWeek) {
    var liveStats;
    const d = new Date();
    let ms = d.getMilliseconds();
    $.ajax({
        async: false, 
        url: "https://www80.myfantasyleague.com/fflnetdynamic2022/live_stats_"+formattedWeek+".txt?RANDOM="+ms,
        dataType: 'text',
        success: function( data ) {
            // if(console)console.log("nickdebug2",data)
            liveStats = data
        }
    }).fail(function() {
            if(console)console.log( "error" );
    });
    return liveStats;
}

function getLiveScoring(week) {
    var liveScoring;
    $.ajax({
        async: false,
        url: "https://www80.myfantasyleague.com/2022/export?TYPE=liveScoring&L=58663&W="+week+"&JSON=1",
        dataType: 'json',
        success: function( data ) {
            // if(console)console.log("nickdebug3",data)
            liveScoring = data
        }
    }).fail(function() {
            if(console)console.log( "error" );
    });
    return liveScoring
}
/*
Week 3 = Most Team Points (Matty - 147.48)
Week 4 = Most All-Purpose Yards
Week 5 = Most Kicker Points
Week 6 = Longest QB TD
Week 7 = Most Team Receptions
Week 8 = Most DEF Points
Week 9 = Most Single Player Receptions
Week 10 = Most Points from Single Tight End
Week 11 = Most Team TD's
Week 12 = Player with Most Points (No QB)
Week 13 = Greatest Win Margin
Week 14 = Player with Most Yards (No QB)
Week 15 = Most Team Points (Non-playoff Team)
Week 16 = Most Team Points (Non-playoff Team)
*/
function mostTeamPoints(liveScoring,franchises) {
    const storageKey = "smashBrosMostTeamPoints";
    var maxScoreFranchise;
    if (localStorage.getItem(storageKey) !== null) {
        maxScoreFranchise = JSON.parse(localStorage.getItem(storageKey));
        console.log(maxScoreFranchise);
        return maxScoreFranchise;
    }
    
    console.log(franchises,maxScoreFranchise);
    for(x in liveScoring.liveScoring.matchup) {
        //console.log(liveScoring.liveScoring.matchup[x])
        for(y in liveScoring.liveScoring.matchup[x].franchise){
            if(maxScoreFranchise === undefined || liveScoring.liveScoring.matchup[x].franchise[y].score > maxScoreFranchise.score){
                maxScoreFranchise = liveScoring.liveScoring.matchup[x].franchise[y]
            }
        }
    }
    console.log(maxScoreFranchise,franchises["fid_"+maxScoreFranchise.id]);
    let maxTeamPoints = {
        ...maxScoreFranchise,
        ...franchises["fid_"+maxScoreFranchise.id],
    }
    localStorage.setItem(storageKey,JSON.stringify(maxTeamPoints))
    return maxTeamPoints;
}

function week4(liveScoring,liveStats,franchises,players) {

}

function mostKickerPoints(liveScoring,franchises,players) {
    const storageKey = "smashBrosMostKickerPoints";
    var mostKickerPoints;
    // console.log("franchises",franchises);
    // console.log("players",players)
    for(x in liveScoring.liveScoring.matchup) {
        for(y in liveScoring.liveScoring.matchup[x].franchise){
            // console.log(liveScoring.liveScoring.matchup[x].franchise[y])
            for(z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
                for(zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]){
                    // console.log("player",liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz])
                    var playerScore = liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
                    var playerInfo = players['pid_'+playerScore.id]
                    // console.log(playerInfo)
                    if(playerInfo.position === "PK"){
                        console.log("playerScore",playerScore,"playerInfo",playerInfo,"mostKickerPoints",mostKickerPoints,"pointsCompare",playerScore.score  > mostKickerPoints.score)
                        if(mostKickerPoints === undefined || playerScore.score  > mostKickerPoints.score){
                            var playerName = playerInfo.name
                            var franchiseName = franchises["fid_"+liveScoring.liveScoring.matchup[x].franchise[y].id].name
                            mostKickerPoints = {
                                playerName,
                                ...playerScore,
                                franchiseName,
                            }
                        }
                    }
                };
            }
        }
    }
    localStorage.setItem(storageKey,JSON.stringify(mostKickerPoints))
    return mostKickerPoints;
}