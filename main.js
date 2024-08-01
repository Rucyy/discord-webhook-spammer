document.addEventListener("DOMContentLoaded", function () { 
    const webhookUrlInput = document.getElementById("webhookUrl"); 
    const messageInput = document.getElementById("message"); 
    const secondsPerMessageInput = document.getElementById("messageRate"); 
    const startButton = document.getElementById("startButton"); 
    const stopButton = document.getElementById("stopButton"); 
    const warningDiv = document.getElementById("warningDiv"); 
    const logContainer = document.getElementById("logContainer"); 

    let intervalId; 

    startButton.addEventListener("click", function (e) { 
        e.preventDefault(); 
        const webhookUrl = webhookUrlInput.value; 
        const message = messageInput.value; 
        const secondsPerMessage = parseInt(secondsPerMessageInput.value); 
        const timestamp = getTimeStamp(); 

        if (!webhookUrl.startsWith("https://discord.com/api/webhooks/")) { 
            warningDiv.innerHTML = '⚠️ Invalid webhook URL. Please enter a valid one.'; 
            startButton.classList.add("invalidUrl"); 
            stopButton.classList.remove("invalidUrl"); 
            return; 
        } 

        if (!message || !secondsPerMessage || !webhookUrl) { 
            warningDiv.innerHTML = '⚠️ Please fill in the fields that you left empty.';
            return;
        } else { 
            warningDiv.innerHTML = ''; 
        } 

        intervalId = setInterval(function () { 
            if (!message) { 
                sendMessage(webhookUrl, timestamp); 
            } else { 
                sendMessageWithMessage(webhookUrl, message, timestamp); 
            } 
        }, (secondsPerMessage * 1000)); // Corrected to use secondsPerMessage 

        startButton.disabled = true; 
        stopButton.disabled = false; 
        startButton.classList.add("running"); 
        stopButton.classList.remove("running"); 

        logContainer.innerHTML = ''; 
    }); 

    stopButton.addEventListener("click", function () { 
        clearInterval(intervalId); 
        startButton.disabled = false; 
        stopButton.disabled = true; 
        startButton.classList.remove("running"); 
        stopButton.classList.add("running"); 
        warningDiv.innerHTML = ''; 
    }); 

    function sendMessage(webhookUrl, timestamp) { 
        fetch(webhookUrl, { 
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

    function sendMessageWithMessage(webhookUrl, message, timestamp) { 
        fetch(webhookUrl, { 
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
