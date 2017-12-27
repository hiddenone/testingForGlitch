      var user_colors = ['green','blue','purple','salmon','sienna','skyblue'];
      var usermessage_color = ['red'];
      var current_user = 0;
      var userObjects= {};
      var normal_user_color = 'white';
      $(document).ready(function(){
        //var $body = $('body');
        //$body.html('');
        function  events_for_version1(){
        $( "#tweetscontainer" ).on( "click", "div", function() {
             var tweetText = $( this ).text() ;
             var atsign = tweetText.indexOf('@') +1;
             var colon  = tweetText.slice(atsign).indexOf(':');
             var user   = tweetText.slice(atsign, colon+1);
             var userTweets = streams.users[user];

            if(userObjects[user].current_color==='white'){
              userObjects[user].current_color = userObjects[user].alt_color;
              time_color = 'yellow';
            }else{
              userObjects[user].current_color = 'white';
              time_color = 'white';
            }

            var background_change = findElementByTextForVersion1(user);
            background_change.css('background-color', userObjects[user].current_color);

            background_change.children().css('background-color', time_color);
            console.log(background_change.children());


            console.log( $( this ).text(), 'user:',user );
            console.log('tweets for user:',userTweets);

      })
      function findElementByTextForVersion1(text){
      var jSpot=$("div:contains("+text+")")
            .filter(function(){ return $(this).children().length === 1;})
            ;  // because you asked the parent of that element

      return jSpot;
   }
      }
      function  events_for_version2(){
$('#tweetscontainer').on("click", "div.user",function(){
          console.log("user",$(this).text());
           var user = $(this).text().slice(1,-1);
           if(userObjects[user].current_color==='white'){
              userObjects[user].current_color = userObjects[user].alt_color;
              time_color = 'yellow';
            }else{
              userObjects[user].current_color = 'white';
              time_color = 'aqua';
            }

            setColorForClassForTweetFromUser(user, 'time', time_color);
            setColorForClassForTweetFromUser(user, 'user', userObjects[user].current_color);
});


      //        var tweetText = $( this ).text() ;
      //        var atsign = tweetText.indexOf('@') +1;
      //        var colon  = tweetText.slice(atsign).indexOf(':');
      //        var user   = tweetText.slice(atsign, colon+1);
      //        var userTweets = streams.users[user];

      

      //       var background_change = findElementByTextForVersion1(user);
      //       background_change.css('background-color', userObjects[user].current_color);

      //       background_change.children().css('background-color', time_color);
      //       console.log(background_change.children());


      //       console.log( $( this ).text(), 'user:',user );
      //       console.log('tweets for user:',userTweets);

      // })
      function setColorForClassForTweetFromUser(user,  classType, backgroundColor){
            $('div.user:contains('+user+ ')').parent().children('.' +classType).css('background',backgroundColor)
       }
      function findElementByTextForVersion1(text){
      var jSpot=$("div:contains("+text+")")
            .filter(function(){ return $(this).children().length === 1;})
            ;  // because you asked the parent of that element

      return jSpot;
      }
      }


        events_for_version2();
        var lastIndex = 0;
       displayAllNewTweetsAtTopOfContainer();



       ////// displayAllTweets();
        var intervalId;
   ////     intervalId   =    setInterval(updateTimer, 10000);  // start timer
       intervalId   = setInterval(updateTimer2, 10000);
 
       
function displayAllNewTweetsAtTopOfContainer(){
        console.log("DEBUG displayAllNewTweetsAtTopOfContainer->",lastIndex);
        for(var i=lastIndex; i<streams.home.length-1; i++){
             addTweetIndexToTopOfContainerWithExtraText(i, '');
        }
        lastIndex = streams.home.length-1;
}
function addTweetIndexToTopOfContainerWithExtraText(index, textIn){
   var tweet = streams.home[index];
   var userObj;
   if(!userObjects[tweet.user]){
       userObj = {alt_color: user_colors[current_user], current_color:'white', user_number:current_user};
       userObjects[tweet.user] = userObj;
       current_user++;
   }
   text = textIn+'@' + tweet.user + ': ' + tweet.message + '-->index:'+index;
   prependToTopOfContainer(text, tweet.created_at, tweet.user, tweet.message);
}
function prependToTopOfContainer(text,created_at, user, message){
   //var divterm = '<div id="timer" data-timer-value="0"><div class="time"></div></div>'
   var tweet = $('<div/>',   {class: 'fullmessage', title:'click on user column' });
      //tweet.append(text);
      //tweet.append($('<span/>',{class:'userandmessage', style:'width:50%'}).append(text));
      
       var time_color = 'aqua';
       if(userObjects[user].current_color !== 'white'){
           time_color = 'yellow';
       }
      tweet.append($('<div/>',{class:'user'}).append('@'+user+':').css('background', userObjects[user].current_color));
      tweet.append($('<div/>',{class:'message'}).append(message));
      tweet.append($('<div/>',{class:'time'}).append(created_at).css('background', time_color));
      // tweet.append($('<span/>',{class:'created_at', style:'width:50%'}).append(created_at).css('background-color', time_color));
       tweet.css('background-color', userObjects[user].current_color);
   $('#tweetscontainer').prepend(tweet);
}
function displayAllTweets(){

        var index = streams.home.length - 1;

        while(index >= 0){

          addTweetIndexToEndofTweetsWithExtraText(index,'');
          // var tweet = streams.home[index];
          // var $tweet = $('<div id="timer" data-timer-value="0"></div>');
          // $tweet.text('@' + tweet.user + ': ' + tweet.message + "index:"+index+ "create at:"+tweet.created_at);
          // $tweet.appendTo($body);
          index -= 1;
        }
        //lastIndex = streams.home.length;
 }
 function addTweetIndexToEndofTweetsWithExtraText(index, text){
   var tweet = streams.home[index];
   text = text+'@' + tweet.user + ': ' + tweet.message + "-->index:"+index+ " created at:"+tweet.created_at;
   appendToEndOfTweets(text);
  }

  function appendToEndOfTweets(text){
   $tweet = $('<div id="timer" data-timer-value="0"></div>');
   $tweet.text(text);
   $tweet.appendTo($body);
  }
function updateTimer2(){
  // var timer = document.getElementById("timer");
  // var timerValue = parseInt(timer.getAttribute("data-timer-value")) + 1;
  // if (timerValue === 20) {
  //   timerValue = 0;
  //   clearInterval(intervalId);  // stop timer from repeating
  // }
  // timer.setAttribute("data-timer-value", timerValue);
  console.log('updateTimer2');
  displayAllNewTweetsAtTopOfContainer();
}
function updateTimer() {
  console.log(streams);
  var timer = document.getElementById("timer");
  var timerValue = parseInt(timer.getAttribute("data-timer-value")) + 1;
  if (timerValue === 20) {
    timerValue = 0;
    clearInterval(intervalId);  // stop timer from repeating
  }
  timer.setAttribute("data-timer-value", timerValue);
  timer.innerHTML = "the time is ---" + timerValue+ "and the streams is"+streams.home.length;
  appendToEndOfTweets("----------------++++++number of messages:"+streams.home.length);
  

  addTweetIndexToEndofTweetsWithExtraText(streams.home.length-1, 'LAST MESSAGE');
  addTweetIndexToEndofTweetsWithExtraText(0, 'FIRST MESSAGE');
  displayAllTweets();
  appendToEndOfTweets('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'); 
  
}
      });