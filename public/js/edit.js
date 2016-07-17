$(document).ready(function(){
    $('#delete').on('click',function(){
        function Delete(userId){
            $.ajax({
                url:'/api/delete/' + userId,
                type:'DELETE',
                success:function(res){
                    window.location.href = '/users';
                }
            });
        }
        var r = confirm('Are you sure?');
        var id = $('#delete').attr('data-id');
        if(r){
            Delete(id);
        }
    })
})
