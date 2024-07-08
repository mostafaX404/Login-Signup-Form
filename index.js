const usernameInput = document.getElementById("usernameInput");
const userEmailInput = document.getElementById("userEmailInput");
const userPasswordInput = document.getElementById("userPasswordInput");
const signupBtn = document.getElementById("signupBtn");
const signin = document.getElementById("signin");
const confirmMsg = document.getElementById("confirmMsg");
const tryAgainMsg = document.getElementById("tryAgainMsg");

let arr;

if (localStorage.getItem("users") == null) {
  arr = [];
} else {
  arr = JSON.parse(localStorage.getItem("users"));
}
/////
function signUp() {
  validation();
  existance();
  if (validation() == true && existance() == false) {
    let user = {
      name: usernameInput.value,
      email: userEmailInput.value,
      password: userPasswordInput.value,
    };

    console.log("hhh");
    arr.push(user);
    localStorage.setItem("users", JSON.stringify(arr));
    confirmMsg.classList.replace("d-none", "d-block");
    signin.classList.replace("d-none", "d-block");
    // console.log("i made it!");
  } else {
    // tryAgainMsg.classList.replace("d-none", "d-block");
  }
}

function validation() {
  nameValidation();
  passvalidation();
  emailvalidation();
  if (
    nameValidation() == true &&
    passvalidation() == true &&
    emailvalidation() == true
  ) {
    return true;
  } else {
    return false;
  }
}

function nameValidation() {
  var usernameAlert = document.getElementById("usernameAlert");
  var regex = /^[A-Z]{1}[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;
  if (regex.test(usernameInput.value) == true && usernameInput.value != "") {
    console.log("true");
    usernameInput.classList.add("is-valid");
    usernameInput.classList.remove("is-invalid");
    usernameAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    console.log("false");
    usernameInput.classList.remove("is-valid");
    usernameInput.classList.add("is-invalid");
    usernameAlert.classList.replace("d-none", "d-block");
    return false;
  }
}
function passvalidation() {
  var userPasswordAlert = document.getElementById("userPasswordAlert");
  var regex = /^.{5,15}$/;

  if (
    regex.test(userPasswordInput.value) == true &&
    userPasswordInput.value != ""
  ) {
    userPasswordInput.classList.add("is-valid");
    userPasswordInput.classList.remove("is-invalid");
    userPasswordAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userPasswordInput.classList.remove("is-valid");
    userPasswordInput.classList.add("is-invalid");
    userPasswordAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

function emailvalidation() {
  var userEmailAlert = document.getElementById("userEmailAlert");
  var regex = /@[a-z]{5,10}(\.com)$/;
  if (regex.test(userEmailInput.value) == true && userEmailInput.value != "") {
    userEmailInput.classList.add("is-valid");
    userEmailInput.classList.remove("is-invalid");
    userEmailAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userEmailInput.classList.remove("is-valid");
    userEmailInput.classList.add("is-invalid");
    userEmailAlert.classList.replace("d-none", "d-block");
    return false;
  }
}
function existance() {
  var accountExistMsg = document.getElementById("accountExistMsg");
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i].name.toLowerCase() == usernameInput.value.toLowerCase() ||
      arr[i].email.toLowerCase() == userEmailInput.value.toLowerCase()
    ) {
      usernameInput.classList.remove("is-valid");
      userEmailInput.classList.remove("is-valid");
      userPasswordInput.classList.remove("is-valid");
      accountExistMsg.classList.replace("d-none", "d-block");
      console.log("from exist!");
      return true;
    }
  }
  return false;
}

var username = localStorage.getItem("session");

function login() {
  var loginEmail = document.getElementById("loginEmail");
  var loginPassword = document.getElementById("loginPassword");
  var loginBtn = document.getElementById("loginBtn");
  var wrongMsg = document.getElementById("wrongMsg");

  if (loginEmail.value == "" || loginPassword.value == "") {
    var fillMsg = document.getElementById("fillMsg");
    fillMsg.classList.replace("d-none", "d-block");
    return false;
  }
  for (i = 0; i < arr.length; i++) {
    if (
      arr[i].email.toLowerCase() == loginEmail.value.toLowerCase() &&
      arr[i].password.toLowerCase() == loginPassword.value.toLowerCase()
    ) {
      localStorage.setItem("session", arr[i].name);
      loginBtn.setAttribute("href", "welcome.html");
    } else {
      wrongMsg.classList.replace("d-none", "d-block");
    }
  }
}

function displayWelcomeUser() {
  document.getElementById("username").innerHTML = "Welcome, " + username;
}
function logout() {
  localStorage.removeItem("session");
}
