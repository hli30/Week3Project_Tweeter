/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function () {
  var $tweetsContainer = $('#tweetsContainer');
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

    const offSet = 150;
    const diffInSecs = ($.now() - time)/1000 - offSet;

    const diffInMins = Math.floor(diffInSecs / minute);
    const diffInHrs = Math.floor(diffInSecs / hour);
    const diffInDays = Math.floor(diffInSecs / day);

    if (diffInSecs >= 0 && diffInSecs < minute || diffInSecs < 0) {
      return `Just Now`;
    } else if (diffInSecs >= minute && diffInSecs < hour ) {
      return `${diffInMins} minutes ago`;
    } else if (diffInSecs >= hour && diffInSecs < day) {
      return `${diffInHrs} hours ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  }

  function renderTweets(tweets) {
    $tweetsContainer.empty();
    tweets.forEach((tweet)=> {
      let $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    });
  }

  function validateForm (dataLength) {
    const maxTweetLength = 140;
    if (dataLength <= 0) {
      return "Empty";
    }
    if (dataLength > maxTweetLength) {
      return "Exceeds Max Length";
    }
    return false;
  }

  function asyncGetAndRenderTweets () {
    $.get("/tweets", renderTweets);
  }

  $("#tweetSubmit").submit(function(event) {
    event.preventDefault();
    const validationError = validateForm($(this).find("textarea").val().length);
    if (validationError) {
      alert(validationError);
      return;
    } 

    let tweet = $(this).serialize();
    $.post("/tweets", tweet, asyncGetAndRenderTweets);

    $(this).find("textarea").val("");
    $(".counter").text("140");
  });

  $(".composeButton").click(function(event) {
    const $textarea = $(".new-tweet textarea");

    if ($textarea.is(':visible')) {
      $textarea.blur();
      $textarea.val("");
    }
    $(".new-tweet").slideToggle("fast", () => {
      $textarea.select();
    });
    $(window).scrollTop(0);
    $(".composeButton").blur();
  });

  asyncGetAndRenderTweets();
});