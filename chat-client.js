const socket = new WebSocket("ws://piget.org:8080");

const messagesList = document.getElementById('messages');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

socket.addEventListener('open', () => {
  appendMessage('Connected to chat server.');
});

socket.addEventListener('message', event => {
  appendMessage(`Friend: ${event.data}`);
});

socket.addEventListener('close', () => {
  appendMessage('Disconnected from chat server.');
});

socket.addEventListener('error', error => {
  console.error('WebSocket error:', error);
  appendMessage('WebSocket error occurred.');
});

sendBtn.addEventListener('click', () => {
  sendMessage();
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const message = input.value.trim();
  if (message === '') return;
  
  socket.send(message);
  appendMessage(`You: ${message}`);
  input.value = '';
}

function appendMessage(msg) {
  const li = document.createElement('li');
  li.textContent = msg;
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight;
}
