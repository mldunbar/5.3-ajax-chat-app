(function(){
  'use strict';

  var username = '';
  var enteredText = enteredText;
  var currentTime = new Date();

$(document).ready(function(){

  route();

  $(document).on('submit', '.login-form', function(event){
    event.preventDefault();
    username = ($(this).find('.username').val());
    window.location.hash = '/chat';
  });

$(window).on('hashchange', function(event){
  event.preventDefault();
  route();
});
});

  function route() {
    switch(window.location.hash) {
      case '':
        $('.application').html(JST['login']());
        break;
      case '#/chat':
        renderChat();
        break;
    }
  }

  function renderChat() {
    $('.application').html(JST['chat']());
    console.log('username:', username);
  }

//end code from Jake

// function getMessages(){
//   $.ajax({
//     url: 'http://tiny-lasagna-server.herokuapp.com/collections/messages/',
//   })
//   .then(function(incomingMessages){
//     console.log(incomingMessages);
//     $('.application').prepend(JST['chat'](incomingMessages));
// })
//     }

$(document).on('submit-button-chat', '.message-enter', function(event){
  event.preventDefault();
  enteredText = $(this).find('.enteredText').val();
  console.log('enteredText:', enteredText);
$.ajax({
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/messages/',
  type: "POST",
  data: {
    username: username,
    created_at: currentTime,
    content: enteredText
    }
  });
});
})()

//deleting all the wrong things from my page

  function deleteInvalidMessages(){
  $.ajax({
    url: "http://tiny-lasagna-server.herokuapp.com/collections/messages/"
  }).then(function(messages) {
    console.log(messages);
    var invalid = _.reject(messages, function(message) {
      return message.hasOwnProperty('username')
          && message.hasOwnProperty('created_at')
          && message.hasOwnProperty('content')
    });
    console.log(invalid);
    invalid.forEach(function(message) {
      $.ajax({
        url: "http://tiny-lasagna-server.herokuapp.com/collections/messages/" + message._id,
        type: "DELETE"
      })
    });
  });
}
