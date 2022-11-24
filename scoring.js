$(function () {
  let liveScoring = getLiveScoring(real_ls_week);
  console.log("livescoring", liveScoring);
});

function getLiveScoring(week) {
  var liveScoring;
  $.ajax({
    async: false,
    url:
      "https://" +
      window.location.host +
      "/" +
      year +
      "/export?TYPE=liveScoring&L=" +
      league_id +
      "&W=" +
      week +
      "&JSON=1",
    dataType: "json",
    success: function (data) {
      liveScoring = data;
    },
  }).fail(function () {
    if (console) console.log("error");
  });
  return liveScoring;
}
