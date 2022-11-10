$(function() {
    //  console.log(franchiseDatabase);
    // console.log("current week",real_ls_week);
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
    var content = "<table>";
    for(i = 3;i < real_ls_week;i++) {
        let formattedWeek = i.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        switch(i) {
            case 3:
                var maxPointsFranchise = mostTeamPoints(i,franchiseDatabase);
                content += '<tr><td>Week 3</td><td>' +  maxPointsFranchise.name + ' -- ' + maxPointsFranchise.score + '</td></tr>';
                break;
            case 4: 
                // week4(i,getLiveStats(formattedWeek),franchiseDatabase,playerDatabase);
                break;
            case 5:
                var maxKickerPoints = mostPlayerPoints(week,franchiseDatabase,playerDatabase,"PK","smashBrosMostKickerPoints");
                content += '<tr><td>Week 5</td><td>' +  maxKickerPoints.franchiseName + ' -- ' + maxKickerPoints.playerName + ' -- ' + maxKickerPoints.score + '</td></tr>';
                break;
            case 8:
                var maxDefPoints = mostPlayerPoints(week,franchiseDatabase,playerDatabase,"Def","smashBrosMostDefensePoints")
                content += '<tr><td>Week 5</td><td>' +  maxDefPoints.franchiseName + ' -- ' + maxDefPoints.playerName + ' -- ' + maxDefPoints.score + '</td></tr>';
                break;
            default:
                if(console)console.log("well this isn't good "+formattedWeek)
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

function mostTeamPoints(week,franchises) {
    const storageKey = "smashBrosMostTeamPoints";
    var maxScoreFranchise;
    if (localStorage.getItem(storageKey) !== null) {
        maxScoreFranchise = JSON.parse(localStorage.getItem(storageKey));
        return maxScoreFranchise;
    }
    const liveScoring = getLiveScoring(week);
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

function mostPlayerPoints(week,franchises,players,position,storageKey) {
    var mostPlayerPoints;
    if (localStorage.getItem(storageKey) !== null) {
        mostPlayerPoints = JSON.parse(localStorage.getItem(storageKey));
        return mostPlayerPoints;
    }
    const liveScoring = getLiveScoring(week);
    for(x in liveScoring.liveScoring.matchup) {
        for(y in liveScoring.liveScoring.matchup[x].franchise){
            for(z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
                for(zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]){
                    var playerScore = liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
                    var playerInfo = players['pid_'+playerScore.id]
                    if(playerInfo.position === position){
                        if(mostPlayerPoints === undefined || parseFloat(playerScore.score)  > parseFloat(mostPlayerPoints.score)){
                            var playerName = playerInfo.name
                            var franchiseName = franchises["fid_"+liveScoring.liveScoring.matchup[x].franchise[y].id].name
                            mostPlayerPoints = {
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
    localStorage.setItem(storageKey,JSON.stringify(mostPlayerPoints))
    return mostPlayerPoints;
}