$(function() {
    let newWeekFormatted = completedWeek.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
    //add spreads to confidence pool pickems
    if(qs("O") === "121") {
        console.log("on confidence probably");
        var nflSpreadsByTeamID = getNFLSpreads(newWeekFormatted);
        wrapperTable = $('table caption span').filter(function() {
            return $(this).text().toLowerCase().includes("confidence");
        }).closest('table');
        wrapperTable.find('tr td').each(function() {
            teamID = $(this).find('input[type=radio]').val();
            if(teamID === undefined){ return }
            $(this).find('label').append('<span class="spread">'+nflSpreadsByTeamID[teamID]+'</span>');
            console.log("cell",this,teamID);
        });
        // ,wrapperTable.css( "background-color", "red" );
        // console.log("table maybe",wrapperTable);
    }
});

function getNFLSpreads(formattedWeek) {
    var nflSpreads = {};
    $.ajax({
        async: false, 
        url: "https://"+window.location.host+"/fflnetdynamic"+year+"/nfl_sched_"+formattedWeek+".json",
        dataType: 'json',
        success: function( data ) {
            for(x in data.nflSchedule.matchup){
                for(y in data.nflSchedule.matchup[x].team) {
                    nflSpreads[data.nflSchedule.matchup[x].team[y].id] = data.nflSchedule.matchup[x].team[y].spread;
                    // console.log("team",data.nflSchedule.matchup[x].team[y]);
                }
            }
            // console.log(data);
            // const lines = data.split("\n");
            // for(x in lines){
            //     const stats = lines[x].split("|")
            //     liveStats[stats[0]] = stats
            // }
        }
    }).fail(function() {
        if(console)console.log( "error" );
    });
    console.log(nflSpreads);
    return nflSpreads;
}

function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}