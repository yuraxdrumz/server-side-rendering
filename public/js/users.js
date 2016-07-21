$(document).ready(function(){
    var name = $('.name').attr('data-name');
    var socket = io({query:{name:name}});

    $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });


    $('.chat').on('click',function(){
        var email = $(this).attr('data-email');
        var msg = $('#private').val();
        var data = {email:email,msg:msg}
        socket.emit('private message',data);
    });

    socket.on('private message', function(msg){
        $('#private_messages').append($('<li>').text(msg))
    })



})
