$(function () {
  /*
        Week 1 = Most RB Points 
        Week 2 = Most QB Points 
        Week 3 = Most Team Points 
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
  //Build display
  let challenges = [
    {
      name: "Most Team Points",
      week: 1,
      challenge() {
        return mostTeamPointsHTML(
          1,
          franchiseDatabase,
          false,
          "smashBrosMostTeamPoints"
        );
      },
    },
    {
      name: "Most All-Purpose Yards",
      week: 2,
      challenge() {
        return mostAllPurposeYardsHTML(
          2,
          "02",
          franchiseDatabase,
          playerDatabase,
          "smashBrosMostAllPurposeYards"
        );
      },
    },
    {
      name: "Most Points from Single Running Back",
      week: 3,
      challenge() {
        return mostPlayerPointsHTML(
          3,
          franchiseDatabase,
          playerDatabase,
          ["RB"],
          "smashBrosMostRBPoints"
        );
      },
    },
    {
      name: "Most Points from Single QuarterBack",
      week: 4,
      challenge() {
        return mostPlayerPointsHTML(
          4,
          franchiseDatabase,
          playerDatabase,
          ["QB"],
          "smashBrosMostQBPoints"
        );
      },
    },
    {
      name: "Most Kicker Points",
      week: 5,
      challenge() {
        return mostPlayerPointsHTML(
          5,
          franchiseDatabase,
          playerDatabase,
          ["PK"],
          "smashBrosMostKickerPoints"
        );
      },
    },
    {
      name: "Longest QB TD",
      week: 6,
      challenge() {
        return longestTouchdownPassHTML(
          6,
          "06",
          franchiseDatabase,
          playerDatabase,
          "smashBrosLongestTouchdownPass"
        );
      },
    },
    {
      name: "Most Team Receptions",
      week: 7,
      challenge() {
        return mostTeamReceptionsHTML(
          7,
          "07",
          franchiseDatabase,
          playerDatabase,
          "smashBrosMostTeamReceptions"
        );
      },
    },
    {
      name: "Most DEF Points",
      week: 8,
      challenge() {
        return mostPlayerPointsHTML(
          8,
          franchiseDatabase,
          playerDatabase,
          ["Def"],
          "smashBrosMostDefensePoints"
        );
      },
    },
    {
      name: "Most Single Player Receptions",
      week: 9,
      challenge() {
        return mostPlayerReceptionsHTML(
          9,
          "09",
          franchiseDatabase,
          playerDatabase,
          "smashBrosMostPlayerReceptions2"
        );
      },
    },
    {
      name: "Most Points from Single Tight End",
      week: 10,
      challenge() {
        return mostPlayerPointsHTML(
          10,
          franchiseDatabase,
          playerDatabase,
          ["TE"],
          "smashBrosMostTEPoints"
        );
      },
    },
    {
      name: "Most Team TDs",
      week: 11,
      challenge() {
        return mostTeamTDSHTML(
          11,
          "11",
          franchiseDatabase,
          playerDatabase,
          "smashBrosMostTeamTDs2"
        );
      },
    },
    {
      name: "Player with Most Points (No QB)",
      week: 12,
      challenge() {
        return mostPlayerPointsHTML(
          12,
          franchiseDatabase,
          playerDatabase,
          ["RB", "WR", "TE"],
          "smashBrosMostNonQBPoints"
        );
      },
    },
    {
      name: "Greatest Win Margin",
      week: 13,
      challenge() {
        return biggestWinMarginHTML(
          13,
          franchiseDatabase,
          "smashedBrosGreatestWinMargin"
        );
      },
    },
    {
      name: "Player with Most Yards (No QB)",
      week: 14,
      challenge() {
        return mostPlayerAllPurposeYardsHTML(
          14,
          "14",
          franchiseDatabase,
          playerDatabase,
          ["RB", "WR", "TE"],
          "smashBrosMostNonQBYards"
        );
      },
    },
    {
      name: "Most Team Points",
      week: 15,
      challenge() {
        return mostTeamPointsHTML(
          15,
          franchiseDatabase,
          true,
          "smashBrosMostTeamPoints15"
        );
      },
    },
    {
      name: "Most Team Points",
      week: 16,
      challenge() {
        return mostTeamPointsHTML(
          16,
          franchiseDatabase,
          true,
          "smashBrosMostTeamPoints16"
        );
      },
    },
  ];
  let newContent = '<table align="center" cellpadding="2" width="100%">';
  for (x in challenges) {
    newContent +=
      "<tr><td colspan=2><h3>Week " +
      challenges[x].week +
      ": " +
      challenges[x].name +
      "</h3></td></tr>";
    if (challenges[x].week <= completedWeek) {
      newContent +=
        '<tr><td><div class="weekly-box" id="wc_week'+challenges[x].week+'">' +
        challenges[x].challenge() +
        "</div></td></tr>";
    }
  }
  newContent += "</table>";
  $("#weekly-challenges-box").append(newContent);
  // if (console) console.log(challenges, newContent);
  // var content = '<table align="center" cellpadding="2" width="100%">';
  // content +=
  //   '<tr><td colspan=2><h3>Week 1: Most Points from Single Running Back</h3></td></tr><tr><td><div id="wc_week1"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 2: Most Points from Single QuarterBack</h3></td></tr><tr><td><div id="wc_week2"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 3: Most Team Points</h3></td></tr><tr><td><div id="wc_week3"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 4: Most All-Purpose Yards</h3></td></tr><tr><td><div id="wc_week4"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 5: Most Kicker Points</h3></td></tr><tr><td><div id="wc_week5"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 6: Longest QB TD</h3></td></tr><tr><td><div id="wc_week6"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 7: Most Team Receptions</h3></td></tr><tr><td><div id="wc_week7"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 8: Most DEF Points</h3></td></tr><tr><td><div id="wc_week8"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 9: Most Single Player Receptions</h3></td></tr><tr><td><div id="wc_week9"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 10: Most Points from Single Tight End</h3></td></tr><tr><td><div id="wc_week10"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 11: Most Team TDs</h3></td></tr><tr><td><div id="wc_week11"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 12: Player with Most Points (No QB)</h3></td></tr><tr><td><div id="wc_week12"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 13: Greatest Win Margin</h3></td></tr><tr><td><div id="wc_week13"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 14: Player with Most Yards (No QB)</h3></td></tr><tr><td><div id="wc_week14"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 15: Most Team Points</h3></td></tr><tr><td><div id="wc_week15"></div></td></tr>';
  // content +=
  //   '<tr><td colspan=2><h3>Week 16: Most Team Points</h3></td></tr><tr><td><div id="wc_week16"></div></td></tr>';
  // content += "</table";
  // $("#weekly-challenges-box").append(content);

  // let challengeHtml = "";
  // for (i = 0; i <= completedWeek; i++) {
  //   let formattedWeek = i.toLocaleString("en-US", {
  //     minimumIntegerDigits: 2,
  //     useGrouping: false,
  //   });
  //   switch (i) {
  //     case 1:
  //       challengeHtml = mostPlayerPointsHTML(
  //         i,
  //         franchiseDatabase,
  //         playerDatabase,
  //         ["RB"],
  //         "smashBrosMostRBPoints"
  //       );
  //       // var maxRBPoints = mostPlayerPoints(
  //       //   i,
  //       //   franchiseDatabase,
  //       //   playerDatabase,
  //       //   ["RB"],
  //       //   "smashBrosMostRBPoints"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxRBPoints.franchiseName +
  //       //     '</span><span class="player-name">' +
  //       //     maxRBPoints.playerName +
  //       //     '</span><span class="wc_score">' +
  //       //     maxRBPoints.score +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " +
  //       //   i +
  //       //   ": Most Points from Single Running Back</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxRBPoints.franchiseName +
  //       //   "</td><td>" +
  //       //   maxRBPoints.playerName +
  //       //   " -- " +
  //       //   maxRBPoints.score +
  //       //   "</td></tr>";
  //       break;
  //     case 2:
  //       challengeHtml = mostPlayerPointsHTML(
  //         i,
  //         franchiseDatabase,
  //         playerDatabase,
  //         ["QB"],
  //         "smashBrosMostQBPoints"
  //       );
  //       // var maxQBPoints = mostPlayerPoints(
  //       //   i,
  //       //   franchiseDatabase,
  //       //   playerDatabase,
  //       //   ["QB"],
  //       //   "smashBrosMostQBPoints"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxQBPoints.franchiseName +
  //       //     '</span><span class="player-name">' +
  //       //     maxQBPoints.playerName +
  //       //     '</span><span class="wc_score">' +
  //       //     maxQBPoints.score +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " +
  //       //   i +
  //       //   ": Most Points from Single QuarterBack</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxQBPoints.franchiseName +
  //       //   "</td><td>" +
  //       //   maxQBPoints.playerName +
  //       //   " -- " +
  //       //   maxQBPoints.score +
  //       //   "</td></tr>";
  //       break;
  //     case 3:
  //       challengeHtml = mostTeamPointsHTML(
  //         i,
  //         franchiseDatabase,
  //         false,
  //         "smashBrosMostTeamPoints"
  //       );
  //       // let maxPointsFranchise = mostTeamPoints(
  //       //   i,
  //       //   franchiseDatabase,
  //       //   false,
  //       //   "smashBrosMostTeamPoints"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxPointsFranchise.franchiseName +
  //       //     '</span><span class="wc_score">' +
  //       //     maxPointsFranchise.score +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " +
  //       //   i +
  //       //   ": Most Team Points</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxPointsFranchise.name +
  //       //   "</td><td>" +
  //       //   maxPointsFranchise.score +
  //       //   "</td></tr>";
  //       break;
  //     case 4:
  //       challengeHtml = mostAllPurposeYardsHTML(
  //         i,
  //         formattedWeek,
  //         franchiseDatabase,
  //         playerDatabase,
  //         "smashBrosMostAllPurposeYards"
  //       );
  //       // var maxAllPurposeYards = mostAllPurposeYards(
  //       //   i,
  //       //   formattedWeek,
  //       //   franchiseDatabase,
  //       //   playerDatabase,
  //       //   "smashBrosMostAllPurposeYards"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxAllPurposeYards.name +
  //       //     '</span><span class="wc_score">' +
  //       //     maxAllPurposeYards.totalFranchiseYards +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " +
  //       //   i +
  //       //   ": Most All-Purpose Yards</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxAllPurposeYards.name +
  //       //   "</td><td>" +
  //       //   maxAllPurposeYards.totalFranchiseYards +
  //       //   "</td></tr>";
  //       break;
  //     case 5:
  //       challengeHtml = mostPlayerPointsHTML(
  //         i,
  //         franchiseDatabase,
  //         playerDatabase,
  //         ["PK"],
  //         "smashBrosMostKickerPoints"
  //       );
  //       // var maxKickerPoints = mostPlayerPoints(
  //       //   i,
  //       //   franchiseDatabase,
  //       //   playerDatabase,
  //       //   ["PK"],
  //       //   "smashBrosMostKickerPoints"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxKickerPoints.franchiseName +
  //       //     '</span><span class="player-name">' +
  //       //     maxKickerPoints.playerName +
  //       //     '</span><span class="wc_score">' +
  //       //     maxKickerPoints.score +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " +
  //       //   i +
  //       //   ": Most Kicker Points</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxKickerPoints.franchiseName +
  //       //   "</td><td>" +
  //       //   maxKickerPoints.playerName +
  //       //   " -- " +
  //       //   maxKickerPoints.score +
  //       //   "</td></tr>";
  //       break;
  //     case 6:
  //       challengeHtml = longestTouchdownPassHTML(
  //         i,
  //         formattedWeek,
  //         franchiseDatabase,
  //         playerDatabase,
  //         "smashBrosLongestTouchdownPass"
  //       );
  //       // var maxPassTouchdown = longestTouchdownPass(
  //       //   i,
  //       //   formattedWeek,
  //       //   franchiseDatabase,
  //       //   playerDatabase,
  //       //   "smashBrosLongestTouchdownPass"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxPassTouchdown.name +
  //       //     '</span><span class="player-name">' +
  //       //     maxPassTouchdown.playerName +
  //       //     '</span><span class="wc_score">' +
  //       //     maxPassTouchdown.pass +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " + i + ": Longest QB TD</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxPassTouchdown.name +
  //       //   "</td><td>" +
  //       //   maxPassTouchdown.playerName +
  //       //   " -- " +
  //       //   maxPassTouchdown.pass +
  //       //   "</td></tr>";
  //       break;
  //     case 7:
  //       challengeHtml = mostTeamReceptionsHTML(
  //         i,
  //         formattedWeek,
  //         franchiseDatabase,
  //         playerDatabase,
  //         "smashBrosMostTeamReceptions"
  //       );
  //       // var maxTeamReceptions = mostTeamReceptions(
  //       //   i,
  //       //   formattedWeek,
  //       //   franchiseDatabase,
  //       //   playerDatabase,
  //       //   "smashBrosMostTeamReceptions"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxTeamReceptions.name +
  //       //     '</span><span class="wc_score">' +
  //       //     maxTeamReceptions.totalReceptions +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " +
  //       //   i +
  //       //   ": Most Team Receptions</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxTeamReceptions.name +
  //       //   "</td><td>" +
  //       //   maxTeamReceptions.totalReceptions +
  //       //   "</td></tr>";
  //       break;
  //     case 8:
  //       challengeHtml = mostPlayerPointsHTML(
  //         i,
  //         franchiseDatabase,
  //         playerDatabase,
  //         ["Def"],
  //         "smashBrosMostDefensePoints"
  //       );
  //       // var maxDefPoints = mostPlayerPoints(
  //       //   i,
  //       //   franchiseDatabase,
  //       //   playerDatabase,
  //       //   ["Def"],
  //       //   "smashBrosMostDefensePoints"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxDefPoints.franchiseName +
  //       //     '</span><span class="player-name">' +
  //       //     maxDefPoints.playerName +
  //       //     '</span><span class="wc_score">' +
  //       //     maxDefPoints.score +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " +
  //       //   i +
  //       //   ": Most DEF Points</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxDefPoints.franchiseName +
  //       //   "</td><td>" +
  //       //   maxDefPoints.playerName +
  //       //   " -- " +
  //       //   maxDefPoints.score +
  //       //   "</td></tr>";
  //       break;
  //     case 9:
  //       challengeHtml = mostPlayerReceptionsHTML(
  //         i,
  //         formattedWeek,
  //         franchiseDatabase,
  //         playerDatabase,
  //         "smashBrosMostPlayerReceptions2"
  //       );
  //       // var maxPlayerReceptions = mostPlayerReceptions(
  //       //   i,
  //       //   formattedWeek,
  //       //   franchiseDatabase,
  //       //   playerDatabase,
  //       //   "smashBrosMostPlayerReceptions2"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxPlayerReceptions.name +
  //       //     '</span><span class="player-name">' +
  //       //     maxPlayerReceptions.playerName +
  //       //     '</span><span class="wc_score">' +
  //       //     maxPlayerReceptions.receptions +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " +
  //       //   i +
  //       //   ": Most Single Player Receptions</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxPlayerReceptions.name +
  //       //   "</td><td>" +
  //       //   maxPlayerReceptions.playerName +
  //       //   " -- " +
  //       //   maxPlayerReceptions.receptions +
  //       //   "</td></tr>";
  //       break;
  //     case 10:
  //       challengeHtml = mostPlayerPointsHTML(
  //         i,
  //         franchiseDatabase,
  //         playerDatabase,
  //         ["TE"],
  //         "smashBrosMostTEPoints"
  //       );
  //       // var maxTEPoints = mostPlayerPoints(
  //       //   i,
  //       //   franchiseDatabase,
  //       //   playerDatabase,
  //       //   ["TE"],
  //       //   "smashBrosMostTEPoints"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxTEPoints.franchiseName +
  //       //     '</span><span class="player-name">' +
  //       //     maxTEPoints.playerName +
  //       //     '</span><span class="wc_score">' +
  //       //     maxTEPoints.score +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " +
  //       //   i +
  //       //   ": Most Points from Single Tight End</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxTEPoints.franchiseName +
  //       //   "</td><td>" +
  //       //   maxTEPoints.playerName +
  //       //   " -- " +
  //       //   maxTEPoints.score +
  //       //   "</td></tr>";
  //       break;
  //     case 11:
  //       challengeHtml = mostTeamTDSHTML(
  //         i,
  //         formattedWeek,
  //         franchiseDatabase,
  //         playerDatabase,
  //         "smashBrosMostTeamTDs2"
  //       );
  //       // var maxTeamTDs = mostTeamTDS(
  //       //   i,
  //       //   formattedWeek,
  //       //   franchiseDatabase,
  //       //   playerDatabase,
  //       //   "smashBrosMostTeamTDs2"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxTeamTDs.name +
  //       //     '</span><span class="wc_score">' +
  //       //     maxTeamTDs.totalTDs +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " + i + ": Most Team TDs</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxTeamTDs.name +
  //       //   "</td><td>" +
  //       //   maxTeamTDs.totalTDs +
  //       //   "</td></tr>";
  //       break;
  //     case 12:
  //       challengeHtml = mostPlayerPointsHTML(
  //         i,
  //         franchiseDatabase,
  //         playerDatabase,
  //         ["RB", "WR", "TE"],
  //         "smashBrosMostNonQBPoints"
  //       );
  //       // var maxNonQBPoints = mostPlayerPoints(
  //       //   i,
  //       //   franchiseDatabase,
  //       //   playerDatabase,
  //       //   ["RB", "WR", "TE"],
  //       //   "smashBrosMostNonQBPoints"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxNonQBPoints.franchiseName +
  //       //     '</span><span class="player-name">' +
  //       //     maxNonQBPoints.playerName +
  //       //     '</span><span class="wc_score">' +
  //       //     maxNonQBPoints.score +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " +
  //       //   i +
  //       //   ": Player with Most Points (No QB)</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxNonQBPoints.franchiseName +
  //       //   "</td><td>" +
  //       //   maxNonQBPoints.playerName +
  //       //   " -- " +
  //       //   maxNonQBPoints.score +
  //       //   "</td></tr>";
  //       break;
  //     case 13:
  //       challengeHtml = biggestWinMarginHTML(
  //         i,
  //         franchiseDatabase,
  //         "smashedBrosGreatestWinMargin"
  //       );
  //       // var maxWinMargin = biggestWinMargin(
  //       //   i,
  //       //   franchiseDatabase,
  //       //   "smashedBrosGreatestWinMargin"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxWinMargin.name +
  //       //     '</span><span class="wc_score">' +
  //       //     maxWinMargin.margin +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " +
  //       //   i +
  //       //   ": Greatest Win Margin</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxWinMargin.name +
  //       //   "</td><td>" +
  //       //   maxWinMargin.margin +
  //       //   "</td></tr>";
  //       break;
  //     case 14:
  //       challengeHtml = mostPlayerAllPurposeYardsHTML(
  //         i,
  //         formattedWeek,
  //         franchiseDatabase,
  //         playerDatabase,
  //         ["RB", "WR", "TE"],
  //         "smashBrosMostNonQBYards"
  //       );
  //       // var maxPlayerAllPurposeYards = mostPlayerAllPurposeYards(
  //       //   i,
  //       //   formattedWeek,
  //       //   franchiseDatabase,
  //       //   playerDatabase,
  //       //   ["RB", "WR", "TE"],
  //       //   "smashBrosMostNonQBYards"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxPlayerAllPurposeYards.name +
  //       //     '</span><span class="player-name">' +
  //       //     maxPlayerAllPurposeYards.playerName +
  //       //     '</span><span class="wc_score">' +
  //       //     maxPlayerAllPurposeYards.totalPlayerYards +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " +
  //       //   i +
  //       //   ": Player with Most Yards (No QB)</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxPlayerAllPurposeYards.name +
  //       //   "</td><td>" +
  //       //   maxPlayerAllPurposeYards.playerName +
  //       //   " -- " +
  //       //   maxPlayerAllPurposeYards.totalPlayerYards +
  //       //   "</td></tr>";
  //       break;
  //     case 15:
  //       challengeHtml = mostTeamPointsHTML(
  //         i,
  //         franchiseDatabase,
  //         true,
  //         "smashBrosMostTeamPoints15"
  //       );
  //       // let maxPointsFranchise15 = mostTeamPoints(
  //       //   i,
  //       //   franchiseDatabase,
  //       //   true,
  //       //   "smashBrosMostTeamPoints15"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxPointsFranchise15.name +
  //       //     '</span><span class="wc_score">' +
  //       //     maxPointsFranchise15.score +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " +
  //       //   i +
  //       //   ": Most Team Points</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxPointsFranchise15.name +
  //       //   "</td><td>" +
  //       //   maxPointsFranchise15.score +
  //       //   "</td></tr>";
  //       break;
  //     case 16:
  //       challengeHtml = mostTeamPointsHTML(
  //         i,
  //         franchiseDatabase,
  //         true,
  //         "smashBrosMostTeamPoints16"
  //       );
  //       // let maxPointsFranchise16 = mostTeamPoints(
  //       //   i,
  //       //   franchiseDatabase,
  //       //   true,
  //       //   "smashBrosMostTeamPoints16"
  //       // );
  //       // $("#wc_week" + i).html(
  //       //   '<span class="franchise-name">' +
  //       //     maxPointsFranchise16.name +
  //       //     '</span><span class="wc_score">' +
  //       //     maxPointsFranchise16.score +
  //       //     "</span>"
  //       // );
  //       // content +=
  //       //   "<tr><td colspan=2><h3>Week " +
  //       //   i +
  //       //   ": Most Team Points</h3></td></tr>";
  //       // content +=
  //       //   "<tr><td>" +
  //       //   maxPointsFranchise16.name +
  //       //   "</td><td>" +
  //       //   maxPointsFranchise16.score +
  //       //   "</td></tr>";
  //       break;
  //     default:
  //       if (console)
  //         console.log("no weekly challenge this week " + formattedWeek);
  //       return;
  //   }
  // }

  // $("#wc_week" + i).html(challengeHtml);
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
  if (storageKey !== ""){
    if(console)console.log("most team points",storageKey,"val",JSON.stringify(maxTeamPoints));
    localStorage.setItem(storageKey, JSON.stringify(maxTeamPoints));
  }
  return maxTeamPoints;
}

function mostTeamPointsHTML(week, franchises, isPlayoff, storageKey) {
  var maxScoreFranchise;
  if (
    storageKey !== "" &&
    localStorage.getItem(storageKey) !== null &&
    localStorage.getItem(storageKey) != "undefined"
  ) {
    maxScoreFranchise = JSON.parse(localStorage.getItem(storageKey));
    return (
      '<span class="franchise-name">' +
      maxScoreFranchise.name +
      '</span><span class="wc_score">' +
      maxScoreFranchise.score +
      "</span>"
    );
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
  if (storageKey !== ""){
    if(console)console.log("most team points html",storageKey,"val",JSON.stringify(maxTeamPoints));
    localStorage.setItem(storageKey, JSON.stringify(maxTeamPoints));
  }
  return (
    '<span class="franchise-name">' +
    maxTeamPoints.name +
    '</span><span class="wc_score">' +
    maxTeamPoints.score +
    "</span>"
  );
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

function mostPlayerPointsHTML(
  week,
  franchises,
  players,
  positions,
  storageKey
) {
  var mostPlayerPoints;
  if (
    localStorage.getItem(storageKey) !== null &&
    localStorage.getItem(storageKey) != "undefined"
  ) {
    mostPlayerPoints = JSON.parse(localStorage.getItem(storageKey));
    return (
      '<span class="franchise-name">' +
      mostPlayerPoints.franchiseName +
      '</span><span class="player-name">' +
      mostPlayerPoints.playerName +
      '</span><span class="wc_score">' +
      mostPlayerPoints.score +
      "</span>"
    );
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
  return (
    '<span class="franchise-name">' +
    mostPlayerPoints.franchiseName +
    '</span><span class="player-name">' +
    mostPlayerPoints.playerName +
    '</span><span class="wc_score">' +
    mostPlayerPoints.score +
    "</span>"
  );
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

function mostAllPurposeYardsHTML(
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
    return (
      '<span class="franchise-name">' +
      mostAllPurposeYards.name +
      '</span><span class="wc_score">' +
      mostAllPurposeYards.totalFranchiseYards +
      "</span>"
    );
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
  return (
    '<span class="franchise-name">' +
    mostAllPurposeYards.name +
    '</span><span class="wc_score">' +
    mostAllPurposeYards.totalFranchiseYards +
    "</span>"
  );
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

function longestTouchdownPassHTML(
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
    return (
      '<span class="franchise-name">' +
      longestTouchDownPass.name +
      '</span><span class="player-name">' +
      longestTouchDownPass.playerName +
      '</span><span class="wc_score">' +
      longestTouchDownPass.pass +
      "</span>"
    );
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
  return (
    '<span class="franchise-name">' +
    longestTouchDownPass.name +
    '</span><span class="player-name">' +
    longestTouchDownPass.playerName +
    '</span><span class="wc_score">' +
    longestTouchDownPass.pass +
    "</span>"
  );
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

function mostTeamReceptionsHTML(
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
    return (
      '<span class="franchise-name">' +
      mostTeamReceptions.name +
      '</span><span class="wc_score">' +
      mostTeamReceptions.totalReceptions +
      "</span>"
    );
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
  return (
    '<span class="franchise-name">' +
    mostTeamReceptions.name +
    '</span><span class="wc_score">' +
    mostTeamReceptions.totalReceptions +
    "</span>"
  );
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

//tie breaker is next highest receiver receptions until one has a higher receptions
function mostPlayerReceptionsHTML(
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
    return (
      '<span class="franchise-name">' +
      mostPlayerReceptions.name +
      '</span><span class="player-name">' +
      mostPlayerReceptions.playerName +
      '</span><span class="wc_score">' +
      mostPlayerReceptions.receptions +
      "</span>"
    );
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
  return (
    '<span class="franchise-name">' +
    mostPlayerReceptions.name +
    '</span><span class="player-name">' +
    mostPlayerReceptions.playerName +
    '</span><span class="wc_score">' +
    mostPlayerReceptions.receptions +
    "</span>"
  );
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

function mostTeamTDSHTML(week, formattedWeek, franchises, players, storageKey) {
  var mostTeamTds;
  if (
    localStorage.getItem(storageKey) !== null &&
    localStorage.getItem(storageKey) != "undefined"
  ) {
    mostTeamTds = JSON.parse(localStorage.getItem(storageKey));
    return (
      '<span class="franchise-name">' +
      mostTeamTds.name +
      '</span><span class="wc_score">' +
      mostTeamTds.totalTDs +
      "</span>"
    );
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
  return (
    '<span class="franchise-name">' +
    mostTeamTds.name +
    '</span><span class="wc_score">' +
    mostTeamTds.totalTDs +
    "</span>"
  );
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

function biggestWinMarginHTML(week, franchises, storageKey) {
  var maxMargin;
  if (
    localStorage.getItem(storageKey) !== null &&
    localStorage.getItem(storageKey) != "undefined"
  ) {
    maxMargin = JSON.parse(localStorage.getItem(storageKey));
    return (
      '<span class="franchise-name">' +
      maxMargin.name +
      '</span><span class="wc_score">' +
      maxMargin.margin +
      "</span>"
    );
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
  return (
    '<span class="franchise-name">' +
    maxMargin.name +
    '</span><span class="wc_score">' +
    maxMargin.margin +
    "</span>"
  );
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

function mostPlayerAllPurposeYardsHTML(
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
    return (
      '<span class="franchise-name">' +
      mostPlayerAllPurposeYards.name +
      '</span><span class="player-name">' +
      mostPlayerAllPurposeYards.playerName +
      '</span><span class="wc_score">' +
      mostPlayerAllPurposeYards.totalPlayerYards +
      "</span>"
    );
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
  return (
    '<span class="franchise-name">' +
    mostPlayerAllPurposeYards.name +
    '</span><span class="player-name">' +
    mostPlayerAllPurposeYards.playerName +
    '</span><span class="wc_score">' +
    mostPlayerAllPurposeYards.totalPlayerYards +
    "</span>"
  );
}
