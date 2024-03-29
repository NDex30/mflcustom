var xDown = null;
var yDown = null;
var dexCurrMatchup = 0;
var autoRefreshDexScore = false;
var totalMatchups = 0;

function checkArrayThenExecute() {
  let liveScoring = getLiveScoringDetails();
  let projectedScores = getProjectedScore();
  let scoringBox = $("#dexscoring");
  totalMatchups = liveScoring.liveScoring.matchup.length;

  // Create a mapping object for "fid" to "record"
  let fidToRecordMap = {};
  for (let standings of reportStandings_ar) {
    fidToRecordMap[standings.fid] = standings.record;
  }

  if (console) console.time("build html");
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

      // Append the record from the mapping
      franchiseBox.append(
        '<div class="franchise-record">' +
          fidToRecordMap[franchise.id] +
          "</div>"
      );

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
            playerInfo.position +
            " " +
            getPlayingStatusClass(parseInt(playerScore.gameSecondsRemaining)) +
            " " +
            playerInfo.team +
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
            '<a href="player?L=' +
            league_id +
            "&amp;P=" +
            playerScore.id +
            '" target="new" title="View Player News">' +
            formatPlayerName(playerInfo.name) +
            "</a>" +
            "</h3>" +
            " " +
            '<div class="mobile-player-position">' +
            playerInfo.position +
            "</div>" +
            '<div class="player-team"><img alt="' +
            playerInfo.team +
            '" src="https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/' +
            playerInfo.team +
            '.svg"></div></div><div class="game-info"><div class="game-status ' +
            playerInfo.team +
            '"></div><div id="game-time-' +
            playerScore.id +
            '"></div></div><div class="player-stats" id="stats_' +
            playerScore.id +
            '"></div></div>'
        );
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
      try {
        MFLPlayerPopupNewsIcon("dexscoring");
      } catch (er) {}
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
  if (console) console.timeEnd("build html");
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
  refreshStats();
  refreshGameScore();
  refreshScores();
  setInterval(refreshScores, 30000);
  setInterval(refreshStats, 90000);
  setInterval(refreshGameScore, 60000);
}

function getProjectedScore() {
  var projectedStats = {};
  $.ajax({
    async: false,
    url: `${baseURLDynamic}/${year}/export?TYPE=projectedScores&L=${league_id}&WEEK=${real_ls_week}&JSON=1`,
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

function getLiveScoringDetails() {
  var liveScoring;
  $.ajax({
    async: false,
    url: `${baseURLDynamic}/${year}/export?TYPE=liveScoring&L=${league_id}&WEEK=${real_ls_week}&JSON=1&DETAILS=1`,
    dataType: "json",
    success: function (data) {
      liveScoring = data;
    },
  }).fail(function () {
    if (console) console.log("error");
  });
  return liveScoring;
}

function getNFLSchedule() {
  var nflSchedule;
  let formattedWeek = real_ls_week.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  $.ajax({
    async: false,
    url: `${baseURLDynamic}/fflnetdynamic${year}/nfl_sched_${real_ls_week}.json`,
    dataType: "json",
    success: function (data) {
      nflSchedule = data;
    },
  }).fail(function () {
    if (console) console.log("error");
  });
  return nflSchedule;
}

function getLiveStatsDetails() {
  var liveStats = {};
  const d = new Date();
  let ms = d.getMilliseconds();
  let formattedWeek = real_ls_week.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  var catchesRegEx = new RegExp("\\|CC ([0-9]{1,3})");
  var catchYardsRegex = new RegExp("\\|CY ([0-9]{1,3})");
  var catchTDsRegex = new RegExp("\\|#C ([0-9]{1,3})");
  var rushesRegEx = new RegExp("\\|RA ([0-9]{1,3})");
  var rushYardsRegex = new RegExp("\\|RY ([0-9]{1,3})");
  var rushTDsRegex = new RegExp("\\|#R ([0-9]{1,3})");
  var passAttemptsRegEx = new RegExp("\\|PA ([0-9]{1,3})");
  var passCompleteRegEx = new RegExp("\\|PC ([0-9]{1,3})");
  var passYardsRegex = new RegExp("\\|PY ([0-9]{1,3})");
  var passTDsRegex = new RegExp("\\|#P ([0-9]{1,3})");
  $.ajax({
    async: false,
    url: `${baseURLDynamic}/fflnetdynamic${year}/live_stats_${formattedWeek}.txt?RANDOM=${ms}`,
    dataType: "text",
    success: function (data) {
      const lines = data.split("\n");
      for (x in lines) {
        const currLine = lines[x];
        const splits = currLine.split("|");
        if (splits[0] === "" || splits[0] === undefined) continue;
        let stats = {};
        if (catchesRegEx.test(currLine)) {
          mCatches = currLine.match(catchesRegEx);
          if (mCatches.length > 1) stats["catches"] = mCatches[1];
        }
        if (catchYardsRegex.test(currLine)) {
          mCatchYards = currLine.match(catchYardsRegex);
          if (mCatchYards.length > 1) stats["catchYds"] = mCatchYards[1];
        }
        if (catchTDsRegex.test(currLine)) {
          mCatchTDs = currLine.match(catchTDsRegex);
          if (mCatchTDs.length > 1) stats["catchTDs"] = mCatchTDs[1];
        }
        if (rushesRegEx.test(currLine)) {
          mRushes = currLine.match(rushesRegEx);
          if (mRushes.length > 1) stats["rushes"] = mRushes[1];
        }
        if (rushYardsRegex.test(currLine)) {
          mRushYards = currLine.match(rushYardsRegex);
          if (mRushYards.length > 1) stats["rushYds"] = mRushYards[1];
        }
        if (rushTDsRegex.test(currLine)) {
          mRushTDs = currLine.match(rushTDsRegex);
          if (mRushTDs.length > 1) stats["rushTDs"] = mRushTDs[1];
        }
        if (passAttemptsRegEx.test(currLine)) {
          mPasses = currLine.match(passAttemptsRegEx);
          if (mPasses.length > 1) stats["passAttempts"] = mPasses[1];
        }
        if (passCompleteRegEx.test(currLine)) {
          mPassComplete = currLine.match(passCompleteRegEx);
          if (mPassComplete.length > 1)
            stats["passComplete"] = mPassComplete[1];
        }
        if (passYardsRegex.test(currLine)) {
          mPassYds = currLine.match(passYardsRegex);
          if (mPassYds.length > 1) stats["passYds"] = mPassYds[1];
        }
        if (passTDsRegex.test(currLine)) {
          mPassTDs = currLine.match(passTDsRegex);
          if (mPassTDs.length > 1) stats["passTDs"] = mPassTDs[1];
        }
        if (Object.keys(stats).length !== 0) liveStats[splits[0]] = stats;
        // if (console) console.log("stats", stats, currLine);
      }
    },
  }).fail(function () {
    if (console) console.log("error");
  });
  return liveStats;
}

function formatPlayerName(name) {
  let nameSplit = name.split(",");
  if (nameSplit.length < 2) return name;
  return nameSplit[1] + " " + nameSplit[0];
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
  );
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
      dexCurrMatchup += 1;
    } else {
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
  $(".matchup-dot").removeClass("active");
  $("#dot_" + dexCurrMatchup).addClass("active");
  $(".matchup-box").css("order", 99);
  $("#matchup_" + dexCurrMatchup).css("order", 1);
  xDown = null;
  yDown = null;
}

function formatPlayerStats(playerStats) {
  let statsStr = "";
  if (playerStats.passAttempts !== undefined && playerStats.passAttempts > 0) {
    statsStr += " " + playerStats.passAttempts;
    if (
      playerStats.passComplete !== undefined &&
      playerStats.passComplete > 0
    ) {
      statsStr += "/" + playerStats.passComplete;
    }
    if (playerStats.passYds !== undefined && playerStats.passYds > 0) {
      statsStr += " " + playerStats.passYds + "Pass Yds";
    }
    if (playerStats.passTDs !== undefined && playerStats.passTDs > 0) {
      statsStr += " " + playerStats.passTDs + " TDs";
    }
  }
  if (playerStats.rushes !== undefined && playerStats.rushes > 0) {
    statsStr += " " + playerStats.rushes;
    if (playerStats.rushYds !== undefined && playerStats.rushYds > 0) {
      statsStr += "/" + playerStats.rushYds + " Rush Yds";
    }
    if (playerStats.rushTDs !== undefined && playerStats.rushTDs > 0) {
      statsStr += " " + playerStats.rushTDs + " TDs";
    }
  }
  if (playerStats.catches !== undefined && playerStats.catches > 0) {
    statsStr += " " + playerStats.catches;
    if (playerStats.catchYds !== undefined && playerStats.catchYds > 0) {
      statsStr += "/" + playerStats.catchYds + " Rec Yds";
    }
    if (playerStats.catchTDs !== undefined && playerStats.catchTDs > 0) {
      statsStr += " " + playerStats.catchTDs + " TDs";
    }
  }
  return statsStr;
}

function refreshGameScore() {
  if (console) console.time("Refresh Game Scores");
  let gameScores = getNFLSchedule();
  for (x in gameScores.nflSchedule.matchup) {
    // console.log(gameScores.nflSchedule.matchup[x]);
    let matchup = gameScores.nflSchedule.matchup[x];
    let team1 =
      (matchup.team[0].isHome === "1" ? "" : "@") + matchup.team[1].id;
    let team2 =
      (matchup.team[1].isHome === "1" ? "" : "@") + matchup.team[0].id;
    if (matchup.status == "SCHED") {
      var kickoff = new Date(parseInt(matchup.kickoff) * 1000);
      let kickoffFormat = new Intl.DateTimeFormat("default", {
        weekday: "short",
        timeZoneName: "short",
        hour: "numeric",
        minute: "numeric",
      }).format(kickoff);
      team1 += " " + kickoffFormat;
      team2 += " " + kickoffFormat;
    } else {
      team1 += " " + matchup.team[0].score + " - " + matchup.team[1].score;
      team2 += " " + matchup.team[1].score + " - " + matchup.team[0].score;
    }
    if (matchup.status === "INPROG") {
      $(".player-row." + matchup.team[0].id).removeClass(
        "on-offense in-redzone"
      );
      if (matchup.team[0].hasPossession === "1") {
        $(".player-row." + matchup.team[0].id).addClass("on-offense");
        if (matchup.team[0].inRedZone === "1") {
          $(".player-row." + matchup.team[0].id).addClass("in-redzone");
        }
      }
    }
    if (matchup.status === "FINAL") {
      team1 += " Final";
      team2 += " Final";
    }
    $(".game-status." + matchup.team[0].id).html(team1);
    $(".game-status." + matchup.team[1].id).html(team2);
  }
  if (console) console.timeEnd("Refresh Game Scores");
}

function refreshStats() {
  if (console) console.time("Refresh Stats");
  let liveStats = getLiveStatsDetails();
  for (playerID in liveStats) {
    if ($("#stats_" + playerID).length === 0) continue;
    $("#stats_" + playerID).html(formatPlayerStats(liveStats[playerID]));
  }
  if (console) console.timeEnd("Refresh Stats");
}

function refreshScores() {
  if (console) console.time("Refresh Scores");
  if (console) console.time("fetch scoring api");
  let liveScoring = getLiveScoringDetails();
  if (console) console.timeEnd("fetch scoring api");
  for (m in liveScoring.liveScoring.matchup) {
    for (f in liveScoring.liveScoring.matchup[m].franchise) {
      let franchise = liveScoring.liveScoring.matchup[m].franchise[f];
      $("#score_" + franchise.id).html(franchise.score);
      for (p in franchise.players.player) {
        let playerScore = franchise.players.player[p];
        let timeRemaining = parseInt(playerScore.gameSecondsRemaining);
        if (timeRemaining === 3600) continue; // no need to do anything for player that hasn't started
        if (timeRemaining > 0) {
          let minutes = Math.floor(timeRemaining / 60);
          let seconds = timeRemaining - minutes * 60;
          let quarter = Math.ceil((3600 - timeRemaining) / 60 / 15);
          $("#game-time-" + playerScore.id).html(
            quarter + "Q " + minutes + ":" + seconds
          );
        }
        $("#player_row_" + playerScore.id)
          .removeClass("done waiting playing")
          .addClass(
            getPlayingStatusClass(parseInt(playerScore.gameSecondsRemaining))
          );
        $("#player_score_" + playerScore.id).html(playerScore.score);
      }
    }
  }
  if (console) console.timeEnd("Refresh Scores");
}

const checkArrayInterval = setInterval(function () {
  if (real_ls_week > 0) {
    if (reportStandings_ar && reportStandings_ar.length > 0) {
      checkArrayThenExecute();
      clearInterval(checkArrayInterval);
    } else {
      console.log("Waiting for reportStandings_ar to be filled...");
    }
  } else {
    clearInterval(checkArrayInterval); // Clear the interval if real_ls_week is not greater than 0
  }
}, 100);
