/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]




$(document).ready(function() {

  const $tweet = $(`<article class="tweet">
    <div class="user-info">
      <label> ${tweetData[0].user.name} </label>
      <label class="handle">${tweetData[0].user.handle}</label>
    </div>
    <div class="tweet-body">
      <span>${tweetData[0].content.text}</span>
    </div>
    <div class="tweet-info">
      <span>${tweetData[0].created_at}</span>
      <span> $ & @</span>
    </div>

    </article>`
  );

  const renderTweets = function(tweetData) {
    $('#tweets-container').empty();
    for (elm of tweetData){
      const newTweet = createTweetElement(elm)
      $('#tweets-container').prepend(newTweet);
    }
  }

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


  const submitTweet = function (){

    const $postedTweet = $('.form-inline');
    $postedTweet.on("submit", function(event) {
      event.preventDefault();
      const serializedData = $(this).serialize();
      $.post("/tweets/", serializedData)
        .then(loadTweets())
        .then($("#tweet-text").val(''))
    });
  }   

  const loadTweets = function() {

      $.ajax('/tweets', { method: 'GET' })
      .then(function (tweets) {
        console.log('Success: ', tweets);
        renderTweets(tweets);
      });
  
  }

  loadTweets();
  submitTweet();

});  