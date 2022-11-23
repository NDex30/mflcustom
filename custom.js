$(function() {
    getNFLSchedule("12");
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