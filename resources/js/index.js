const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;

const saveButton = document.getElementById("save-button");
const darkModeButton = document.getElementById("dark-mode");

const footer = document.getElementById("footer");
const jumbo = document.getElementById("jumbo");
const body = document.getElementById("body");



sendButton.addEventListener("click", function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender,message);
  myMessage.value = "";
});

function fetchMessages() {
  return fetch(serverURL)
      .then( response => response.json())
}

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
      return `
      <div class="mine messages">
          <div class="message">
              ${message.text}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>
      `
  } else {
      return `
          <div class="yours messages">
              <div class="message">
                  ${message.text}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `
  }
}

function sendMessages(username, text) {
  const newMessage = {
      sender: username,
      text: text,
      timestamp: new Date()
  }

  fetch (serverURL, {
      method: `POST`, 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
  });
}

async function updateMessages() {
    //fetch messages
    const messages = await fetchMessages();

    //loop messages. Inside the loop
    //get each message
    //format the message
    //add the message to the chatbox
    let formattedMessages = "";
    messages.forEach(message => {
        formattedMessages += formatMessage(message, nameInput.value);
    });
    chatBox.innerHTML = formattedMessages;
  
    const MILLISECONDS_IN_TEN_SECONDS = 10000;
    setInterval(updateMessages,  MILLISECONDS_IN_TEN_SECONDS);
}

//disable message input until name is provided
//have a save button for username
//modify saved username
saveButton.addEventListener("click", function (saveButtonClickEvent) {
    const username = nameInput.value;

    localStorage.setItem("name", username);

    if (localStorage.getItem("name") != "") {
        myMessage.disabled = false;
    }
    else {
        myMessage.disabled = true;
    }
});

darkModeButton.addEventListener("click", function (darkModeButtonClickEvent) {
    if (localStorage.getItem("mode") != "dark") {
        localStorage.setItem("mode", "dark");
        darkModeButton.innerText = "Light Mode";
        body.style.background = "black";
        jumbo.style.background = "dimgray";
        footer.style.background = "dimgray";
    }
    else {
        localStorage.setItem("mode", "light");
        darkModeButton.innerText = "Dark Mode";
        body.style.background = "white";
        jumbo.style.background = "#e9ecef";
        footer.style.background = "#e9ecef";

    }
});


