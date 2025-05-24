// chat-client.js

// Connect to WebSocket server securely using wss://
const socket = new WebSocket("wss://piget.org:8080");

const messagesList = document.getElementById('messages');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// When connection opens
socket.addEventListener('open', () => {
  appendMessage('Connected to chat server.');
});

// When a message is received from server
socket.addEventListener('message', event => {
  appendMessage(`Friend: ${event.data}`);
});

// When connection closes
socket.addEventListener('close', () => {
  appendMessage('Disconnected from chat server.');
});

// When error occurs
socket.addEventListener('error', error => {
  console.error('WebSocket error:', error);
  appendMessage('WebSocket error occurred.');
});

// Send message on button click
sendBtn.addEventListener('click', () => {
  sendMessage();
});

// Send message on Enter key press
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Send message function
function sendMessage() {
  const message = input.value.trim();
  if (message === '') return;

  socket.send(message);
  appendMessage(`You: ${message}`);
  input.value = '';
}

// Append message to messages list and scroll down
function appendMessage(msg) {
  const li = document.createElement('li');
  li.textContent = msg;
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight;
}
