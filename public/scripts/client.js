/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  $("#tweet-text").focus(() => {
    $(".error-msg").text('');
    $(".error-msg").css("visibility", "hidden");
  });

  const escape =  function(str) {
    let span = document.createElement('span');
    span.appendChild(document.createTextNode(str));
    return span.innerHTML;
  };

  const dateDisplay = function(dateCreated) {
    const d = new Date();
    const n = d.getTime();
    const msSince = n - dateCreated;
    if (msSince < 60000) {
      return `${Math.floor(msSince / 1000)} seconds ago`;
    } else if (msSince > 60000 && msSince < 3600000) {
      return `${Math.floor(msSince / 100000)} minutes ago`;
    } else if (msSince > 3600000 && msSince < 86400000) {
      return `${Math.floor(msSince / 3600000)} hours ago`;
    } else if (msSince > 86400000) {
      return `${Math.floor(msSince / 86400000)} days ago`;
    }
  };

  const createTweetElement = function(data) {
    const tweetAge = dateDisplay(data.created_at);
    const $tweet = $(`<article class="tweet">
    <div class="user-info">
      <label> ${data.user.name} </label>
      <label class="handle">${data.user.handle}</label>
    </div>
    <div class="tweet-body">
      <span>${escape(data.content.text)}</span>
    </div>
    <div class="tweet-info">
      <span>${tweetAge}</span>
      <span> $ & @</span>
    </div>

    </article>`
    );
    return $tweet;
  };


  const renderTweets = function(tweetData) {
    $('#tweets-container').empty();
    for (elm of tweetData) {
      const newTweet = createTweetElement(elm);
      $('#tweets-container').prepend(newTweet);
    }
  };

 
  const loadTweets = function() {
    $.get('/tweets')
      .then(function(tweets) {
        renderTweets(tweets);
      });
  };

  loadTweets();

  const $postedTweet = $('.form-inline');
  $postedTweet.on("submit", function(event) {
    event.preventDefault();
    if (($("#tweet-text").val()) && ($("#tweet-text").val().length) <= 140) {
      console.log($("#tweet-text").val().length);
      const serializedData = $(this).serialize();
      $.post("/tweets/", serializedData)
        .then(() => {
          loadTweets();
        })
        .then(()=> $("#tweet-text").val(''))
        .then(() => $("#counter").val(140));
    } else if (($("#tweet-text").val() === '')) {
      $(".error-msg").text("You have to type something...");
      $(".error-msg").css("visibility", "visible");
    } else if (($("#tweet-text").val().length > 140)) {
      $(".error-msg").text("Too many charecters!!");
      $(".error-msg").css("visibility", "visible");
    } else {
      $(".error-msg").text("Something weird happened... sorry");
      $(".error-msg").css("visibility", "visible");
    }
  });
    



});