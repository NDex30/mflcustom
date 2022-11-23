$(function() {
    if(qs("O") === "121") {
        console.log("on confidence probably");
    }
    getNFLSchedule("12");

    console.log("query search",qs("O"))
});

function getNFLSchedule(formattedWeek) {
    var nflSchedule = {};
    $.ajax({
        async: false, 
        url: "https://"+window.location.host+"/fflnetdynamic"+year+"/nfl_sched_"+formattedWeek+".json",
        dataType: 'json',
        success: function( data ) {
            console.log(data);
            // const lines = data.split("\n");
            // for(x in lines){
            //     const stats = lines[x].split("|")
            //     liveStats[stats[0]] = stats
            // }
        }
    }).fail(function() {
        if(console)console.log( "error" );
    });
    return nflSchedule;
}

function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}