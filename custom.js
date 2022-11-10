$(function() {
//  console.log(localStorage.getItem("cache_weeklyResults-3_2022_58663_1665792000"));
//  console.log(franchiseDatabase);
    //starts at week3
    for(i = 3;i < 5;i++) {
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
                week3(getLiveScoring(i),franchiseDatabase);
                break;
            case 4: 
                week4(getLiveScoring(i),getLiveStats(formattedWeek),franchiseDatabase,playerDatabase);
                break;
            default:
                if(console)console.log("well this isn't good")
        }
        // console.log("nickdebug",liveScoring,liveStats);
    }
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
function week3(liveScoring,franchises) {
    var maxScoreFranchise;
    console.log(franchises,maxScoreFranchise);
    for(x in liveScoring.liveScoring.matchup) {
        console.log(liveScoring.liveScoring.matchup[x])
    }

}

function week4(liveScoring,liveStats,franchises,players) {

}