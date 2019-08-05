$(function() {
  function buildHTML(message){
    if(message.image != null){
      var img = `<img src="${message.image}">`
     }else{
      var img = ""
     }
       var html = `
         <div class="message__upper-info"  data-text-id="${message.id}">
           <div class="message__upper-info__talker">
           ${message.user_name}
           </div>
           <div class="message__upper-info__date">
           ${message.created_at}
           </div>
         </div>
         <div class="message">
         <p class="message__text">${message.text}</p>
         ${img}
         </div>`
       return html;
     }

    var reloadMessages = function() {
      var last_message_id = $(".message__upper-info:last").data("text-id");
      var group_id = $(".main-header__left-box__current-group").data("id");
      $.ajax({
        url: `/groups/${group_id}/api/messages`,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML =  buildHTML(message);
          $('.messages').append(insertHTML)
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        });
      })
      .fail(function() {
        alert("error")
      });
    };
    var group_id = $(".main-header__left-box__current-group").data("id");
    if(`/groups/${group_id}/messages` === window.location.pathname){
    setInterval(reloadMessages, 5000);
    }
  });