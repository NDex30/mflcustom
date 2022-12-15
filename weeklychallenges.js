$(function () {
  /*
        Week 3 = Most Team Points (Matty - 147.48)
        Week 4 = Most All-Purpose Yards
        Week 5 = Most Kicker Points
        Week 6 = Longest QB TD
        Week 7 = Most Team Receptions
        Week 8 = Most DEF Points
        Week 9 = Most Single Player Receptions
        Week 10 = Most Points from Single Tight End
        Week 11 = Most Team TD's
        Week 12 = Player with Most Points (No QB)
        Week 13 = Greatest Win Margin
        Week 14 = Player with Most Yards (No QB)
        Week 15 = Most Team Points (Non-playoff Team)
        Week 16 = Most Team Points (Non-playoff Team)
    */
  var content = '<table align="center" cellpadding="2" width="100%">';
  for (i = 0; i <= completedWeek; i++) {
    let formattedWeek = i.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    switch (i) {
      case 3:
        let maxPointsFranchise = mostTeamPoints(
          i,
          franchiseDatabase,
          false,
          "smashBrosMostTeamPoints"
        );
        content +=
          "<tr><td colspan=2><h3>Week " +
          i +
          ": Most Team Points</h3></td></tr>";
        content +=
          "<tr><td>" +
          maxPointsFranchise.name +
          "</td><td>" +
          maxPointsFranchise.score +
          "</td></tr>";
        break;
      case 4:
        var maxAllPurposeYards = mostAllPurposeYards(
          i,
          formattedWeek,
          franchiseDatabase,
          playerDatabase,
          "smashBrosMostAllPurposeYards"
        );
        content +=
          "<tr><td colspan=2><h3>Week " +
          i +
          ": Most All-Purpose Yards</h3></td></tr>";
        content +=
          "<tr><td>" +
          maxAllPurposeYards.name +
          "</td><td>" +
          maxAllPurposeYards.totalFranchiseYards +
          "</td></tr>";
        break;
      case 5:
        var maxKickerPoints = mostPlayerPoints(
          i,
          franchiseDatabase,
          playerDatabase,
          ["PK"],
          "smashBrosMostKickerPoints"
        );
        content +=
          "<tr><td colspan=2><h3>Week " +
          i +
          ": Most Kicker Points</h3></td></tr>";
        content +=
          "<tr><td>" +
          maxKickerPoints.franchiseName +
          "</td><td>" +
          maxKickerPoints.playerName +
          " -- " +
          maxKickerPoints.score +
          "</td></tr>";
        break;
      case 6:
        var maxPassTouchdown = longestTouchdownPass(
          i,
          formattedWeek,
          franchiseDatabase,
          playerDatabase,
          "smashBrosLongestTouchdownPass"
        );
        content +=
          "<tr><td colspan=2><h3>Week " + i + ": Longest QB TD</h3></td></tr>";
        content +=
          "<tr><td>" +
          maxPassTouchdown.name +
          "</td><td>" +
          maxPassTouchdown.playerName +
          " -- " +
          maxPassTouchdown.pass +
          "</td></tr>";
        break;
      case 7:
        var maxTeamReceptions = mostTeamReceptions(
          i,
          formattedWeek,
          franchiseDatabase,
          playerDatabase,
          "smashBrosMostTeamReceptions"
        );
        content +=
          "<tr><td colspan=2><h3>Week " +
          i +
          ": Most Team Receptions</h3></td></tr>";
        content +=
          "<tr><td>" +
          maxTeamReceptions.name +
          "</td><td>" +
          maxTeamReceptions.totalReceptions +
          "</td></tr>";
        break;
      case 8:
        var maxDefPoints = mostPlayerPoints(
          i,
          franchiseDatabase,
          playerDatabase,
          ["Def"],
          "smashBrosMostDefensePoints"
        );
        content +=
          "<tr><td colspan=2><h3>Week " +
          i +
          ": Most DEF Points</h3></td></tr>";
        content +=
          "<tr><td>" +
          maxDefPoints.franchiseName +
          "</td><td>" +
          maxDefPoints.playerName +
          " -- " +
          maxDefPoints.score +
          "</td></tr>";
        break;
      case 9:
        var maxPlayerReceptions = mostPlayerReceptions(
          i,
          formattedWeek,
          franchiseDatabase,
          playerDatabase,
          "smashBrosMostPlayerReceptions2"
        );
        content +=
          "<tr><td colspan=2><h3>Week " +
          i +
          ": Most Single Player Receptions</h3></td></tr>";
        content +=
          "<tr><td>" +
          maxPlayerReceptions.name +
          "</td><td>" +
          maxPlayerReceptions.playerName +
          " -- " +
          maxPlayerReceptions.receptions +
          "</td></tr>";
        break;
      case 10:
        var maxTEPoints = mostPlayerPoints(
          i,
          franchiseDatabase,
          playerDatabase,
          ["TE"],
          "smashBrosMostTEPoints"
        );
        content +=
          "<tr><td colspan=2><h3>Week " +
          i +
          ": Most Points from Single Tight End</h3></td></tr>";
        content +=
          "<tr><td>" +
          maxTEPoints.franchiseName +
          "</td><td>" +
          maxTEPoints.playerName +
          " -- " +
          maxTEPoints.score +
          "</td></tr>";
        break;
      case 11:
        var maxTeamTDs = mostTeamTDS(
          i,
          formattedWeek,
          franchiseDatabase,
          playerDatabase,
          "smashBrosMostTeamTDs2"
        );
        content +=
          "<tr><td colspan=2><h3>Week " + i + ": Most Team TDs</h3></td></tr>";
        content +=
          "<tr><td>" +
          maxTeamTDs.name +
          "</td><td>" +
          maxTeamTDs.totalTDs +
          "</td></tr>";
        break;
      case 12:
        var maxNonQBPoints = mostPlayerPoints(
          i,
          franchiseDatabase,
          playerDatabase,
          ["RB", "WR", "TE"],
          "smashBrosMostNonQBPoints"
        );
        content +=
          "<tr><td colspan=2><h3>Week " +
          i +
          ": Player with Most Points (No QB)</h3></td></tr>";
        content +=
          "<tr><td>" +
          maxNonQBPoints.franchiseName +
          "</td><td>" +
          maxNonQBPoints.playerName +
          " -- " +
          maxNonQBPoints.score +
          "</td></tr>";
        break;
      case 13:
        var maxWinMargin = biggestWinMargin(
          i,
          franchiseDatabase,
          "smashedBrosGreatestWinMargin"
        );
        content +=
          "<tr><td colspan=2><h3>Week " +
          i +
          ": Greatest Win Margin</h3></td></tr>";
        content +=
          "<tr><td>" +
          maxWinMargin.name +
          "</td><td>" +
          maxWinMargin.margin +
          "</td></tr>";
        break;
      case 14:
        var maxPlayerAllPurposeYards = mostPlayerAllPurposeYards(
          i,
          formattedWeek,
          franchiseDatabase,
          playerDatabase,
          ["RB", "WR", "TE"],
          "smashBrosMostNonQBYards"
        );
        content +=
          "<tr><td colspan=2><h3>Week " +
          i +
          ": Player with Most Yards (No QB)</h3></td></tr>";
        content +=
          "<tr><td>" +
          maxPlayerAllPurposeYards.name +
          "</td><td>" +
          maxPlayerAllPurposeYards.playerName +
          " -- " +
          maxPlayerAllPurposeYards.totalPlayerYards +
          "</td></tr>";
        break;
      case 15:
        let maxPointsFranchise15 = mostTeamPoints(
          i,
          franchiseDatabase,
          true,
          "smashBrosMostTeamPoints15"
        );
        content +=
          "<tr><td colspan=2><h3>Week " +
          i +
          ": Most Team Points</h3></td></tr>";
        content +=
          "<tr><td>" +
          maxPointsFranchise15.name +
          "</td><td>" +
          maxPointsFranchise15.score +
          "</td></tr>";
        break;
      case 16:
        let maxPointsFranchise16 = mostTeamPoints(
          i,
          franchiseDatabase,
          true,
          "smashBrosMostTeamPoints16"
        );
        content +=
          "<tr><td colspan=2><h3>Week " +
          i +
          ": Most Team Points</h3></td></tr>";
        content +=
          "<tr><td>" +
          maxPointsFranchise16.name +
          "</td><td>" +
          maxPointsFranchise16.score +
          "</td></tr>";
        break;
      default:
        if (console)
          console.log("no weekly challenge this week " + formattedWeek);
    }
  }
  $("#weekly-challenges-box").append(content);
});

function getLiveStats(formattedWeek) {
  var liveStats = {};
  const d = new Date();
  let ms = d.getMilliseconds();
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
        const stats = lines[x].split("|");
        liveStats[stats[0]] = stats;
      }
    },
  }).fail(function () {
    if (console) console.log("error");
  });
  return liveStats;
}

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

function mostTeamPoints(week, franchises, isPlayoff, storageKey) {
  var maxScoreFranchise;
  if (
    storageKey !== "" &&
    localStorage.getItem(storageKey) !== null &&
    localStorage.getItem(storageKey) != "undefined"
  ) {
    maxScoreFranchise = JSON.parse(localStorage.getItem(storageKey));
    return maxScoreFranchise;
  }
  const liveScoring = getLiveScoring(week);
  if (isPlayoff) {
    for (x in liveScoring.liveScoring.franchise) {
      if (
        maxScoreFranchise === undefined ||
        parseFloat(liveScoring.liveScoring.franchise[x].score) >
          parseFloat(maxScoreFranchise.score)
      ) {
        maxScoreFranchise = liveScoring.liveScoring.franchise[x];
      }
    }
  } else {
    for (x in liveScoring.liveScoring.matchup) {
      for (y in liveScoring.liveScoring.matchup[x].franchise) {
        if (
          maxScoreFranchise === undefined ||
          parseFloat(liveScoring.liveScoring.matchup[x].franchise[y].score) >
            parseFloat(maxScoreFranchise.score)
        ) {
          maxScoreFranchise = liveScoring.liveScoring.matchup[x].franchise[y];
        }
      }
    }
  }
  // console.log(maxScoreFranchise,franchises["fid_"+maxScoreFranchise.id]);
  let maxTeamPoints = {
    ...maxScoreFranchise,
    ...franchises["fid_" + maxScoreFranchise.id],
  };
  if (storageKey !== "")
    localStorage.setItem(storageKey, JSON.stringify(maxTeamPoints));
  return maxTeamPoints;
}

function mostPlayerPoints(week, franchises, players, positions, storageKey) {
  var mostPlayerPoints;
  if (
    localStorage.getItem(storageKey) !== null &&
    localStorage.getItem(storageKey) != "undefined"
  ) {
    mostPlayerPoints = JSON.parse(localStorage.getItem(storageKey));
    return mostPlayerPoints;
  }
  const liveScoring = getLiveScoring(week);
  for (x in liveScoring.liveScoring.matchup) {
    for (y in liveScoring.liveScoring.matchup[x].franchise) {
      for (z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
        for (zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]) {
          var playerScore =
            liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
          var playerInfo = players["pid_" + playerScore.id];
          if (positions.includes(playerInfo.position)) {
            if (
              mostPlayerPoints === undefined ||
              parseFloat(playerScore.score) > parseFloat(mostPlayerPoints.score)
            ) {
              var playerName = playerInfo.name;
              var franchiseName =
                franchises[
                  "fid_" + liveScoring.liveScoring.matchup[x].franchise[y].id
                ].name;
              mostPlayerPoints = {
                playerName,
                ...playerScore,
                franchiseName,
              };
            }
          }
        }
      }
    }
  }
  localStorage.setItem(storageKey, JSON.stringify(mostPlayerPoints));
  return mostPlayerPoints;
}

function mostAllPurposeYards(
  week,
  formattedWeek,
  franchises,
  players,
  storageKey
) {
  var mostAllPurposeYards;
  if (
    localStorage.getItem(storageKey) !== null &&
    localStorage.getItem(storageKey) != "undefined"
  ) {
    mostAllPurposeYards = JSON.parse(localStorage.getItem(storageKey));
    return mostAllPurposeYards;
  }
  const liveStats = getLiveStats(formattedWeek);
  const liveScoring = getLiveScoring(week);
  var rcyRegEx = new RegExp("^(RCY|KY|UY) [0-9]{1,3}$");
  for (x in liveScoring.liveScoring.matchup) {
    for (y in liveScoring.liveScoring.matchup[x].franchise) {
      var totalFranchiseYards = 0;
      for (z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
        for (zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]) {
          var playerScore =
            liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
          var playerInfo = players["pid_" + playerScore.id];
          var playerStats = liveStats[playerScore.id];
          for (yy in playerStats) {
            if (rcyRegEx.test(playerStats[yy])) {
              var rushCatchYards = playerStats[yy].replace(/[^0-9]/g, "");
              totalFranchiseYards += parseInt(rushCatchYards);
            }
          }
        }
      }
      if (
        mostAllPurposeYards === undefined ||
        totalFranchiseYards > parseInt(mostAllPurposeYards.totalFranchiseYards)
      ) {
        var franchiseInfo =
          franchises[
            "fid_" + liveScoring.liveScoring.matchup[x].franchise[y].id
          ];
        mostAllPurposeYards = {
          totalFranchiseYards,
          ...franchiseInfo,
        };
      }
    }
  }
  localStorage.setItem(storageKey, JSON.stringify(mostAllPurposeYards));
  return mostAllPurposeYards;
}

function longestTouchdownPass(
  week,
  formattedWeek,
  franchises,
  players,
  storageKey
) {
  var longestTouchDownPass;
  if (
    localStorage.getItem(storageKey) !== null &&
    localStorage.getItem(storageKey) != "undefined"
  ) {
    longestTouchDownPass = JSON.parse(localStorage.getItem(storageKey));
    return longestTouchDownPass;
  }
  const liveStats = getLiveStats(formattedWeek);
  const liveScoring = getLiveScoring(week);
  var touchDownPassesRegEx = new RegExp("^PS [0-9]{1,3}(?:,[0-9]{1,3})*$");
  for (x in liveScoring.liveScoring.matchup) {
    for (y in liveScoring.liveScoring.matchup[x].franchise) {
      var franchiseInfo =
        franchises["fid_" + liveScoring.liveScoring.matchup[x].franchise[y].id];
      for (z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
        for (zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]) {
          var playerScore =
            liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
          var playerInfo = players["pid_" + playerScore.id];
          var playerStats = liveStats[playerScore.id];
          for (yy in playerStats) {
            if (touchDownPassesRegEx.test(playerStats[yy])) {
              var passingTouchdowns = playerStats[yy].slice(3).split(",");
              for (pp in passingTouchdowns) {
                if (
                  longestTouchDownPass === undefined ||
                  parseInt(passingTouchdowns[pp]) >
                    parseInt(longestTouchDownPass.pass)
                ) {
                  var pass = passingTouchdowns[pp];
                  var playerName = playerInfo.name;
                  longestTouchDownPass = {
                    pass,
                    playerName,
                    ...franchiseInfo,
                  };
                }
              }
            }
          }
        }
      }
    }
  }
  localStorage.setItem(storageKey, JSON.stringify(longestTouchDownPass));
  return longestTouchDownPass;
}

function mostTeamReceptions(
  week,
  formattedWeek,
  franchises,
  players,
  storageKey
) {
  var mostTeamReceptions;
  if (
    localStorage.getItem(storageKey) !== null &&
    localStorage.getItem(storageKey) != "undefined"
  ) {
    mostTeamReceptions = JSON.parse(localStorage.getItem(storageKey));
    return mostTeamReceptions;
  }
  const liveStats = getLiveStats(formattedWeek);
  const liveScoring = getLiveScoring(week);
  var rcyRegEx = new RegExp("^CC [0-9]{1,3}$");
  for (x in liveScoring.liveScoring.matchup) {
    for (y in liveScoring.liveScoring.matchup[x].franchise) {
      var totalReceptions = 0;
      for (z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
        for (zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]) {
          var playerScore =
            liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
          var playerInfo = players["pid_" + playerScore.id];
          var playerStats = liveStats[playerScore.id];
          for (yy in playerStats) {
            if (rcyRegEx.test(playerStats[yy])) {
              var receptions = playerStats[yy].replace(/[^0-9]/g, "");
              totalReceptions += parseInt(receptions);
            }
          }
        }
      }
      if (
        mostTeamReceptions === undefined ||
        totalReceptions > parseInt(mostTeamReceptions.totalReceptions)
      ) {
        var franchiseInfo =
          franchises[
            "fid_" + liveScoring.liveScoring.matchup[x].franchise[y].id
          ];
        mostTeamReceptions = {
          totalReceptions,
          ...franchiseInfo,
        };
      }
    }
  }
  localStorage.setItem(storageKey, JSON.stringify(mostTeamReceptions));
  return mostTeamReceptions;
}

//tie breaker is next highest receiver receptions until one has a higher receptions
function mostPlayerReceptions(
  week,
  formattedWeek,
  franchises,
  players,
  storageKey
) {
  var mostPlayerReceptions;
  if (
    localStorage.getItem(storageKey) !== null &&
    localStorage.getItem(storageKey) != "undefined"
  ) {
    mostPlayerReceptions = JSON.parse(localStorage.getItem(storageKey));
    return mostPlayerReceptions;
  }
  const liveStats = getLiveStats(formattedWeek);
  const liveScoring = getLiveScoring(week);
  var rcyRegEx = new RegExp("^CC [0-9]{1,3}$");
  for (x in liveScoring.liveScoring.matchup) {
    for (y in liveScoring.liveScoring.matchup[x].franchise) {
      var franchiseInfo =
        franchises["fid_" + liveScoring.liveScoring.matchup[x].franchise[y].id];
      var playerReceptions = [];
      for (z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
        for (zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]) {
          var playerScore =
            liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
          var playerInfo = players["pid_" + playerScore.id];
          var playerStats = liveStats[playerScore.id];
          var playerName = playerInfo.name;
          for (yy in playerStats) {
            if (rcyRegEx.test(playerStats[yy])) {
              var receptions = playerStats[yy].replace(/[^0-9]/g, "");
              playerReceptions.push({
                playerName,
                receptions,
              });
            }
          }
        }
      }
      if (playerReceptions.length === 0) {
        continue;
      }
      playerReceptions.sort((a, b) => b.receptions - a.receptions);
      if (mostPlayerReceptions === undefined) {
        mostPlayerReceptions = {
          ...franchiseInfo,
          ...playerReceptions[0],
          playerReceptions,
        };
        continue;
      }
      if (
        parseInt(playerReceptions[0].receptions) >
        parseInt(mostPlayerReceptions.receptions)
      ) {
        mostPlayerReceptions = {
          ...franchiseInfo,
          ...playerReceptions[0],
          playerReceptions,
        };
        continue;
      }
      if (
        parseInt(playerReceptions[0].receptions) ==
        parseInt(mostPlayerReceptions.receptions)
      ) {
        // console.log("all equal","mostReceptions",mostPlayerReceptions,"playerReceptions",playerReceptions);
        for (rr in playerReceptions) {
          // if incoming is less, break as current placeholder wins
          if (
            parseInt(playerReceptions[rr].receptions) <
            parseInt(mostPlayerReceptions.playerReceptions[rr].receptions)
          ) {
            break;
          }
          if (
            parseInt(playerReceptions[rr].receptions) >
            parseInt(mostPlayerReceptions.playerReceptions[rr].receptions)
          ) {
            mostPlayerReceptions = {
              ...franchiseInfo,
              ...playerReceptions[0],
              playerReceptions,
            };
            break;
          }
        }
      }
    }
  }
  localStorage.setItem(storageKey, JSON.stringify(mostPlayerReceptions));
  return mostPlayerReceptions;
}

function mostTeamTDS(week, formattedWeek, franchises, players, storageKey) {
  var mostTeamTds;
  if (
    localStorage.getItem(storageKey) !== null &&
    localStorage.getItem(storageKey) != "undefined"
  ) {
    mostTeamTds = JSON.parse(localStorage.getItem(storageKey));
    return mostTeamTds;
  }
  const liveStats = getLiveStats(formattedWeek);
  const liveScoring = getLiveScoring(week);
  var rcyRegEx = new RegExp("^#TD [0-9]{1,3}$");
  for (x in liveScoring.liveScoring.matchup) {
    for (y in liveScoring.liveScoring.matchup[x].franchise) {
      var totalTDs = 0;
      for (z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
        for (zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]) {
          var playerScore =
            liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
          var playerInfo = players["pid_" + playerScore.id];
          var playerStats = liveStats[playerScore.id];
          for (yy in playerStats) {
            if (rcyRegEx.test(playerStats[yy])) {
              var tds = playerStats[yy].replace(/[^0-9]/g, "");
              totalTDs += parseInt(tds);
            }
          }
        }
      }
      // console.log("total tds", totalTDs, "mostTotalTeamTDS", mostTeamTds);
      if (
        mostTeamTds === undefined ||
        totalTDs > parseInt(mostTeamTds.totalTDs)
      ) {
        var franchiseInfo =
          franchises[
            "fid_" + liveScoring.liveScoring.matchup[x].franchise[y].id
          ];
        mostTeamTds = {
          totalTDs,
          ...franchiseInfo,
        };
      }
    }
  }
  localStorage.setItem(storageKey, JSON.stringify(mostTeamTds));
  return mostTeamTds;
}

function biggestWinMargin(week, franchises, storageKey) {
  var maxMargin;
  if (
    localStorage.getItem(storageKey) !== null &&
    localStorage.getItem(storageKey) != "undefined"
  ) {
    maxMargin = JSON.parse(localStorage.getItem(storageKey));
    return maxMargin;
  }
  const liveScoring = getLiveScoring(week);
  for (x in liveScoring.liveScoring.matchup) {
    let f1 = liveScoring.liveScoring.matchup[x].franchise[0];
    let f2 = liveScoring.liveScoring.matchup[x].franchise[1];
    if (parseInt(f1.score) > parseInt(f2.score)) {
      let margin = parseInt(f1.score) - parseInt(f2.score);
      if (maxMargin === undefined || margin > maxMargin.margin) {
        maxMargin = {
          margin,
          ...franchises["fid_" + f1.id],
        };
      }
    } else {
      let margin = parseInt(f2.score) - parseInt(f1.score);
      if (maxMargin === undefined || margin > maxMargin.margin) {
        maxMargin = {
          margin,
          ...franchises["fid_" + f2.id],
        };
      }
    }
  }
  localStorage.setItem(storageKey, JSON.stringify(maxMargin));
  return maxMargin;
}

function mostPlayerAllPurposeYards(
  week,
  formattedWeek,
  franchises,
  players,
  positions,
  storageKey
) {
  var mostPlayerAllPurposeYards;
  if (
    localStorage.getItem(storageKey) !== null &&
    localStorage.getItem(storageKey) != "undefined"
  ) {
    mostPlayerAllPurposeYards = JSON.parse(localStorage.getItem(storageKey));
    return mostPlayerAllPurposeYards;
  }
  const liveStats = getLiveStats(formattedWeek);
  const liveScoring = getLiveScoring(week);
  var rcyRegEx = new RegExp("^(RCY|KY|UY) [0-9]{1,3}$");
  for (x in liveScoring.liveScoring.matchup) {
    for (y in liveScoring.liveScoring.matchup[x].franchise) {
      for (z in liveScoring.liveScoring.matchup[x].franchise[y].players) {
        for (zz in liveScoring.liveScoring.matchup[x].franchise[y].players[z]) {
          var playerScore =
            liveScoring.liveScoring.matchup[x].franchise[y].players[z][zz];
          var playerInfo = players["pid_" + playerScore.id];
          var playerStats = liveStats[playerScore.id];
          var totalPlayerYards = 0;
          if (positions.includes(playerInfo.position)) {
            for (yy in playerStats) {
              if (rcyRegEx.test(playerStats[yy])) {
                var rushCatchYards = playerStats[yy].replace(/[^0-9]/g, "");
                totalPlayerYards += parseInt(rushCatchYards);
              }
            }
            if (
              mostPlayerAllPurposeYards === undefined ||
              totalPlayerYards >
                parseInt(mostPlayerAllPurposeYards.totalPlayerYards)
            ) {
              var playerName = playerInfo.name;
              var franchiseInfo =
                franchises[
                  "fid_" + liveScoring.liveScoring.matchup[x].franchise[y].id
                ];
              mostPlayerAllPurposeYards = {
                totalPlayerYards,
                ...franchiseInfo,
                playerName,
              };
            }
          }
        }
      }
    }
  }
  localStorage.setItem(storageKey, JSON.stringify(mostPlayerAllPurposeYards));
  return mostPlayerAllPurposeYards;
}
