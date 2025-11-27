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
function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim(); 


    if (email === "" || password.length < 4) {
        alert("Please enter a valid email and password (min 4 characters).");
        return; 
    }

    localStorage.setItem("user", email);
    window.location.href = "dashboard.html";
}


function goBack() {
    window.history.back();

}

function handleClick(item) {
    alert(item + ' clicked!');
}

const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

function handleClick(item) {
    alert("We're Sorry, The Feature is Coming soon");
}