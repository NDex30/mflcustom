$(function() {
//  console.log(franchiseDatabase);
    console.log("current week",real_ls_week);
    var content = "<table>";
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
    for(i = 3;i < real_ls_week;i++) {
        let formattedWeek = i.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        const liveScoring = getLiveScoring(i);
        switch(i) {
            case 3:
                var maxPointsFranchise = mostTeamPoints(liveScoring,franchiseDatabase);
                content += '<tr><td>Week 3</td><td>' +  maxPointsFranchise.name + ' -- ' + maxPointsFranchise.score + '</td></tr>';
                break;
            case 4: 
                week4(liveScoring,getLiveStats(formattedWeek),franchiseDatabase,playerDatabase);
                break;
            case 5:
                var maxKickerPoints = mostPlayerPoints(liveScoring,franchiseDatabase,playerDatabase,"PK","smashBrosMostKickerPoints");
                content += '<tr><td>Week 5</td><td>' +  maxKickerPoints.franchiseName + ' -- ' + maxKickerPoints.playerName + ' -- ' + maxKickerPoints.score + '</td></tr>';
                break;
            case 8:
                var maxDefPoints = mostPlayerPoints(liveScoring,franchiseDatabase,playerDatabase,"Def","smashBrosMostDefensePoints")
                content += '<tr><td>Week 5</td><td>' +  maxDefPoints.franchiseName + ' -- ' + maxDefPoints.playerName + ' -- ' + maxDefPoints.score + '</td></tr>';
                break;
            default:
                if(console)console.log("well this isn't good")
        }
    }
    $('#weekly-challenges-box').append(content);
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

function mostTeamPoints(liveScoring,franchises) {
    const storageKey = "smashBrosMostTeamPoints";
    var maxScoreFranchise;
    if (localStorage.getItem(storageKey) !== null) {
        maxScoreFranchise = JSON.parse(localStorage.getItem(storageKey));
        return maxScoreFranchise;
    }
    for(x in liveScoring.liveScoring.matchup) {
        for(y in liveScoring.liveScoring.matchup[x].franchise){
            if(maxScoreFranchise === undefined || parseFloat(liveScoring.liveScoring.matchup[x].franchise[y].score) > parseFloat(maxScoreFranchise.score)){
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

function mostPlayerPoints(liveScoring,franchises,players,position,storageKey) {
    // const storageKey = "smashBrosMostKickerPoints";
    var mostKickerPoints;
    if (localStorage.getItem(storageKey) !== null) {
        mostKickerPoints = JSON.parse(localStorage.getItem(storageKey));
        return mostKickerPoints;
    }
    for(x in liveScoring.liveScoring.matchup) {
        for(y in liveScoring.liveScoring.matchup[x].franchise){
            for(z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
                for(zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]){
                    var playerScore = liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
                    var playerInfo = players['pid_'+playerScore.id]
                    if(playerInfo.position === position){
                        if(mostKickerPoints === undefined || parseFloat(playerScore.score)  > parseFloat(mostKickerPoints.score)){
                            var playerName = playerInfo.name
                            var franchiseName = franchises["fid_"+liveScoring.liveScoring.matchup[x].franchise[y].id].name
                            mostKickerPoints = {
                                playerName,
                                ...playerScore,
                                franchiseName,
                            };
                        }
                    }
                };
            }
        }
    }
    localStorage.setItem(storageKey,JSON.stringify(mostKickerPoints))
    return mostKickerPoints;
}

function mostDefensePoints(liveScoring,franchises,players) {
    const storageKey = "smashBrosMostDefensePoints";
    var mostDefPoints;
    if (localStorage.getItem(storageKey) !== null) {
        mostDefPoints = JSON.parse(localStorage.getItem(storageKey));
        return mostDefPoints;
    }
    console.log(players)
    for(x in liveScoring.liveScoring.matchup) {
        for(y in liveScoring.liveScoring.matchup[x].franchise){
            for(z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
                for(zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]){
                    var playerScore = liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
                    var playerInfo = players['pid_'+playerScore.id]
                    if(playerInfo.position === "Def"){
                        if(mostDefPoints === undefined || parseFloat(playerScore.score)  > parseFloat(mostDefPoints.score)){
                            var playerName = playerInfo.name
                            var franchiseName = franchises["fid_"+liveScoring.liveScoring.matchup[x].franchise[y].id].name
                            mostDefPoints = {
                                playerName,
                                ...playerScore,
                                franchiseName,
                            };
                        }
                    }
                };
            }
        }
    }
    localStorage.setItem(storageKey,JSON.stringify(mostDefPoints))
    return mostDefPoints;
}