$(function() {
//  console.log(localStorage.getItem("cache_weeklyResults-3_2022_58663_1665792000"));
//  console.log(franchiseDatabase);
    //starts at week3
    for(i = 3;i < 4;i++) {
        let formattedWeek = i.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        let liveScoring = {};
        let liveStats = [];
        const d = new Date();
        let ms = d.getMilliseconds();
        $.get( "https://www80.myfantasyleague.com/fflnetdynamic2022/live_stats_"+formattedWeek+".txt?RANDOM="+ms, function( data ) {
            liveStats = data
        },"text").fail(function() {
            if(console)console.log( "error" );
        });
        $.get("https://www80.myfantasyleague.com/2022/export?TYPE=liveScoring&L=58663&W="+i+"&JSON=1",function( data ) {
            liveScoring = data
        },"json").fail(function() {
            if(console)console.log( "error" );
        });
        console.log("nickdebug",liveScoring,liveStats);
    }
// console.log($.get("https://www80.myfantasyleague.com/fflnetdynamic2022/live_stats_idp_08.txt?RANDOM="+ms));
});

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
function week3() {

}