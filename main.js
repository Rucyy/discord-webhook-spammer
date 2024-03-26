
$(function () {
    $('#btn').click(function () {
        var link = $('#link').val();
        var username = $('#username').val();
        var content = $('#content').val();
        var avatar = $('#avatar').val();
        var delay = $('#delay').val();
        if (link == null || link == "", content == null || content == "", avatar == null || avatar == "", delay == null || delay == "") {
            alert("merci de remplir toutes les options");
            return false;
        }

        let i = 0;
        let inteval = setInterval(function () {
            $.post(link, { "delay": delay, "content": content, "username": username, "avatar_url": avatar, });
            time.sleep(delay)

    
      
        }, 50)



    });
});
