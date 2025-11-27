const sendBtn = document.querySelector('.send-btn');
const chatBody = document.querySelector('.chat-body');
const chatInput = document.querySelector('.chat-input input');

function saveMessages() {

    const messages = [];
    chatBody.querySelectorAll('.message').forEach(msgElement => {
        messages.push({
            content: msgElement.querySelector('p').textContent,
            time: msgElement.querySelector('span').textContent,
            type: msgElement.classList.contains('sent') ? 'sent' : 'received'
        });
    });

    localStorage.setItem('chatHistory', JSON.stringify(messages));
}

function loadMessages() {
    const savedMessages = localStorage.getItem('chatHistory');
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

document.addEventListener('DOMContentLoaded', loadMessages); 

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

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    return `${hours}:${minutes} ${ampm}`;
}