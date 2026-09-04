function getWeeklyChallengeResults(maxWeek) {
  console.group("=== [Weekly Challenges Debugger] Starting Calculation ===");

  let currentYear = typeof year !== "undefined" ? year : "";
  if (!currentYear && typeof window !== "undefined" && window.location) {
    let match = window.location.pathname.match(/\/(\d{4})\//);
    if (match) currentYear = match[1];
  }

  let currentLeagueId = typeof league_id !== "undefined" ? league_id : "";
  if (!currentLeagueId && typeof window !== "undefined" && window.location) {
    let match = window.location.pathname.match(/\/home\/(\d+)/);
    if (match) currentLeagueId = match[1];
  }

  let currentHost =
    typeof window !== "undefined" && window.location
      ? window.location.host
      : "";
  let fDb = typeof franchiseDatabase !== "undefined" ? franchiseDatabase : {};
  let pDb = getPlayerDatabase(currentYear);
  let limitWeek =
    typeof maxWeek !== "undefined"
      ? maxWeek
      : typeof completedWeek !== "undefined"
      ? completedWeek
      : 16;

  console.log("Global Context:", {
    year: currentYear,
    league_id: currentLeagueId,
    host: currentHost,
    completedWeek: typeof completedWeek !== "undefined" ? completedWeek : "undefined",
    limitWeekUsed: limitWeek,
    franchiseDatabaseCount: Object.keys(fDb).length,
    playerDatabaseCount: Object.keys(pDb).length,
  });

  if (Object.keys(fDb).length === 0) {
    console.warn(
      "[DEBUG WARNING] franchiseDatabase is empty or undefined! Franchise names might fallback to IDs."
    );
  }
  if (Object.keys(pDb).length === 0) {
    console.warn(
      "[DEBUG WARNING] playerDatabase is empty or undefined! Player-based challenges may not find matching positions."
    );
  }

  let results = {};

  let challenges = [
    {
      name: "Most Team Points",
      week: 1,
      calculate() {
        return getMostTeamPoints(1, fDb, false, currentYear, currentLeagueId, currentHost);
      },
    },
    {
      name: "Most All-Purpose Yards",
      week: 2,
      calculate() {
        return getMostAllPurposeYards(2, "02", fDb, pDb, currentYear, currentLeagueId, currentHost);
      },
    },
    {
      name: "Most Points from Single Running Back",
      week: 3,
      calculate() {
        return getMostPlayerPoints(3, fDb, pDb, ["RB"], currentYear, currentLeagueId, currentHost);
      },
    },
    {
      name: "Most Points from Single QuarterBack",
      week: 4,
      calculate() {
        return getMostPlayerPoints(4, fDb, pDb, ["QB"], currentYear, currentLeagueId, currentHost);
      },
    },
    {
      name: "Most Kicker Points",
      week: 5,
      calculate() {
        return getMostPlayerPoints(5, fDb, pDb, ["PK"], currentYear, currentLeagueId, currentHost);
      },
    },
    {
      name: "Longest QB TD",
      week: 6,
      calculate() {
        return getLongestTouchdownPass(6, "06", fDb, pDb, currentYear, currentLeagueId, currentHost);
      },
    },
    {
      name: "Most Team Receptions",
      week: 7,
      calculate() {
        return getMostTeamReceptions(7, "07", fDb, pDb, currentYear, currentLeagueId, currentHost);
      },
    },
    {
      name: "Most DEF Points",
      week: 8,
      calculate() {
        return getMostPlayerPoints(8, fDb, pDb, ["Def"], currentYear, currentLeagueId, currentHost);
      },
    },
    {
      name: "Most Single Player Receptions",
      week: 9,
      calculate() {
        return getMostPlayerReceptions(9, "09", fDb, pDb, currentYear, currentLeagueId, currentHost);
      },
    },
    {
      name: "Most Points from Single Tight End",
      week: 10,
      calculate() {
        return getMostPlayerPoints(10, fDb, pDb, ["TE"], currentYear, currentLeagueId, currentHost);
      },
    },
    {
      name: "Most Team TDs",
      week: 11,
      calculate() {
        return getMostTeamTDS(11, "11", fDb, pDb, currentYear, currentLeagueId, currentHost);
      },
    },
    {
      name: "Player with Most Points (No QB)",
      week: 12,
      calculate() {
        return getMostPlayerPoints(12, fDb, pDb, ["RB", "WR", "TE"], currentYear, currentLeagueId, currentHost);
      },
    },
    {
      name: "Greatest Win Margin",
      week: 13,
      calculate() {
        return getBiggestWinMargin(13, fDb, currentYear, currentLeagueId, currentHost);
      },
    },
    {
      name: "Player with Most Yards (No QB)",
      week: 14,
      calculate() {
        return getMostPlayerAllPurposeYards(
          14,
          "14",
          fDb,
          pDb,
          ["RB", "WR", "TE"],
          currentYear,
          currentLeagueId,
          currentHost
        );
      },
    },
    {
      name: "Most Team Points",
      week: 15,
      calculate() {
        return getMostTeamPoints(15, fDb, true, currentYear, currentLeagueId, currentHost);
      },
    },
    {
      name: "Most Team Points",
      week: 16,
      calculate() {
        return getMostTeamPoints(16, fDb, true, currentYear, currentLeagueId, currentHost);
      },
    },
  ];

  let summary = [];

  for (let i = 0; i < challenges.length; i++) {
    let c = challenges[i];
    let key = "Week " + c.week + ": " + c.name;
    if (c.week <= limitWeek) {
      console.group(`[DEBUG] Evaluating ${key}`);
      try {
        let res = c.calculate();
        results[key] = res;
        let count = Array.isArray(res) ? res.length : 0;
        let topItem = count > 0 ? res[0] : null;

        console.log(`[DEBUG Result] ${key}:`, {
          totalEntries: count,
          topLeader: topItem,
          fullList: res,
        });

        if (count === 0) {
          console.warn(
            `[DEBUG WARNING] ${key} yielded 0 results. Check network requests or data parsing above.`
          );
          summary.push({ week: c.week, challenge: c.name, status: "EMPTY (0 entries)", top: "N/A" });
        } else {
          summary.push({
            week: c.week,
            challenge: c.name,
            status: "OK (" + count + " entries)",
            top: topItem ? JSON.stringify(topItem) : "N/A",
          });
        }
      } catch (err) {
        console.error(`[DEBUG ERROR] Exception running ${key}:`, err);
        results[key] = { error: err.message, stack: err.stack };
        summary.push({ week: c.week, challenge: c.name, status: "ERROR: " + err.message, top: "N/A" });
      }
      console.groupEnd();
    } else {
      console.log(`[DEBUG] Skipping ${key} because week ${c.week} > limitWeek ${limitWeek}`);
      summary.push({ week: c.week, challenge: c.name, status: "SKIPPED", top: "N/A" });
    }
  }

  console.group("=== [Weekly Challenges Debugger] Execution Summary ===");
  if (console.table) {
    console.table(summary);
  } else {
    console.log("Summary:", summary);
  }
  console.log("Full Results Object:", results);
  console.groupEnd();
  console.groupEnd();

  return results;
}

function getPlayerDatabase(yearOverride) {
  if (
    typeof playerDatabase !== "undefined" &&
    Object.keys(playerDatabase).length > 0
  ) {
    return playerDatabase;
  }
  if (
    typeof window !== "undefined" &&
    window.playerDatabase &&
    Object.keys(window.playerDatabase).length > 0
  ) {
    return window.playerDatabase;
  }

  let pDb = {};
  let currentYear = yearOverride || (typeof year !== "undefined" ? year : "");
  if (!currentYear && typeof window !== "undefined" && window.location) {
    let match = window.location.pathname.match(/\/(\d{4})\//);
    if (match) currentYear = match[1];
  }

  let url =
    "https://api.myfantasyleague.com/" +
    currentYear +
    "/export?TYPE=players&JSON=1";

  console.log(
    `[DEBUG PlayerDB] playerDatabase not found on page. Fetching player database from ${url}...`
  );

  $.ajax({
    async: false,
    url: url,
    dataType: "json",
    success: function (data) {
      if (data && data.players && data.players.player) {
        let list = data.players.player;
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          pDb["pid_" + item.id] = {
            id: item.id,
            name: item.name,
            position: item.position,
            team: item.team,
          };
        }
        console.log(
          `[DEBUG PlayerDB OK] Successfully loaded ${Object.keys(pDb).length} players from MFL API.`
        );
        if (typeof window !== "undefined") {
          window.playerDatabase = pDb;
        }
      }
    },
  }).fail(function (xhr, status, err) {
    console.error(`[DEBUG PlayerDB FAIL] Could not load players from ${url}:`, err);
  });

  return pDb;
}

function getLiveStats(formattedWeek, yearOverride, hostOverride) {
  var liveStats = {};
  const d = new Date();
  let ms = d.getMilliseconds();
  let currentYear = yearOverride || (typeof year !== "undefined" ? year : "");
  let host =
    hostOverride ||
    (typeof window !== "undefined" && window.location
      ? window.location.host
      : "");
  let url =
    "https://" +
    host +
    "/fflnetdynamic" +
    currentYear +
    "/live_stats_" +
    formattedWeek +
    ".txt?RANDOM=" +
    ms;

  console.log(`[DEBUG Network] Fetching liveStats: ${url}`);

  $.ajax({
    async: false,
    url: url,
    dataType: "text",
    success: function (data, textStatus, xhr) {
      const lines = data.split("\n");
      for (let x in lines) {
        const stats = lines[x].split("|");
        liveStats[stats[0]] = stats;
      }
      let count = Object.keys(liveStats).length;
      console.log(
        `[DEBUG Network OK] liveStats W${formattedWeek} loaded (${count} player stat records, status: ${xhr ? xhr.status : 200})`
      );
    },
  }).fail(function (xhr, textStatus, errorThrown) {
    console.error(`[DEBUG Network FAIL] liveStats W${formattedWeek} FAILED:`, {
      url: url,
      httpStatus: xhr ? xhr.status : "unknown",
      statusText: xhr ? xhr.statusText : textStatus,
      errorThrown: errorThrown,
    });
  });

  return liveStats;
}

function getLiveScoring(week, yearOverride, leagueOverride, hostOverride) {
  var liveScoring = null;
  let currentYear = yearOverride || (typeof year !== "undefined" ? year : "");
  let currentLeagueId = leagueOverride || (typeof league_id !== "undefined" ? league_id : "");
  let host =
    hostOverride ||
    (typeof window !== "undefined" && window.location
      ? window.location.host
      : "");
  let url =
    "https://" +
    host +
    "/" +
    currentYear +
    "/export?TYPE=liveScoring&L=" +
    currentLeagueId +
    "&W=" +
    week +
    "&JSON=1";

  console.log(`[DEBUG Network] Fetching liveScoring: ${url}`);

  $.ajax({
    async: false,
    url: url,
    dataType: "json",
    success: function (data, textStatus, xhr) {
      liveScoring = data;
      let ls = data && data.liveScoring ? data.liveScoring : null;
      console.log(`[DEBUG Network OK] liveScoring W${week} loaded:`, {
        httpStatus: xhr ? xhr.status : 200,
        hasMatchup: ls ? !!ls.matchup : false,
        matchupIsArray: ls && ls.matchup ? Array.isArray(ls.matchup) : false,
        matchupCount: ls && ls.matchup ? (Array.isArray(ls.matchup) ? ls.matchup.length : 1) : 0,
        hasFranchise: ls ? !!ls.franchise : false,
        franchiseCount: ls && ls.franchise ? (Array.isArray(ls.franchise) ? ls.franchise.length : 1) : 0,
      });
    },
  }).fail(function (xhr, textStatus, errorThrown) {
    console.error(`[DEBUG Network FAIL] liveScoring W${week} FAILED:`, {
      url: url,
      httpStatus: xhr ? xhr.status : "unknown",
      statusText: xhr ? xhr.statusText : textStatus,
      errorThrown: errorThrown,
    });
  });

  return liveScoring;
}

// Week 1, 15, 16
function getMostTeamPoints(week, franchises, isPlayoff, yearVal, leagueVal, hostVal) {
  const liveScoring = getLiveScoring(week, yearVal, leagueVal, hostVal);
  if (!liveScoring || !liveScoring.liveScoring) {
    console.warn(`[DEBUG W${week} MostTeamPoints] Missing liveScoring payload.`);
    return [];
  }
  let teamScores = [];
  let ls = liveScoring.liveScoring;

  console.log(`[DEBUG W${week} MostTeamPoints] Parsing liveScoring:`, {
    isPlayoffFlag: isPlayoff,
    hasLsFranchise: !!ls.franchise,
    hasLsMatchup: !!ls.matchup,
  });

  // Check direct franchise array (used in playoff weeks or leagues with non-matchup scoring)
  if (ls.franchise) {
    let franchiseList = Array.isArray(ls.franchise) ? ls.franchise : [ls.franchise];
    for (let x in franchiseList) {
      let franchise = franchiseList[x];
      let fInfo = franchises["fid_" + franchise.id];
      teamScores.push({
        franchiseId: franchise.id,
        name: fInfo ? fInfo.name : franchise.id,
        score: parseFloat(franchise.score) || 0,
      });
    }
  }

  // Also check matchup list (used in regular matchups and standard playoff brackets)
  if (ls.matchup) {
    let matchupList = Array.isArray(ls.matchup) ? ls.matchup : [ls.matchup];
    for (let x in matchupList) {
      let fList = matchupList[x].franchise;
      let franchisesInMatchup = Array.isArray(fList) ? fList : (fList ? [fList] : []);
      for (let y in franchisesInMatchup) {
        let franchise = franchisesInMatchup[y];
        // Avoid duplicate if already collected
        if (!teamScores.some((t) => t.franchiseId === franchise.id)) {
          let fInfo = franchises["fid_" + franchise.id];
          teamScores.push({
            franchiseId: franchise.id,
            name: fInfo ? fInfo.name : franchise.id,
            score: parseFloat(franchise.score) || 0,
          });
        }
      }
    }
  }

  teamScores.sort((a, b) => b.score - a.score);
  console.log(`[DEBUG W${week} MostTeamPoints] Collected ${teamScores.length} team scores.`);
  return teamScores;
}

// Week 2
function getMostAllPurposeYards(week, formattedWeek, franchises, players, yearVal, leagueVal, hostVal) {
  const liveStats = getLiveStats(formattedWeek, yearVal, hostVal);
  const liveScoring = getLiveScoring(week, yearVal, leagueVal, hostVal);
  if (
    !liveScoring ||
    !liveScoring.liveScoring ||
    !liveScoring.liveScoring.matchup
  ) {
    console.warn(`[DEBUG W${week} AllPurposeYards] Missing liveScoring or matchup.`);
    return [];
  }
  let rcyRegEx = new RegExp("^(RCY|KY|UY) [0-9]{1,3}$");
  let results = [];
  let matchupList = Array.isArray(liveScoring.liveScoring.matchup)
    ? liveScoring.liveScoring.matchup
    : [liveScoring.liveScoring.matchup];

  for (let x in matchupList) {
    let fList = matchupList[x].franchise;
    let franchisesInMatchup = Array.isArray(fList) ? fList : (fList ? [fList] : []);
    for (let y in franchisesInMatchup) {
      let franchise = franchisesInMatchup[y];
      let totalFranchiseYards = 0;
      let franchisePlayers = franchise.players;
      if (franchisePlayers) {
        for (let z in franchisePlayers) {
          let pList = franchisePlayers[z];
          let playerArray = Array.isArray(pList) ? pList : (pList ? [pList] : []);
          for (let zz in playerArray) {
            let playerScore = playerArray[zz];
            let playerStats = liveStats[playerScore.id];
            if (playerStats) {
              for (let yy in playerStats) {
                if (rcyRegEx.test(playerStats[yy])) {
                  let rushCatchYards = playerStats[yy].replace(/[^0-9]/g, "");
                  totalFranchiseYards += parseInt(rushCatchYards, 10);
                }
              }
            }
          }
        }
      }
      let fInfo = franchises["fid_" + franchise.id];
      results.push({
        franchiseId: franchise.id,
        name: fInfo ? fInfo.name : franchise.id,
        yards: totalFranchiseYards,
      });
    }
  }
  results.sort((a, b) => b.yards - a.yards);
  console.log(`[DEBUG W${week} AllPurposeYards] Collected ${results.length} franchises.`);
  return results;
}

// Weeks 3, 4, 5, 8, 10, 12
function getMostPlayerPoints(week, franchises, players, positions, yearVal, leagueVal, hostVal) {
  const liveScoring = getLiveScoring(week, yearVal, leagueVal, hostVal);
  if (
    !liveScoring ||
    !liveScoring.liveScoring ||
    !liveScoring.liveScoring.matchup
  ) {
    console.warn(`[DEBUG W${week} PlayerPoints ${positions}] Missing liveScoring matchup.`);
    return [];
  }
  let results = [];
  let matchupList = Array.isArray(liveScoring.liveScoring.matchup)
    ? liveScoring.liveScoring.matchup
    : [liveScoring.liveScoring.matchup];

  let playersScanned = 0;
  let playersMatched = 0;

  for (let x in matchupList) {
    let fList = matchupList[x].franchise;
    let franchisesInMatchup = Array.isArray(fList) ? fList : (fList ? [fList] : []);
    for (let y in franchisesInMatchup) {
      let franchise = franchisesInMatchup[y];
      let fInfo = franchises["fid_" + franchise.id];
      let franchiseName = fInfo ? fInfo.name : franchise.id;
      let franchisePlayers = franchise.players;
      if (franchisePlayers) {
        for (let z in franchisePlayers) {
          let pList = franchisePlayers[z];
          let playerArray = Array.isArray(pList) ? pList : (pList ? [pList] : []);
          for (let zz in playerArray) {
            playersScanned++;
            let playerScore = playerArray[zz];
            let playerInfo = players["pid_" + playerScore.id];
            if (playerInfo && positions.includes(playerInfo.position)) {
              playersMatched++;
              results.push({
                playerId: playerScore.id,
                playerName: playerInfo.name,
                position: playerInfo.position,
                franchiseId: franchise.id,
                franchiseName: franchiseName,
                score: parseFloat(playerScore.score) || 0,
              });
            }
          }
        }
      }
    }
  }
  results.sort((a, b) => b.score - a.score);
  console.log(
    `[DEBUG W${week} PlayerPoints ${positions}] Scanned: ${playersScanned}, Matched positions: ${playersMatched}`
  );
  return results;
}

// Week 6
function getLongestTouchdownPass(week, formattedWeek, franchises, players, yearVal, leagueVal, hostVal) {
  const liveStats = getLiveStats(formattedWeek, yearVal, hostVal);
  const liveScoring = getLiveScoring(week, yearVal, leagueVal, hostVal);
  if (
    !liveScoring ||
    !liveScoring.liveScoring ||
    !liveScoring.liveScoring.matchup
  ) {
    console.warn(`[DEBUG W${week} LongestTouchdownPass] Missing liveScoring matchup.`);
    return [];
  }
  let touchDownPassesRegEx = new RegExp("^PS [0-9]{1,3}(?:,[0-9]{1,3})*$");
  let results = [];
  let matchupList = Array.isArray(liveScoring.liveScoring.matchup)
    ? liveScoring.liveScoring.matchup
    : [liveScoring.liveScoring.matchup];

  for (let x in matchupList) {
    let fList = matchupList[x].franchise;
    let franchisesInMatchup = Array.isArray(fList) ? fList : (fList ? [fList] : []);
    for (let y in franchisesInMatchup) {
      let franchise = franchisesInMatchup[y];
      let fInfo = franchises["fid_" + franchise.id];
      let franchiseName = fInfo ? fInfo.name : franchise.id;
      let franchisePlayers = franchise.players;
      if (franchisePlayers) {
        for (let z in franchisePlayers) {
          let pList = franchisePlayers[z];
          let playerArray = Array.isArray(pList) ? pList : (pList ? [pList] : []);
          for (let zz in playerArray) {
            let playerScore = playerArray[zz];
            let playerInfo = players["pid_" + playerScore.id];
            let playerStats = liveStats[playerScore.id];
            if (playerStats) {
              for (let yy in playerStats) {
                if (touchDownPassesRegEx.test(playerStats[yy])) {
                  let passingTouchdowns = playerStats[yy].slice(3).split(",");
                  for (let pp in passingTouchdowns) {
                    let passYards = parseInt(passingTouchdowns[pp], 10);
                    results.push({
                      playerId: playerScore.id,
                      playerName: playerInfo ? playerInfo.name : playerScore.id,
                      franchiseId: franchise.id,
                      franchiseName: franchiseName,
                      passYards: passYards,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  results.sort((a, b) => b.passYards - a.passYards);
  console.log(`[DEBUG W${week} LongestTouchdownPass] Matched passing TDs: ${results.length}`);
  return results;
}

// Week 7
function getMostTeamReceptions(week, formattedWeek, franchises, players, yearVal, leagueVal, hostVal) {
  const liveStats = getLiveStats(formattedWeek, yearVal, hostVal);
  const liveScoring = getLiveScoring(week, yearVal, leagueVal, hostVal);
  if (
    !liveScoring ||
    !liveScoring.liveScoring ||
    !liveScoring.liveScoring.matchup
  ) {
    console.warn(`[DEBUG W${week} MostTeamReceptions] Missing liveScoring matchup.`);
    return [];
  }
  let rcyRegEx = new RegExp("^CC [0-9]{1,3}$");
  let results = [];
  let matchupList = Array.isArray(liveScoring.liveScoring.matchup)
    ? liveScoring.liveScoring.matchup
    : [liveScoring.liveScoring.matchup];

  for (let x in matchupList) {
    let fList = matchupList[x].franchise;
    let franchisesInMatchup = Array.isArray(fList) ? fList : (fList ? [fList] : []);
    for (let y in franchisesInMatchup) {
      let franchise = franchisesInMatchup[y];
      let totalReceptions = 0;
      let franchisePlayers = franchise.players;
      if (franchisePlayers) {
        for (let z in franchisePlayers) {
          let pList = franchisePlayers[z];
          let playerArray = Array.isArray(pList) ? pList : (pList ? [pList] : []);
          for (let zz in playerArray) {
            let playerScore = playerArray[zz];
            let playerStats = liveStats[playerScore.id];
            if (playerStats) {
              for (let yy in playerStats) {
                if (rcyRegEx.test(playerStats[yy])) {
                  let receptions = playerStats[yy].replace(/[^0-9]/g, "");
                  totalReceptions += parseInt(receptions, 10);
                }
              }
            }
          }
        }
      }
      let fInfo = franchises["fid_" + franchise.id];
      results.push({
        franchiseId: franchise.id,
        name: fInfo ? fInfo.name : franchise.id,
        receptions: totalReceptions,
      });
    }
  }
  results.sort((a, b) => b.receptions - a.receptions);
  console.log(`[DEBUG W${week} MostTeamReceptions] Processed ${results.length} franchises.`);
  return results;
}

// Week 9
function getMostPlayerReceptions(week, formattedWeek, franchises, players, yearVal, leagueVal, hostVal) {
  const liveStats = getLiveStats(formattedWeek, yearVal, hostVal);
  const liveScoring = getLiveScoring(week, yearVal, leagueVal, hostVal);
  if (
    !liveScoring ||
    !liveScoring.liveScoring ||
    !liveScoring.liveScoring.matchup
  ) {
    console.warn(`[DEBUG W${week} PlayerReceptions] Missing liveScoring matchup.`);
    return [];
  }
  let rcyRegEx = new RegExp("^CC [0-9]{1,3}$");
  let results = [];
  let matchupList = Array.isArray(liveScoring.liveScoring.matchup)
    ? liveScoring.liveScoring.matchup
    : [liveScoring.liveScoring.matchup];

  for (let x in matchupList) {
    let fList = matchupList[x].franchise;
    let franchisesInMatchup = Array.isArray(fList) ? fList : (fList ? [fList] : []);
    for (let y in franchisesInMatchup) {
      let franchise = franchisesInMatchup[y];
      let fInfo = franchises["fid_" + franchise.id];
      let franchiseName = fInfo ? fInfo.name : franchise.id;
      let franchisePlayers = franchise.players;
      if (franchisePlayers) {
        for (let z in franchisePlayers) {
          let pList = franchisePlayers[z];
          let playerArray = Array.isArray(pList) ? pList : (pList ? [pList] : []);
          for (let zz in playerArray) {
            let playerScore = playerArray[zz];
            let playerInfo = players["pid_" + playerScore.id];
            let playerStats = liveStats[playerScore.id];
            if (playerStats) {
              for (let yy in playerStats) {
                if (rcyRegEx.test(playerStats[yy])) {
                  let receptions = parseInt(
                    playerStats[yy].replace(/[^0-9]/g, ""),
                    10
                  );
                  results.push({
                    playerId: playerScore.id,
                    playerName: playerInfo ? playerInfo.name : playerScore.id,
                    position: playerInfo ? playerInfo.position : "",
                    franchiseId: franchise.id,
                    franchiseName: franchiseName,
                    receptions: receptions,
                  });
                }
              }
            }
          }
        }
      }
    }
  }
  results.sort((a, b) => b.receptions - a.receptions);
  console.log(`[DEBUG W${week} PlayerReceptions] Found ${results.length} players with receptions.`);
  return results;
}

// Week 11
function getMostTeamTDS(week, formattedWeek, franchises, players, yearVal, leagueVal, hostVal) {
  const liveStats = getLiveStats(formattedWeek, yearVal, hostVal);
  const liveScoring = getLiveScoring(week, yearVal, leagueVal, hostVal);
  if (
    !liveScoring ||
    !liveScoring.liveScoring ||
    !liveScoring.liveScoring.matchup
  ) {
    console.warn(`[DEBUG W${week} MostTeamTDs] Missing liveScoring matchup.`);
    return [];
  }
  let rcyRegEx = new RegExp("^#TD [0-9]{1,3}$");
  let results = [];
  let matchupList = Array.isArray(liveScoring.liveScoring.matchup)
    ? liveScoring.liveScoring.matchup
    : [liveScoring.liveScoring.matchup];

  for (let x in matchupList) {
    let fList = matchupList[x].franchise;
    let franchisesInMatchup = Array.isArray(fList) ? fList : (fList ? [fList] : []);
    for (let y in franchisesInMatchup) {
      let franchise = franchisesInMatchup[y];
      let totalTDs = 0;
      let franchisePlayers = franchise.players;
      if (franchisePlayers) {
        for (let z in franchisePlayers) {
          let pList = franchisePlayers[z];
          let playerArray = Array.isArray(pList) ? pList : (pList ? [pList] : []);
          for (let zz in playerArray) {
            let playerScore = playerArray[zz];
            let playerStats = liveStats[playerScore.id];
            if (playerStats) {
              for (let yy in playerStats) {
                if (rcyRegEx.test(playerStats[yy])) {
                  let tds = playerStats[yy].replace(/[^0-9]/g, "");
                  totalTDs += parseInt(tds, 10);
                }
              }
            }
          }
        }
      }
      let fInfo = franchises["fid_" + franchise.id];
      results.push({
        franchiseId: franchise.id,
        name: fInfo ? fInfo.name : franchise.id,
        tds: totalTDs,
      });
    }
  }
  results.sort((a, b) => b.tds - a.tds);
  console.log(`[DEBUG W${week} MostTeamTDs] Processed ${results.length} franchises.`);
  return results;
}

// Week 13
function getBiggestWinMargin(week, franchises, yearVal, leagueVal, hostVal) {
  const liveScoring = getLiveScoring(week, yearVal, leagueVal, hostVal);
  if (
    !liveScoring ||
    !liveScoring.liveScoring ||
    !liveScoring.liveScoring.matchup
  ) {
    console.warn(`[DEBUG W${week} WinMargin] Missing liveScoring matchup.`);
    return [];
  }
  let results = [];
  let matchupList = Array.isArray(liveScoring.liveScoring.matchup)
    ? liveScoring.liveScoring.matchup
    : [liveScoring.liveScoring.matchup];

  for (let x in matchupList) {
    let matchup = matchupList[x];
    if (matchup.franchise && matchup.franchise.length >= 2) {
      let f1 = matchup.franchise[0];
      let f2 = matchup.franchise[1];
      let s1 = parseFloat(f1.score) || 0;
      let s2 = parseFloat(f2.score) || 0;
      let winner = s1 >= s2 ? f1 : f2;
      let loser = winner === f1 ? f2 : f1;
      let winnerScore = s1 >= s2 ? s1 : s2;
      let loserScore = winner === f1 ? s2 : s1;
      let margin = parseFloat((winnerScore - loserScore).toFixed(2));
      let winnerInfo = franchises["fid_" + winner.id];
      let loserInfo = franchises["fid_" + loser.id];
      results.push({
        winnerId: winner.id,
        winnerName: winnerInfo ? winnerInfo.name : winner.id,
        winnerScore: winnerScore,
        loserId: loser.id,
        loserName: loserInfo ? loserInfo.name : loser.id,
        loserScore: loserScore,
        margin: margin,
      });
    }
  }
  results.sort((a, b) => b.margin - a.margin);
  console.log(`[DEBUG W${week} WinMargin] Processed ${results.length} matchups.`);
  return results;
}

// Week 14
function getMostPlayerAllPurposeYards(
  week,
  formattedWeek,
  franchises,
  players,
  positions,
  yearVal,
  leagueVal,
  hostVal
) {
  const liveStats = getLiveStats(formattedWeek, yearVal, hostVal);
  const liveScoring = getLiveScoring(week, yearVal, leagueVal, hostVal);
  if (
    !liveScoring ||
    !liveScoring.liveScoring ||
    !liveScoring.liveScoring.matchup
  ) {
    console.warn(`[DEBUG W${week} PlayerAllPurposeYards] Missing liveScoring matchup.`);
    return [];
  }
  let rcyRegEx = new RegExp("^(RCY|KY|UY) [0-9]{1,3}$");
  let results = [];
  let matchupList = Array.isArray(liveScoring.liveScoring.matchup)
    ? liveScoring.liveScoring.matchup
    : [liveScoring.liveScoring.matchup];

  for (let x in matchupList) {
    let fList = matchupList[x].franchise;
    let franchisesInMatchup = Array.isArray(fList) ? fList : (fList ? [fList] : []);
    for (let y in franchisesInMatchup) {
      let franchise = franchisesInMatchup[y];
      let fInfo = franchises["fid_" + franchise.id];
      let franchiseName = fInfo ? fInfo.name : franchise.id;
      let franchisePlayers = franchise.players;
      if (franchisePlayers) {
        for (let z in franchisePlayers) {
          let pList = franchisePlayers[z];
          let playerArray = Array.isArray(pList) ? pList : (pList ? [pList] : []);
          for (let zz in playerArray) {
            let playerScore = playerArray[zz];
            let playerInfo = players["pid_" + playerScore.id];
            if (playerInfo && positions.includes(playerInfo.position)) {
              let playerStats = liveStats[playerScore.id];
              let totalPlayerYards = 0;
              if (playerStats) {
                for (let yy in playerStats) {
                  if (rcyRegEx.test(playerStats[yy])) {
                    let rushCatchYards = playerStats[yy].replace(/[^0-9]/g, "");
                    totalPlayerYards += parseInt(rushCatchYards, 10);
                  }
                }
              }
              results.push({
                playerId: playerScore.id,
                playerName: playerInfo.name,
                position: playerInfo.position,
                franchiseId: franchise.id,
                franchiseName: franchiseName,
                yards: totalPlayerYards,
              });
            }
          }
        }
      }
    }
  }
  results.sort((a, b) => b.yards - a.yards);
  console.log(`[DEBUG W${week} PlayerAllPurposeYards] Matched ${results.length} players.`);
  return results;
}

if (typeof window !== "undefined") {
  window.getWeeklyChallengeResults = getWeeklyChallengeResults;
}

if (typeof $ !== "undefined") {
  $(function () {
    let results = getWeeklyChallengeResults();
    if (typeof window !== "undefined") {
      window.weeklyChallengeResults = results;
    }
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    getWeeklyChallengeResults,
    getPlayerDatabase,
    getMostTeamPoints,
    getMostAllPurposeYards,
    getMostPlayerPoints,
    getLongestTouchdownPass,
    getMostTeamReceptions,
    getMostPlayerReceptions,
    getMostTeamTDS,
    getBiggestWinMargin,
    getMostPlayerAllPurposeYards,
  };
}
