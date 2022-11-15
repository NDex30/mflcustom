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
    var content = '<table align="center" cellpadding="2" width="100%">';
    for(i = 3;i < real_ls_week;i++) {
        let formattedWeek = i.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        switch(i) {
            case 3:
                var maxPointsFranchise = mostTeamPoints(i,franchiseDatabase);
                content += '<tr><td colspan=2><h3>Week '+i+': Most Team Points</h3></td></tr>';
                content += '<tr><td>' +  maxPointsFranchise.name + '</td><td>' + maxPointsFranchise.score + '</td></tr>';
                break;
            case 4: 
                var maxAllPurposeYards = mostAllPurposeYards(i,formattedWeek,franchiseDatabase,playerDatabase,"smashBrosMostAllPurposeYards");
                // console.log("MAX ALL PURPOSE YARDS",maxAllPurposeYards);
                content += '<tr><td colspan=2><h3>Week '+i+': Most All-Purpose Yards</h3></td></tr>';
                content += '<tr><td>' +  maxAllPurposeYards.name + '</td><td>' + maxAllPurposeYards.totalFranchiseYards + '</td></tr>';
                break;
            case 5:
                var maxKickerPoints = mostPlayerPoints(i,franchiseDatabase,playerDatabase,"PK","smashBrosMostKickerPoints");
                content += '<tr><td colspan=2><h3>Week '+i+': Most Kicker Points</h3></td></tr>';
                content += '<tr><td>' +  maxKickerPoints.franchiseName + '</td><td>' + maxKickerPoints.playerName + ' -- ' + maxKickerPoints.score + '</td></tr>';
                break;
            case 6: 
                var maxPassTouchdown = longestTouchdownPass(i,formattedWeek,franchiseDatabase,playerDatabase,"smashBrosLongestTouchdownPass");
                // console.log("MAX PASSTOUCHDOWN",maxPassTouchdown);
                content += '<tr><td colspan=2><h3>Week '+i+': Longest QB TD</h3></td></tr>';
                content += '<tr><td>' +  maxPassTouchdown.name + '</td><td>' + maxPassTouchdown.playerName + ' -- ' + maxPassTouchdown.pass + '</td></tr>';
                break;
            case 7: 
                var maxTeamReceptions = mostTeamReceptions(i,formattedWeek,franchiseDatabase,playerDatabase,"smashBrosMostTeamReceptions");
                // console.log("MAX ALL PURPOSE YARDS",maxAllPurposeYards);
                content += '<tr><td colspan=2><h3>Week '+i+': Most Team Receptions</h3></td></tr>';
                content += '<tr><td>' +  maxTeamReceptions.name + '</td><td>' + maxTeamReceptions.totalReceptions + '</td></tr>';
                break;
            case 8:
                var maxDefPoints = mostPlayerPoints(i,franchiseDatabase,playerDatabase,"Def","smashBrosMostDefensePoints");
                content += '<tr><td colspan=2><h3>Week '+i+': Most DEF Points</h3></td></tr>';
                content += '<tr><td>' +  maxDefPoints.franchiseName + '</td><td>' + maxDefPoints.playerName + ' -- ' + maxDefPoints.score + '</td></tr>';
                break;
            case 9: 
                var maxPlayerReceptions = mostPlayerReceptions(i,formattedWeek,franchiseDatabase,playerDatabase,"smashBrosMostPlayerReceptions");
                // console.log("MAX ALL PURPOSE YARDS",maxAllPurposeYards);
                content += '<tr><td colspan=2><h3>Week '+i+': Most Single Player Receptions</h3></td></tr>';
                content += '<tr><td>' +  maxPlayerReceptions.name + '</td><td>' + maxPlayerReceptions.playerName + ' -- ' + maxPlayerReceptions.receptions + '</td></tr>';
                break;
            case 10:
                var maxTEPoints = mostPlayerPoints(i,franchiseDatabase,playerDatabase,"TE","smashBrosMostDefensePoints");
                content += '<tr><td colspan=2><h3>Week '+i+': Most Points from Single Tight End</h3></td></tr>';
                content += '<tr><td>' +  maxDefPoints.franchiseName + '</td><td>' + maxDefPoints.playerName + ' -- ' + maxDefPoints.score + '</td></tr>';
                break;
            default:
                if(console)console.log("well this isn't good "+formattedWeek)
        }
    }
    $('#weekly-challenges-box').append(content);
});

function getLiveStats(formattedWeek) {
    var liveStats = {};
    const d = new Date();
    let ms = d.getMilliseconds();
    $.ajax({
        async: false, 
        url: "https://www80.myfantasyleague.com/fflnetdynamic2022/live_stats_"+formattedWeek+".txt?RANDOM="+ms,
        dataType: 'text',
        success: function( data ) {
            const lines = data.split("\n");
            // console.log("lines",lines,"text",data)
            for(x in lines){
                const stats = lines[x].split("|")
                liveStats[stats[0]] = stats
            }
            // console.log(liveStats)
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

function mostAllPurposeYards(week,formattedWeek,franchises,players,storageKey) {
    var mostAllPurposeYards;
    if (localStorage.getItem(storageKey) !== null) {
        mostAllPurposeYards = JSON.parse(localStorage.getItem(storageKey));
        return mostAllPurposeYards;
    }
    const liveStats = getLiveStats(formattedWeek);
    const liveScoring = getLiveScoring(week);
    var rcyRegEx = new RegExp("^(RCY|KY|UY) [0-9]{1,3}$");
    for(x in liveScoring.liveScoring.matchup) {
        for(y in liveScoring.liveScoring.matchup[x].franchise){
            var totalFranchiseYards = 0;
            for(z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
                for(zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]){
                    var playerScore = liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
                    var playerInfo = players['pid_'+playerScore.id]
                    var playerStats = liveStats[playerScore.id]
                    for(yy in playerStats) {
                        if (rcyRegEx.test(playerStats[yy])){
                            var rushCatchYards = playerStats[yy].replace(/[^0-9]/g, '');
                            totalFranchiseYards += parseInt(rushCatchYards);
                        }
                    }
                }
            }
            if(mostAllPurposeYards === undefined || totalFranchiseYards > parseInt(mostAllPurposeYards.totalFranchiseYards)){
                var franchiseInfo = franchises["fid_"+liveScoring.liveScoring.matchup[x].franchise[y].id]
                mostAllPurposeYards = {
                    totalFranchiseYards,
                    ...franchiseInfo,
                }
            }
        }
    }
    localStorage.setItem(storageKey,JSON.stringify(mostAllPurposeYards))
    return mostAllPurposeYards;
}

function longestTouchdownPass(week,formattedWeek,franchises,players,storageKey) {
    var longestTouchDownPass;
    if (localStorage.getItem(storageKey) !== null) {
        longestTouchDownPass = JSON.parse(localStorage.getItem(storageKey));
        return longestTouchDownPass;
    }
    const liveStats = getLiveStats(formattedWeek);
    const liveScoring = getLiveScoring(week);
    var touchDownPassesRegEx = new RegExp("^PS [0-9]{1,3}(?:,[0-9]{1,3})*$");
    for(x in liveScoring.liveScoring.matchup) {
        for(y in liveScoring.liveScoring.matchup[x].franchise){
            var franchiseInfo = franchises["fid_"+liveScoring.liveScoring.matchup[x].franchise[y].id]
            for(z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
                for(zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]){
                    var playerScore = liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
                    var playerInfo = players['pid_'+playerScore.id]
                    var playerStats = liveStats[playerScore.id]
                    for(yy in playerStats) {
                        if (touchDownPassesRegEx.test(playerStats[yy])){
                            var passingTouchdowns = playerStats[yy].slice(3).split(",");
                            for(pp in passingTouchdowns){
                                if(longestTouchDownPass === undefined || parseInt(passingTouchdowns[pp]) > parseInt(longestTouchDownPass.pass)){
                                    var pass = passingTouchdowns[pp];
                                    var playerName = playerInfo.name
                                    longestTouchDownPass = {
                                        pass,
                                        playerName,
                                        ...franchiseInfo,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    localStorage.setItem(storageKey,JSON.stringify(longestTouchDownPass))
    return longestTouchDownPass;
}

function mostTeamReceptions(week,formattedWeek,franchises,players,storageKey) {
    var mostTeamReceptions;
    if (localStorage.getItem(storageKey) !== null) {
        mostTeamReceptions = JSON.parse(localStorage.getItem(storageKey));
        return mostTeamReceptions;
    }
    const liveStats = getLiveStats(formattedWeek);
    const liveScoring = getLiveScoring(week);
    var rcyRegEx = new RegExp("^CC [0-9]{1,3}$");
    for(x in liveScoring.liveScoring.matchup) {
        for(y in liveScoring.liveScoring.matchup[x].franchise){
            var totalReceptions = 0;
            for(z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
                for(zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]){
                    var playerScore = liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
                    var playerInfo = players['pid_'+playerScore.id]
                    var playerStats = liveStats[playerScore.id]
                    for(yy in playerStats) {
                        if (rcyRegEx.test(playerStats[yy])){
                            var receptions = playerStats[yy].replace(/[^0-9]/g, '');
                            totalReceptions += parseInt(receptions);
                        }
                    }
                }
            }
            if(mostTeamReceptions === undefined || totalReceptions > parseInt(mostTeamReceptions.totalReceptions)){
                var franchiseInfo = franchises["fid_"+liveScoring.liveScoring.matchup[x].franchise[y].id]
                mostTeamReceptions = {
                    totalReceptions,
                    ...franchiseInfo,
                }
            }
        }
    }
    localStorage.setItem(storageKey,JSON.stringify(mostTeamReceptions))
    return mostTeamReceptions;
}

//tie breaker is next highest receiver receptions until one has a higher receptions
function mostPlayerReceptions(week,formattedWeek,franchises,players,storageKey) {
    var mostPlayerReceptions;
    // if (localStorage.getItem(storageKey) !== null) {
    //     mostPlayerReceptions = JSON.parse(localStorage.getItem(storageKey));
    //     return mostPlayerReceptions;
    // }
    const liveStats = getLiveStats(formattedWeek);
    const liveScoring = getLiveScoring(week);
    var rcyRegEx = new RegExp("^CC [0-9]{1,3}$");
    for(x in liveScoring.liveScoring.matchup) {
        for(y in liveScoring.liveScoring.matchup[x].franchise){
            var franchiseInfo = franchises["fid_"+liveScoring.liveScoring.matchup[x].franchise[y].id];
            var playerReceptions = [];
            for(z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
                for(zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]){
                    var playerScore = liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
                    var playerInfo = players['pid_'+playerScore.id]
                    var playerStats = liveStats[playerScore.id]
                    var playerName = playerInfo.name;
                    for(yy in playerStats) {
                        if (rcyRegEx.test(playerStats[yy])){
                            var receptions = playerStats[yy].replace(/[^0-9]/g, '');
                            playerReceptions.push({
                                playerName,
                                receptions
                            });
                        }
                    }
                }
            }
            if(playerReceptions.length === 0){
                continue
            }
            playerReceptions.sort((a,b) => b.receptions - a.receptions);
            // console.log("mostReceptions",mostPlayerReceptions,"playerReceptions",playerReceptions);
            if(mostPlayerReceptions === undefined){
                mostPlayerReceptions = {
                    ...franchiseInfo,
                    ...playerReceptions[0],
                    playerReceptions,
                }
                continue
            }
            if(parseInt(playerReceptions[0].receptions) > parseInt(mostPlayerReceptions.receptions)){
                mostPlayerReceptions = {
                    ...franchiseInfo,
                    ...playerReceptions[0],
                    playerReceptions
                }
                continue
            }
            if(parseInt(playerReceptions[0].receptions) == parseInt(mostPlayerReceptions.receptions)){
                for(rr in playerReceptions){
                    if(parseInt(playerReceptions[rr].receptions) > parseInt(mostPlayerReceptions.playerReceptions[rr].receptions)){
                        mostPlayerReceptions = {
                            ...franchiseInfo,
                            ...playerReceptions[0],
                            playerReceptions
                        }
                        break
                    }
                }
            }
        }
    }
    localStorage.setItem(storageKey,JSON.stringify(mostPlayerReceptions))
    return mostPlayerReceptions;
}