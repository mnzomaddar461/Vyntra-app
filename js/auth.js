function loginUser(event) {
  event.preventDefault();

  let email = document.getElementById("email").value;

  localStorage.setItem("user", email);
  window.location.href = "dashboard.html";
}

function registerUser(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  localStorage.setItem("user", email);
  localStorage.setItem("name", name);

  window.location.href = "dashboard.html";
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

function saveSettings() {
  let n = document.getElementById("setName").value;
  let e = document.getElementById("setEmail").value;

  localStorage.setItem("name", n);
  localStorage.setItem("user", e);

  alert("Saved!");
}
