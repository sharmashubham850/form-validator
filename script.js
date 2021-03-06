const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";

  const small = input.nextElementSibling;
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim().toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check required fields
function checkRequired(...inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "")
      showError(input, `${getFieldName(input)} is required`);
    else showSuccess(input);
  });
}

// Get Field name
function getFieldName(input) {
  const name = input.getAttribute("name");
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} length should be between ${min} and ${max}`
    );
  }
}

// Check Passwords match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value)
    showError(input2, "Passwords do not match");
}

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired(username, email, password, password2);
  checkLength(username, 5, 15);
  checkLength(password, 8, 20);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
