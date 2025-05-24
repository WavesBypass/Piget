// Connect to WebSocket server (adjust port if needed)
const wsProtocol = location.protocol === 'https:' ? 'wss' : 'ws';
const wsPort = 8080; // change if your PHP WebSocket server runs on a different port
const ws = new WebSocket(`${wsProtocol}://${location.hostname}:${wsPort}`);

const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

ws.addEventListener('open', () => {
  appendMessage('System', 'Connected to chat server.');
});

ws.addEventListener('message', (event) => {
  // Display incoming messages
  appendMessage('Friend', event.data.trim());
});

ws.addEventListener('close', () => {
  appendMessage('System', 'Disconnected from chat server.');
});

ws.addEventListener('error', (err) => {
  console.error('WebSocket error:', err);
  appendMessage('System', 'WebSocket error occurred.');
});

// Helper to add messages to chat log
function appendMessage(sender, message) {
  const messageElem = document.createElement('div');
  messageElem.classList.add('message');
  messageElem.innerHTML = `<strong>${sender}:</strong> ${sanitize(message)}`;
  chatLog.appendChild(messageElem);
  chatLog.scrollTop = chatLog.scrollHeight; // Scroll down
}

// Simple sanitizer to prevent HTML injection
function sanitize(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Handle sending messages
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = chatInput.value.trim();
  if (msg === '') return;
  ws.send(msg);
  appendMessage('You', msg);
  chatInput.value = '';
  chatInput.focus();
});
