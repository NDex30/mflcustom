$(function () {
  let liveScoring = getLiveScoring(real_ls_week);
  let projectedScores = getProjectedScore(real_ls_week, year, league_id);
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
      // TODO: Why can't I access the team record here?
      //   franchiseBox.append(
      //     '<div class="franchise-record">' + franchiseInfo.record + "</div>"
      //   );
      franchiseBox.append(
        '<div class="franchise-score" id="score_' +
          franchise.id +
          '">' +
          franchise.score +
          "</div>"
      );
      let playersBox = $('<div class="players"></div>');
      franchiseBox.append(playersBox);
      for (p in franchise.players.player) {
        let playerScore = franchise.players.player[p];
        var playerInfo = playerDatabase["pid_" + playerScore.id];
        let playerRow = $(
          '<div class="player-row" id="' + playerScore.id + '"></div>'
        );
        playerRow.append(
          '<div class="player-position">' + playerInfo.position + "</div>"
        );
        playerRow.append(
          '<div class="player-image" id="image_' +
            playerScore.id +
            '"><img class="articlepicture" src="https://www.mflscripts.com/playerImages_80x107/mfl_' +
            playerScore.id +
            '.png" /></div>'
        );
        playerRow.append(
          '<div class="player-name">' + playerInfo.name + "</div>"
        );
        playerRow.append(
          '<div class="player-team"><img src="https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/' +
            playerInfo.team +
            '.svg">' +
            playerInfo.team +
            "</div>"
        );
        playerRow.append(
          '<div class="player-stats" id="stats_' + playerScore.id + '"></div>'
        );
        playerRow.append(
          '<div class="player-projected-score" id="projected_' +
            playerScore.id +
            '">' +
            projectedScores[playerScore.id] +
            "</div>"
        );
        playerRow.append(
          '<div class="player-score" id="score_' +
            playerScore.id +
            '">' +
            playerScore.score +
            "</div>"
        );
        playersBox.append(playerRow);
        console.log("playerInfo", playerInfo, playerScore);
      }
      matchupBox.append(franchiseBox);
      //   console.log("franchise", Object.keys(franchiseInfo));
    }
  }
  console.log("projected scores", projectedScores);
  console.log("livescoring", liveScoring);
});

function getProjectedScore(week, year, leagueID) {
  //https://www80.myfantasyleague.com/2022/export?TYPE=projectedScores&L=58663&PLAYERS=&WEEK=12&JSON=1
  var projectedStats = {};
  const d = new Date();
  let ms = d.getMilliseconds();
  $.ajax({
    async: false,
    url:
      "https://" +
      window.location.host +
      "/" +
      year +
      "/export?TYPE=projectedScores&L=" +
      leagueID +
      "&WEEK=" +
      week +
      "&JSON=1",
    dataType: "json",
    success: function (data) {
      for (p in data.projectedScores.playerScore) {
        let player = data.projectedScores.playerScore[p];
        projectedStats[player.id] = player.score;
      }
    },
  }).fail(function () {
    if (console) console.log("error");
  });
  return projectedStats;
}
