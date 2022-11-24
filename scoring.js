var xDown = null;
var yDown = null;
var dexCurrMatchup = 0;

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

  let matchupId = 0;
  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      //   alert("swipe left");
      /* right swipe */
    } else {
      /* left swipe */
      //   alert("swipe right");
      alert(totalMatchups);
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      /* up swipe */
    }
  }
  $(".matchup-dot").removeClass("active");
  $("#matchup_" + matchupId).addClass("active");
  $(".matchup-box").css("order", 99);
  $("#" + matchupId).css("order", 1);
  /* reset values */
  xDown = null;
  yDown = null;
}

$(function () {
  let liveScoring = getLiveScoring(real_ls_week);
  let projectedScores = getProjectedScore(real_ls_week, year, league_id);
  let scoringBox = $("#dexscoring");
  let autoRefresh = false;
  var totalMatchups = liveScoring.liveScoring.matchup.length;

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
      franchiseBox.append(playersBox);
      for (p in franchise.players.player) {
        let playerScore = franchise.players.player[p];
        var playerInfo = playerDatabase["pid_" + playerScore.id];
        let playerRow = $(
          '<div class="player-row position-order-' +
            playerInfo.position +
            '" id="' +
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
          '<div class="player-score-box" id="score_' +
            playerScore.id +
            '"><div class="player-live-score' +
            projectionDiff +
            '">' +
            playerScore.score +
            '</div><div class="player-projected-score" id="projected_' +
            playerScore.id +
            '">' +
            projectedScores[playerScore.id] +
            "</div></div>"
        );
        playersBox.append(playerRow);
        // console.log("playerInfo", playerInfo, playerScore);
      }
      matchupBox.append(franchiseBox);
      //   console.log("franchise", Object.keys(franchiseInfo));
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
    // console.log("matchup", matchup);
  });
  //   $("#dexscoring").slick({
  //     dots: true,
  //     infinite: false,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     fade: true,
  //     cssEase: "linear",
  //     arrows: false,
  //   });
  //   console.log("projected scores", projectedScores);
  //   console.log("livescoring", liveScoring);
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
