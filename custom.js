$(function() {
    let newWeek = completedWeek+1;
    let newWeekFormatted = newWeek.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });

    //add spreads to confidence pool pickems
    if(qs("O") === "121") {
        var nflSpreadsByTeamID = getNFLSpreads(newWeekFormatted);
        wrapperTable = $('table caption span').filter(function() {
            return $(this).text().toLowerCase().includes("confidence");
        }).closest('table');
        wrapperTable.find('tr td').each(function() {
            teamID = $(this).find('input[type=radio]').val();
            if(teamID === undefined){ return }
            isPositive = isPositiveInteger(nflSpreadsByTeamID[teamID]) ? ' positive': '';
            $(this).find('label').append('<span class="spread'+isPositive+'">'+nflSpreadsByTeamID[teamID]+'</span>');
        });
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
                }
            }
        }
    }).fail(function() {
        if(console)console.log( "error" );
    });
    return nflSpreads;
}

function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function isPositiveInteger(str) {
    if (typeof str !== 'string') {
      return false;
    }

    const num = Number(str);
  
    if ( num > 0) {
      return true;
    }
  
    return false;
  }