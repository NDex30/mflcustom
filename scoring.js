$(function () {
  let liveScoring = getLiveScoring(real_ls_week);
  let scoringBox = $("#dexscoring");
  let autoRefresh = false;
  for (m in liveScoring.liveScoring.matchup) {
    let matchupBox = $('<div id="matchup_' + m + '"></div>');
    scoringBox.append(matchupBox);
    for (f in liveScoring.liveScoring.matchup[m].franchise) {
      let franchise = liveScoring.liveScoring.matchup[m].franchise[f];
      console.log("franchise", franchise);
    }
  }
  console.log("livescoring", liveScoring);
});
