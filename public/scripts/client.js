/*
 * Client-side JS logic
 */

// Wait for the document to finish loading before commencing 
$(document).ready(function() {

  // Event Listener for incorrect tweet entry error message
  $("#tweet-text").focus(() => {
    $(".error-msg").text('');
    $(".error-msg").css("visibility", "hidden");
  });

  // Escape function to avoid code inject in tweet text field
  const escape =  function(str) {
    let span = document.createElement('span');
    span.appendChild(document.createTextNode(str));
    return span.innerHTML;
  };

  // Function to parse the created_at data in each tweet into a friendly sec/minutes/hours/days since display.
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
    } else {
      return "Unknown date"
    }
  };

  // Creates a new tweet with the fetched tweet data and inserts it into an article
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
    $('#tweets-container').empty(); // Blanks the tweets container to avoid double loading
    for (elm of tweetData) {
      const newTweet = createTweetElement(elm);
      $('#tweets-container').prepend(newTweet); // adds tweet to top of list
    }
  };

  
  const loadTweets = function() {
    $.get('/tweets')
      .then(function(tweets) {
        renderTweets(tweets);
      });
  };

  loadTweets();

  // Declare the form path
  const $postedTweet = $('.form-inline');

  // Event handler for a tweet submission
  $postedTweet.on("submit", function(event) {
    event.preventDefault(); // Don't navigate to a new page
    // Check tweet isn't empty or too long:
    if (($("#tweet-text").val()) && ($("#tweet-text").val().length) <= 140) {
      const serializedData = $(this).serialize();
      $.post("/tweets/", serializedData)
        .then(() => {
          loadTweets();
        })
        // Empty the tweet text field
        .then(()=> $("#tweet-text").val(''))
        .then(() => $("#counter").val(140));
    // Write error message if data entry isn't valid:    
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
    


}); // End of Document Ready