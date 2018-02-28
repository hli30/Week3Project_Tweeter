$(document).ready(function() {
  const $tweetSubmit = $("#tweetSubmit");
  const $counter = $tweetSubmit.find(".counter");
  const maxTweetLength = Number($counter.text());

  $("#tweetSubmit textarea").keyup(function() {
    let count = $(this).val().length;
    $counter.text(maxTweetLength - count);
    if($counter.text() < 0) {
      $counter.addClass("negativeNum");
    }else {
      $counter.removeClass("negativeNum");
    }
  });
});