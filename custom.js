$(function() {
//  console.log(localStorage.getItem("cache_weeklyResults-3_2022_58663_1665792000"));
//  console.log(franchiseDatabase);
const d = new Date();
let ms = d.getMilliseconds();
$.get( "https://www80.myfantasyleague.com/fflnetdynamic2022/live_stats_idp_08.txt?RANDOM="+ms, function( data ) {
    console.log('data');
  },"text");
// console.log($.get("https://www80.myfantasyleague.com/fflnetdynamic2022/live_stats_idp_08.txt?RANDOM="+ms));
});