/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  const createTweetElement = function(data) {
    const $tweet = $(`<article class="tweet">
    <div class="user-info">
      <label> ${data.user.name} </label>
      <label class="handle">${data.user.handle}</label>
    </div>
    <div class="tweet-body">
      <span>${data.content.text}</span>
    </div>
    <div class="tweet-info">
      <span>${data.created_at}</span>
      <span> $ & @</span>
    </div>

    </article>`
  );
    return $tweet;
  }


  const renderTweets = function(tweetData) {
    $('#tweets-container').empty();
    for (elm of tweetData){
      const newTweet = createTweetElement(elm)
      $('#tweets-container').prepend(newTweet);
    }
  }


  const submitTweet = function (){
    const $postedTweet = $('.form-inline');
    $postedTweet.on("submit", function(event) {
      event.preventDefault();
      if(($("#tweet-text").val()) && ($("#tweet-text").length) < 140) { 
        const serializedData = $(this).serialize();
        $.post("/tweets/", serializedData)
          .then(loadTweets())
          .then($("#tweet-text").val(''))
          .then($("#counter").val(140))
      } else {
        alert("Nothing to tweet!")
      }
    });
  }   


  const loadTweets = function() {

      $.get('/tweets')
      .then(function (tweets) {
        renderTweets(tweets);
      });
  
  }

  loadTweets();
  submitTweet();

});  