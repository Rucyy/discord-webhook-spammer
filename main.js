const start = document.getElementById("start");
const stop = document.getElementById("stop");
const url = document.getElementById("url");
const username = document.getElementById("username");
const avatar_url = document.getElementById("avatar");
const content = document.getElementById("message");
const delay = document.getElementById("delay");
let interval;


start.addEventListener("click", async () => {
    if (!url.value || !content.value) {
        alert("error");
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

async function send() {
    const payload = {
        username: username.value,
        avatar_url: avatar_url.value,
        content: content.value,
        delay: delay.value,
    };

    try {
        await fetch(url.value, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        });
    } catch (e) {
        console.log(e);
        time.sleep(delay)
    }
}
