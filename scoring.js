var xDown = null;
var yDown = null;
var dexCurrMatchup = 0;
var autoRefreshDexScore = false;
var totalMatchups = 0;

$(function () {
  let liveScoring = getLiveScoringDetails(real_ls_week);
  let projectedScores = getProjectedScore(real_ls_week, year, league_id);
  let scoringBox = $("#dexscoring");
  totalMatchups = liveScoring.liveScoring.matchup.length;

  getLiveStatsDetails(real_ls_week);
  for (m in liveScoring.liveScoring.matchup) {
    let matchupBox = $(
      '<div class="matchup-box" id="matchup_' +
        m +
        '" style="order: ' +
        m +
        '"></div>'
    );
    scoringBox.append(matchupBox);
    for (f in liveScoring.liveScoring.matchup[m].franchise) {
      let franchise = liveScoring.liveScoring.matchup[m].franchise[f];
      let franchiseInfo = franchiseDatabase["fid_" + franchise.id];
      let franchiseBox = $(
        '<div class="franchise-box" id="franchise_' + franchise.id + '"></div>'
      );
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
      let playersBench = $(
        '<div id="players-bench" class="players-bench"></div>'
      );
      franchiseBox.append(playersBox);
      for (p in franchise.players.player) {
        let playerScore = franchise.players.player[p];
        var playerInfo = playerDatabase["pid_" + playerScore.id];
        let playerRow = $(
          '<div class="player-row position-order-' +
            // (playerScore.status === "starter" ? playerInfo.position : "bench") +
            playerInfo.position +
            " " +
            getPlayingStatusClass(parseInt(playerScore.gameSecondsRemaining)) +
            '" id="player_row_' +
            playerScore.id +
            '"></div>'
        );
        playerRow.append(
          '<div class="player-position">' + playerInfo.position + "</div>"
        );
        let imageBox = $(
          '<div class="player-image" id="image_' + playerScore.id + '"></div>'
        );
        let imgSrc = "";
        if (playerInfo.position === "Def") {
          imgSrc =
            '<img src="https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/' +
            playerInfo.team +
            '.svg" />';
          imageBox.append($(imgSrc));
        } else {
          imgSrc =
            '<img src="https://www.mflscripts.com/playerImages_80x107/mfl_' +
            playerScore.id +
            '.png" />';
          imageBox.append($(imgSrc));
        }
        playerRow.append(imageBox);
        playerRow.append(
          '<div class="player-details-box"><div class="player-name"><h3>' +
            playerInfo.name +
            '</h3><div class="player-team"><img alt="' +
            playerInfo.team +
            '" src="https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/' +
            playerInfo.team +
            '.svg"></div></div><div class="player-stats" id="stats_' +
            playerScore.id +
            '"></div></div>'
        );
        // playerRow.append(
        //   '<div class="player-stats" id="stats_' + playerScore.id + '"></div>'
        // );
        let projectionDiff = "";
        if (
          parseFloat(playerScore.score) >
          parseFloat(projectedScores[playerScore.id])
        ) {
          projectionDiff = " beat-projection";
        }
        playerRow.append(
          '<div class="player-score-box" id="score_box_' +
            playerScore.id +
            '"><div class="player-live-score' +
            projectionDiff +
            '" id="player_score_' +
            playerScore.id +
            '">' +
            playerScore.score +
            "</div>" +
            (projectedScores[playerScore.id] === undefined
              ? ""
              : '<div class="player-projected-score" id="projected_' +
                playerScore.id +
                '">' +
                projectedScores[playerScore.id] +
                "</div>") +
            "</div>"
        );
        if (playerScore.status === "starter") {
          playersBox.append(playerRow);
        } else {
          playersBench.append(playerRow);
        }
      }
      playersBox.append(playersBench);
      matchupBox.append(franchiseBox);
    }
  }
  dots = '<div id="nav-dots" class="nav-dots">';
  for (i = 0; i < liveScoring.liveScoring.matchup.length; i++) {
    dots +=
      '<div id="dot_' +
      i +
      '" data-matchup="matchup_' +
      i +
      '" class="matchup-dot' +
      (i === dexCurrMatchup ? " active" : "") +
      '"><i class="fa fa-circle" aria-hidden="true"></i></div>';
  }
  dots += "</div>";
  scoringBox.append(dots);

  var group = document.querySelector("#dexscoring");
  group.addEventListener("touchstart", handleTouchStart, false);
  group.addEventListener("touchmove", handleTouchMove, false);

  $("#nav-dots > div").click(function (e) {
    matchup = $(this).data("matchup");
    $(".matchup-dot").removeClass("active");
    $(this).addClass("active");
    $(".matchup-box").css("order", 99);
    $("#" + matchup).css("order", 1);
  });
  setInterval(refreshScores, 30000);
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

function getLiveScoringDetails(week) {
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
      "&JSON=1&DETAILS=1",
    dataType: "json",
    success: function (data) {
      liveScoring = data;
    },
  }).fail(function () {
    if (console) console.log("error");
  });
  return liveScoring;
}

function getLiveStatsDetails(week) {
  var liveStats = {};
  const d = new Date();
  let ms = d.getMilliseconds();
  let formattedWeek = week.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  var catchesRegEx = new RegExp("CC ([0-9]{1,3})");
  var catchYardsRegex = new RegExp("^(CY) [0-9]{1,3}$");
  var catchTDsRegex = new RegExp("^(#C) [0-9]{1,3}$");
  var rushesRegEx = new RegExp("^(RA) [0-9]{1,3}$");
  var rushYardsRegex = new RegExp("^(RY) [0-9]{1,3}$");
  var rushTDsRegex = new RegExp("^(#R) [0-9]{1,3}$");
  var passAttemptsRegEx = new RegExp("^(PA) [0-9]{1,3}$");
  var passCompleteRegEx = new RegExp("^(PC) [0-9]{1,3}$");
  var passYardsRegex = new RegExp("^(PY) [0-9]{1,3}$");
  var passTDsRegex = new RegExp("^(#P) [0-9]{1,3}$");
  $.ajax({
    async: false,
    url:
      "https://" +
      window.location.host +
      "/fflnetdynamic" +
      year +
      "/live_stats_" +
      formattedWeek +
      ".txt?RANDOM=" +
      ms,
    dataType: "text",
    success: function (data) {
      const lines = data.split("\n");
      for (x in lines) {
        const currLine = lines[x];
        const splits = currLine.split("|");
        console.log("splits", splits, currLine);
        if (splits[0] === "" || splits[0] === undefined) continue;
        let stats = {};

        // if (catchesRegEx.test(currLine)) {
        mCatches = currLine.match(catchesRegEx);
        console.log(mCatches);
        if (mCatches.length > 1) stats["catches"] = mCatches[1];

        mCatchYards = currLine.match("CY ([0-9]{1,3})");
        console.log(mCatchYards);
        if (mCatchYards.length > 1) stats["catchYds"] = mCatchYards[1];
        // }
        // if (catchYardsRegex.test(currLine)) {
        //   stats["catchYards"] = splits[s].replace(/[^0-9]/g, "");
        // }
        // if (catchTDsRegex.test(currLine)) {
        //   stats["catchTDs"] = splits[s].replace(/[^0-9]/g, "");
        // }
        // if (rushesRegEx.test(currLine)) {
        //   stats["catchTDs"] = splits[s].replace(/[^0-9]/g, "");
        // }
        liveStats[splits[0]] = stats;
      }
    },
  }).fail(function () {
    if (console) console.log("error");
  });
  console.log("liveStats", liveStats);
  return liveStats;
}

function getPlayingStatusClass(secondsRemaing) {
  let playingStatus = "";
  if (secondsRemaing === 3600) {
    playingStatus = "waiting";
  } else if (secondsRemaing > 0 && secondsRemaing < 3600) {
    playingStatus = "playing";
  } else {
    playingStatus = "done";
  }
  return playingStatus;
}
function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 70) {
    /*most significant*/
    if (xDiff > 0) {
      // alert("swipe left");
      dexCurrMatchup += 1;
    } else {
      // alert("swipe right");
      dexCurrMatchup -= 1;
    }
  } else {
    return;
  }
  if (dexCurrMatchup >= totalMatchups) {
    dexCurrMatchup = 0;
  } else if (dexCurrMatchup < 0) {
    dexCurrMatchup = totalMatchups - 1;
  }
  // alert("move x " + xDiff + " y diff " + yDiff);
  $(".matchup-dot").removeClass("active");
  $("#dot_" + dexCurrMatchup).addClass("active");
  $(".matchup-box").css("order", 99);
  $("#matchup_" + dexCurrMatchup).css("order", 1);

  /* reset values */
  xDown = null;
  yDown = null;
}

function refreshScores() {
  console.time("Refresh Scores");
  let liveScoring = getLiveScoringDetails(real_ls_week);
  for (m in liveScoring.liveScoring.matchup) {
    for (f in liveScoring.liveScoring.matchup[m].franchise) {
      let franchise = liveScoring.liveScoring.matchup[m].franchise[f];
      $("#score_" + franchise.id).html(franchise.score);
      for (p in franchise.players.player) {
        let playerScore = franchise.players.player[p];
        $("#player_row_" + playerScore.id)
          .removeClass("done waiting playing")
          .addClass(
            getPlayingStatusClass(parseInt(playerScore.gameSecondsRemaining))
          );
        $("#player_score_" + playerScore.id).html(playerScore.score);
      }
    }
  }
  console.timeEnd("Refresh Scores");
}
