document.addEventListener("DOMContentLoaded", function () { 
    const webhook_url = document.getElementById("webhook");
    const username = document.getElementById("username");
    const avatar_url = document.getElementById("avatar");
    const content = document.getElementById("message");
    const delay = document.getElementById("delay");
    const start = document.getElementById("start"); 
    const stop = document.getElementById("stop"); 
    const warningDiv = document.getElementById("warningDiv"); 
    const logContainer = document.getElementById("logContainer"); 

    let intervalId; 

    start.addEventListener("click", function (e) {
        e.preventDefault();
        const webhook = webhook_url.value;
        const message = content.value;
        const delay = parseInt(delay.value); 
        const timestamp = getTimeStamp(); 

        if (!webhook.startsWith("https://discord.com/api/webhooks/")) { 
            warningDiv.innerHTML = '⚠️ Invalid webhook URL.'; 
            start.classList.add("invalidUrl"); 
            stop.classList.remove("invalidUrl"); 
            return; 
        } 

        if (!message || !content || !webhook) { 
            warningDiv.innerHTML = '⚠️ Please fill in the fields that you left empty.';
            return;
        } else { 
            warningDiv.innerHTML = ''; 
        } 

        intervalId = setInterval(function () { 
            if (!message) { 
                sendMessage(webhook, timestamp); 
            } else { 
                sendMessageWithMessage(webhook, message, timestamp); 
            } 
        }, (delay * 1000));

        start.disabled = true; 
        stop.disabled = false; 
        start.classList.add("running"); 
        stop.classList.remove("running"); 

        logContainer.innerHTML = ''; 
    }); 

    stop.addEventListener("click", function () { 
        clearInterval(intervalId); 
        start.disabled = false; 
        stop.disabled = true; 
        start.classList.remove("running"); 
        stop.classList.add("running"); 
        warningDiv.innerHTML = ''; 
    }); 

    function sendMessage(webhook, timestamp) { 
        fetch(webhook, { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({ content: '' }), 
        }) 
        .then(response => { 
            if (!response.ok) { 
                if (response.status === 429) { 
                    logContainer.innerHTML += `[${timestamp}] <div class="logRateLimit">We are being rate limited!</div>`; 
                } else if (response.status === 204) { 
                    logContainer.innerHTML += `[${timestamp}] <div class="logSuccess">Message sent successfully!</div>`; 
                } else if (response.status === 400) { 
                    logContainer.innerHTML += `[${timestamp}] <div class="logError">Bad Request ${response.statusText}</div>`; 
                } else if (response.status === 404) { 
                    logContainer.innerHTML += `[${timestamp}] <div class="logError">Webhook Not Found ${response.statusText}</div>`; 
                } else { 
                    logContainer.innerHTML += `[${timestamp}] <div class="logError">Error sending message ${response.statusText}</div>`; 
                } 
            } else { 
                logContainer.innerHTML += `[${timestamp}] <div class="logSuccess">Message sent successfully</div>`; 
            } 
        }) 
        .catch(error => { 
            logContainer.innerHTML += `[${timestamp}] <div class="logError">Error sending message ${error.message}</div>`; 
        }); 
    } 

    function sendMessageWithMessage(webhook, message, timestamp) { 
        fetch(webhook, { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({ content: message }), 
        }) 
        .then(response => { 
            if (!response.ok) { 
                if (response.status === 429) { 
                    logContainer.innerHTML += `[${timestamp}] <div class="logRateLimit">We are being rate limited!</div>`; 
                } else if (response.status === 204) { 
                    logContainer.innerHTML += `[${timestamp}] <div class="logSuccess">Message sent successfully</div>`; 
                } else if (response.status === 400) { 
                    logContainer.innerHTML += `[${timestamp}] <div class="logError">Bad Request ${response.statusText}</div>`; 
                } else if (response.status === 404) { 
                    logContainer.innerHTML += `[${timestamp}] <div class="logError">Webhook Not Found ${response.statusText}</div>`; 
                } else { 
                    logContainer.innerHTML += `[${timestamp}] <div class="logError">Error sending message: ${response.statusText}</div>`; 
                } 
            } else { 
                logContainer.innerHTML += `[${timestamp}] <div class="logSuccess">Message sent successfully</div>`; 
            } 
        }) 
        .catch(error => { 
            logContainer.innerHTML += `[${timestamp}] <div class="logError">Error sending message: ${error.message}</div>`; 
        }); 
    } 

    function getTimeStamp() { 
        const now = new Date(); 
        const hours = now.getHours(); 
        const minutes = now.getMinutes(); 
        const seconds = now.getSeconds(); 
        const amPm = hours >= 12 ? 'PM' : 'AM'; 
        const formattedHours = hours % 12 || 12; 
        return `${formattedHours}:${padZero(minutes)}:${padZero(seconds)} ${amPm}`; 
    } 

    function padZero(value) { 
        return value < 10 ? `0${value}` : value; 
    } 
});
