/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
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
});

