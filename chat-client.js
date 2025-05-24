const socket = new WebSocket("wss://piget.org:8080"); // Use your WS server URL & port

const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const messagesList = document.getElementById("messages");

socket.addEventListener("open", () => {
  appendMessage("System: Connected to chat server.");
});

socket.addEventListener("message", (event) => {
  appendMessage(`Friend: ${event.data}`);
});

socket.addEventListener("close", () => {
  appendMessage("System: Disconnected from chat server.");
});

socket.addEventListener("error", (error) => {
  appendMessage("System: Connection error.");
  console.error("WebSocket error:", error);
});

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission page reload
  sendMessage();
});

function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  socket.send(message);
  appendMessage(`You: ${message}`);
  input.value = "";
  input.focus();
}

function appendMessage(text) {
  const li = document.createElement("li");
  li.textContent = text;
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight;
}
