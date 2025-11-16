// Go back function
function goBack() {
  window.history.back();
}

// Send message
const sendBtn = document.querySelector('.send-btn');
const chatBody = document.querySelector('.chat-body');
const chatInput = document.querySelector('.chat-input input');

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const messageText = chatInput.value.trim();
  if (messageText === '') return;

  const message = document.createElement('div');
  message.classList.add('message', 'sent');
  message.innerHTML = `<p>${messageText}</p><span>${getCurrentTime()}</span>`;

  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
  chatInput.value = '';

  // Optional: Auto-reply after 1 sec
  setTimeout(() => {
    const reply = document.createElement('div');
    reply.classList.add('message', 'received');
    reply.innerHTML = `<p>Got your message! 😊</p><span>${getCurrentTime()}</span>`;
    chatBody.appendChild(reply);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1000);
}

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
}
