$(function () {
  let liveScoring = getLiveScoring(real_ls_week);
  let scoringBox = $("#dexscoring");
  let autoRefresh = false;
  for (m in liveScoring.liveScoring.matchup) {
    let matchupBox = $('<div id="matchup_' + m + '"></div>');
    scoringBox.append(matchupBox);
    for (f in liveScoring.liveScoring.matchup[m].franchise) {
      let franchise = liveScoring.liveScoring.matchup[m].franchise[f];
      let franchiseInfo = franchiseDatabase["fid_" + franchise.id];
      let franchiseBox = $('<div id="franchise_' + franchise.id + '"></div>');
      franchiseBox.append(
        '<div class="franchise-icon"><img src="' +
          franchiseInfo.icon +
          '" alt="' +
          franchiseInfo.abbrev +
          '" /></div>'
      );
      franchiseBox.append(
        '<div class="franchise-name"><h2>' + franchiseInfo.name + "</h2></div>"
      );
      franchiseBox.append(
        '<div class="franchise-record">' + franchiseInfo.record + "</div>"
      );
      matchupBox.append(franchiseBox);
      console.log("franchise", franchiseInfo);
    }
  }
  console.log("livescoring", liveScoring);
});
