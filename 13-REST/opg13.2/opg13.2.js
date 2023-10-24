// const apiUrl = "https://beskedserver.azurewebsites.net/api";
const apiUrl = "http://localhost:8080";
const chatroomSelect = document.getElementById("chatroom-select");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-message-button");
const messageContainer = document.getElementById("messages-container");


const getMessages = async () => {
    const response = await fetch(apiUrl + "/Beskeder")
    const messages = await response.json();
    return messages;
}

const getRooms = async () => {
    const response = await fetch(apiUrl + "/chatRum")
    const rooms = await response.json();
    return rooms;
}

const getMessagesByRoom = async (room) => {
    const response = await fetch(apiUrl + `/SoegBeskeder/${room}`);
    const messages = await response.json();
    return messages;
}

const sendMessage = async (message) => {
    await fetch(apiUrl + "/Beskeder", {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const deleteMessage = async (id) => {
    await fetch(apiUrl + `/Beskeder/${id}`, {
        method: "DELETE"
    });
    renderMessages();
}

const showMessages = (messages) => {
    messageContainer.innerHTML = "";
    messages.forEach(message => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.innerHTML = `
        <span class='message-text'>${message.tekst}</span>
        `;
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerText = "X";
        deleteButton.addEventListener("click", () => deleteMessage(message.id));
        messageDiv.appendChild(deleteButton);

        messageContainer.appendChild(messageDiv);
    });
}

const renderMessages = async () => {
    messageContainer.innerHTML = "Loading messages...";
    const selectedRoom = chatroomSelect.value;
    let messages;
    if (selectedRoom === "Startrum") {
        messages = await getMessages();
    } else {
        messages = await getMessagesByRoom(selectedRoom);
    }
    messages.sort((a, b) => { return b.id - a.id });
    showMessages(messages);
}

const updateRoomSelect = async () => {
    const rooms = await getRooms();
    chatroomSelect.innerHTML = "";
    rooms.forEach(room => {
        const option = document.createElement("option");
        option.value = room.navn;
        option.innerText = room.navn;
        chatroomSelect.appendChild(option);
    });
}

const init = async () => {
    await updateRoomSelect();
    renderMessages();

    chatroomSelect.addEventListener("change", renderMessages);

    sendButton.addEventListener("click", async () => {
        const room = chatroomSelect.value;
        const message = messageInput.value;
        await sendMessage(
            {
                tekst: messageInput.value,
                chatRum: chatroomSelect.value
            });
        renderMessages();
        messageInput.value = "";
    });
    // setInterval(renderMessages, 10000);
}

init();