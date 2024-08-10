const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

const correctMail = "roman@grand.ru";
const correctPass = "iLoveQA+1";

const MESSAGE_TEXT = {
  successful: 'Успешный вход', 
  invalid: "Введите валидный e-mail",
  fail: "Неверный логин или пароль",
  sendMail: "Пароль отправлен на e-mail",
};

console.info("INFO");
console.warn("WARN");
console.error("ERROR");

const loginButton = document.getElementById("loginButton");
const mailInput = document.getElementById("mail");
const passInput = document.getElementById("pass");
const form = document.getElementById("form");
const messageContainer = document.getElementById("message");
const messageHeader = document.getElementById("messageHeader");
const exitMessageButton = document.getElementById("exitMessageButton");

const forgotForm = document.getElementById("forgotForm");
const forgotEmailButton = document.getElementById("forgotEmailButton");
const restoreEmailButton = document.getElementById("restoreEmailButton");
const exitRestoreButton = document.getElementById("exitRestoreButton");
const mailForgotInput = document.getElementById("mailForgot");

loginButton.addEventListener("click", submitForm);
exitMessageButton.addEventListener("click", exitMessage);
mailInput.addEventListener("input", inputHandler);
mailInput.addEventListener("input", resize);
passInput.addEventListener("input", inputHandler);
forgotEmailButton.addEventListener("click", openForgotForm);
exitRestoreButton.addEventListener("click", exitMessage);
restoreEmailButton.addEventListener("click", restoreEmail);

function submitForm(e) {
  e.preventDefault();
  mailInput.value = mailInput.value.toLowerCase();

  if (!validateEmail(mailInput.value) && passInput.value.length > 0) {
    loginButton.disabled = true;
    showMessage(MESSAGE_TEXT.invalid);
    return;
  }

  if (mailInput.value === correctMail && passInput.value === correctPass) {
    showMessage(MESSAGE_TEXT.successful);
  } else {
    showMessage(MESSAGE_TEXT.fail);
  }
}

function showMessage(messageText = "") {
  form.style.display = "none";
  forgotForm.style.display = "none";
  messageContainer.style.display = "block";
  messageHeader.innerText = messageText;
}

function exitMessage(e) {
  e.preventDefault();
  mailInput.value = "";
  passInput.value = "";
  form.style.display = "flex";
  messageContainer.style.display = "none";
  forgotForm.style.display = "none";
  loginButton.disabled = true;
}

function inputHandler() {
  loginButton.disabled = !mailInput.value || !passInput.value;
}

function openForgotForm(e) {
  e.preventDefault();
  form.style.display = "none";
  forgotForm.style.display = "flex";
}

function restoreEmail(e) {
  e.preventDefault();

  if (!validateEmail(mailForgotInput.value)) {
    showMessage(MESSAGE_TEXT.invalid);
    return;
  }
  
  showMessage(MESSAGE_TEXT.sendMail);
}

function resize() {
  this.style.width = `${this.value.length * 10}px`;
}

function validateEmail(email) {
  const emailPattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/)
  return emailPattern.test(email)
}