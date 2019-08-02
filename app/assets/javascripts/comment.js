$(function(){
  function buildHTML(message){
    var html = `
      <div class="message__upper-info">
        <div class="message__upper-info__talker">
        ${message.user_name}
        </div>
        <div class="message__upper-info__date">
        ${message.created_at}
        </div>
      </div>
      <div class="message">
      <p class="message__text">${message.text}</p>
      </div>`
    return html;
  }
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      setTimeout(function() {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.input-box__text').val('')
      $('.input-box__image').val('')
      $('.submit-btn').attr('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    }, 1000);
  })
    .fail(function(){
      alert('error');
      $('.submit-btn').attr('disabled', false);
    })
    })
});