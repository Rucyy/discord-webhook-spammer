$(function () {
    $('#btn').click(function () {
        var link = $('#link').val();
        var username = $('#username').val();
        var content = $('#content').val();
        var avatar = $('#avatar').val();
        var delay = $('#delay').val();
        if (link == null || link == "", content == null || content == "", delay == null || delay == "") {
            alert("入力しろや");
            return false;
        }

        let i = 0;
        let inteval = setInterval(function () {
            $.post(link, { "content": content, "username": username, "avatar_url": avatar, delay == null || delay == "",});

                if (!url.value || !content.value) {
        alert("Please fill out all required info");
        return false;
    }
    try {
        const res = await fetch(url.value);
        if (!res.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        start.disabled = true;
        stop.disabled = false;
        alert("Started...");
        interval = setInterval(send, 50);
    } catch (e) {
        alert("Invalid Webhook URL");
    }
});

stop.addEventListener("click", async () => {
    clearInterval(interval);
    start.disabled = false;
    stop.disabled = true;
    alert("Stopped...");
});
      
        }, 50)

    time.sleep(delay)



    });
});
