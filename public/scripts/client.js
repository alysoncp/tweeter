/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  $("#tweet-text").focus(() => {
    $(".error-msg").text('')
    $(".error-msg").css("visibility", "hidden")
  })

  const escape =  function(str) {
    let span = document.createElement('span');
    span.appendChild(document.createTextNode(str));
    return span.innerHTML;
  }

  const createTweetElement = function(data) {
    const $tweet = $(`<article class="tweet">
    <div class="user-info">
      <label> ${data.user.name} </label>
      <label class="handle">${data.user.handle}</label>
    </div>
    <div class="tweet-body">
      <span>${escape(data.content.text)}</span>
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

 
  const loadTweets = function() {

      $.get('/tweets')
      .then(function (tweets) {
        renderTweets(tweets);
      });
  
  }

  loadTweets();

    const $postedTweet = $('.form-inline');
    $postedTweet.on("submit", function(event) {
      event.preventDefault();
      console.log($("#tweet-text").text)
      if(($("#tweet-text").val()) && ($("#tweet-text").val().length) < 140) { 
        console.log($("#tweet-text").val().length)
        const serializedData = $(this).serialize();
        $.post("/tweets/", serializedData)
          .then(() => {
            loadTweets()
          }  )
          .then(()=> $("#tweet-text").val(''))
          .then(() => $("#counter").val(140))
      } else if (($("#tweet-text").val() === '')){
        $(".error-msg").text("You have to type something...")
        $(".error-msg").css("visibility", "visible")
      } else if (($("#tweet-text").val().length > 140)){
        $(".error-msg").text("Too many charecters!!")
        $(".error-msg").css("visibility", "visible")
      } else {
        $(".error-msg").text("Something weird happened... sorry")
        $(".error-msg").css("visibility", "visible")
      }
    });
    


  


});  