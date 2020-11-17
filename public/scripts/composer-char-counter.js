$(document).ready(function() {
  console.log("ready");

  $( '#tweet-text' ).keydown(function() {
    const numOfChars = this.value.length;
    const counterPath = $(this).siblings("#tweet-sub").find("#counter")
    counterPath.val(140 - numOfChars)
    

    counterPath.css({
      color: function(){
          if (numOfChars > 140){
              return 'red';
          } else {
              return "#545149";
          }
          
    }});


  });


});