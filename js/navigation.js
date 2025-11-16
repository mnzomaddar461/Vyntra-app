function goProfile() {
  window.location.href = "profile.html";
}

function goSettings() {
  window.location.href = "settings.html";
}

function goChat() {
  alert("Chat screen coming soon!");
}
function activateTab(element) {
    const items = document.querySelectorAll('.footer-item');
    items.forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}
