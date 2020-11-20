// Wait until document has loaded
$(document).ready(function() {

  // Update charecter anytime a change occurs in the tweet textfield
  $('#tweet-text').on("input", function() {
    const numOfChars = this.value.length;
    const counterPath = $(this).siblings("#tweet-sub").find("#counter");
    counterPath.val(140 - numOfChars);
    
    // Change css styling of counter when charecters is over 140
    counterPath.css({
      color: function() {
        if (numOfChars > 140) {
          return 'red';
        } else {
          return "#545149";
        }
          
      }});

  });


}); // End of document ready