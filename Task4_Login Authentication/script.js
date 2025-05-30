let isLoginMode = true;

document.addEventListener("DOMContentLoaded", () => {
  const rememberUser = localStorage.getItem("rememberUser");
  if (rememberUser) {
    document.getElementById("username").value = rememberUser;
    document.getElementById("rememberMe").checked = true;
  }
});

document.getElementById("authForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (document.getElementById("rememberMe").checked) {
    localStorage.setItem("rememberUser", username);
  } else {
    localStorage.removeItem("rememberUser");
  }

  if (!username || !password) return alert("Fill all fields!");

  if (isLoginMode) {
    const storedUser = localStorage.getItem(username);
    if (storedUser && JSON.parse(storedUser).password === password) {
      showSecurePage(username);
    } else {
      alert("Invalid username or password.");
    }
  } else {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (localStorage.getItem(username)) {
      alert("Username already exists!");
    } else {
      localStorage.setItem(username, JSON.stringify({ password }));
      alert("Registered successfully! Now login.");
      toggleMode(); // switch to login
    }
  }
});

document.getElementById("toggleLink").addEventListener("click", function (e) {
  e.preventDefault();
  toggleMode();
});

document.getElementById("showPassword").addEventListener("change", function () {
  const pw = document.getElementById("password");
  const cpw = document.getElementById("confirmPassword");
  pw.type = this.checked ? "text" : "password";
  cpw.type = this.checked ? "text" : "password";
});

document.getElementById("password").addEventListener("input", function () {
  const strength = document.getElementById("strengthMeter");
  const val = this.value;
  let score = 0;

  if (val.length >= 6) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const colors = ["#ddd", "red", "orange", "yellowgreen", "green"];
  strength.style.backgroundColor = colors[score];
});

function toggleMode() {
  isLoginMode = !isLoginMode;
  document.getElementById("form-title").textContent = isLoginMode ? "Login" : "Register";
  document.getElementById("confirmPassword").style.display = isLoginMode ? "none" : "block";
  document.querySelector("button[type='submit']").textContent = isLoginMode ? "Login" : "Register";
  document.getElementById("toggleText").innerHTML = isLoginMode
    ? `Don't have an account? <a href="#" id="toggleLink">Register here</a>`
    : `Already have an account? <a href="#" id="toggleLink">Login here</a>`;
  document.getElementById("toggleLink").addEventListener("click", function (e) {
    e.preventDefault();
    toggleMode();
  });
}

function showSecurePage(username) {
  document.getElementById("authForm").style.display = "none";
  document.getElementById("toggleText").style.display = "none";
  document.getElementById("securePage").style.display = "block";
  document.getElementById("loggedInUser").textContent = username;
}

function logout() {
  document.getElementById("securePage").style.display = "none";
  document.getElementById("authForm").style.display = "block";
  document.getElementById("toggleText").style.display = "block";
  document.getElementById("authForm").reset();
}
