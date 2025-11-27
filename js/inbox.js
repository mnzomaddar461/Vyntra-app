
const sendBtn = document.getElementById('send-button');
const chatBody = document.querySelector('.chat-body');
const chatInput = document.getElementById('chat-input-field');
const voiceModal = document.getElementById('voice-recording-modal');


function loadChatUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('name') || 'Chat User';
    const userId = urlParams.get('user') || 'default_chat_id';

    document.getElementById('chat-user-name').textContent = userName;
    document.getElementById('chat-user-status').textContent = 'Online';

    localStorage.setItem('currentChatId', userId);

    loadMessages();
}

function saveMessages() {
    const chatId = localStorage.getItem('currentChatId');
    if (!chatId) return;

    const messages = [];
    chatBody.querySelectorAll('.message').forEach(msgElement => {
        messages.push({
            content: msgElement.querySelector('p').textContent,
            time: msgElement.querySelector('span').textContent,
            type: msgElement.classList.contains('sent') ? 'sent' : 'received'
        });
    });
    localStorage.setItem(`chatHistory_${chatId}`, JSON.stringify(messages));
}

function loadMessages() {
    const chatId = localStorage.getItem('currentChatId');
    if (!chatId) return;
    
    const savedMessages = localStorage.getItem(`chatHistory_${chatId}`);
    chatBody.innerHTML = ''; 
    
    if (savedMessages) {
        const messages = JSON.parse(savedMessages);
        
        messages.forEach(msg => {
            const message = document.createElement('div');
            message.classList.add('message', msg.type);
            message.innerHTML = `<p>${msg.content}</p><span>${msg.time}</span>`;
            chatBody.appendChild(message);
        });
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}



function sendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText === '') return;


    const message = document.createElement('div');
    message.classList.add('message', 'sent');
    message.innerHTML = `<p>${messageText}</p><span>${getCurrentTime()}</span>`;

    chatBody.appendChild(message);
    chatBody.scrollTop = chatBody.scrollHeight;
    chatInput.value = '';

    saveMessages();


    setTimeout(() => {
        const reply = document.createElement('div');
        reply.classList.add('message', 'received');
        reply.innerHTML = `<p>Got your message! 😊</p><span>${getCurrentTime()}</span>`;
        chatBody.appendChild(reply);
        chatBody.scrollTop = chatBody.scrollHeight;
        saveMessages();
    }, 1000);
}


function handleFileInput() {

    const message = document.createElement('div');
    message.classList.add('message', 'sent');
    message.innerHTML = `<p>File sent: <a href="#" style="color:white; text-decoration: underline;">document.pdf</a></p><span>${getCurrentTime()}</span>`;
    chatBody.appendChild(message);
    chatBody.scrollTop = chatBody.scrollHeight;
    saveMessages();
    console.log("File attachment simulated.");
}

function handleVoiceInput() {

    voiceModal.style.display = 'flex'; 
    console.log("Voice recording started.");

}

function stopRecording() {

    voiceModal.style.display = 'none'; 

    const message = document.createElement('div');
    message.classList.add('message', 'sent');
    message.innerHTML = `<p>🎤 Voice Note (3s)</p><span>${getCurrentTime()}</span>`;
    chatBody.appendChild(message);
    chatBody.scrollTop = chatBody.scrollHeight;
    saveMessages();
    console.log("Voice note sent.");
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

function goBack() {
    window.history.back();
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        sendMessage();
    }
});

document.addEventListener('DOMContentLoaded', loadChatUser);