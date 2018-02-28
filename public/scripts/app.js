/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function () {
  $("#tweetSubmit").on("submit", function(event) {
    event.preventDefault();
    let tweet = $(this).serialize();
    console.log("sent", tweet);
    $.post({
      url: "/tweets",
      data: tweet,
      success: function(tweet) {
        console.log("saved tweet");
      }
    });
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function(tweets) {
        console.log("getting tweets:", tweets);
      }
    });
  });
renderTweets(data);
});
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function createTweetElement(tweetData) {
  const $tweet = $("<article>").addClass("tweet");

  const $header = $("<header>");
  const $avatar = $("<img>", {src: tweetData.user.avatars.regular}).addClass("avatar");
  const $nameTag = $("<h2>").text(tweetData.user.name);
  const $handle = $("<span>").addClass("handle").text(tweetData.user.handle);
  
  $header.append($avatar)
    .append($nameTag)
    .append($handle);
  
  const $tweetBody = $("<div>").addClass("tweetBody").text(tweetData.content.text);

  const $footer = $("<footer>")
  const $daysCounter = $("<span>").addClass("daysCounter").text(calculateAndFormatTimePassed(tweetData.created_at));
  const $menu = $("<ul>").addClass("menu");
  const $flagIcon = $('<li><i class="fas fa-flag"></i></li>');
  const $retweetIcon = $('<li><i class="fas fa-retweet"></i></li>');
  const $likeIcon = $('<li><i class="fas fa-heart"></i></li>');

  $menu.append($flagIcon)
    .append($retweetIcon)
    .append($likeIcon);

  $footer.append($menu)
    .append($daysCounter);

  $tweet.append($header)
    .append($tweetBody)
    .append($footer);
  
  return $tweet;
}

function calculateAndFormatTimePassed(time) {
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  const diffInSecs = ($.now() - time)/1000;
  const diffInMins = Math.floor(diffInSecs / minute);
  const diffInHrs = Math.floor(diffInSecs / hour);
  const diffInDays = Math.floor(diffInSecs / day);

  if(diffInSecs >= 0 && diffInSecs < minute) {
    return `${diffInSecs} seconds ago`;
  } else if (diffInSecs >= minute && diffInSecs < hour ) {
    return `${diffInMins} minutes ago`;
  } else if (diffInSecs >= hour && diffInSecs < day) {
    return `${diffInHrs} hours ago`;
  } else {
    return `${diffInDays} days ago`;
  }
}

function renderTweets(tweets) {
  tweets.forEach((tweet)=> {
    let $tweet = createTweetElement(tweet);
    $("#tweetsContainer").append($tweet);
  });
}

