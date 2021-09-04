const form = document.getElementsByTagName('form')[0];
const inputs = document.querySelectorAll('#form input');
const password = document.getElementById('password');

const showError = (input) => {
  if (input.validity.valueMissing) {
    input.previousElementSibling.textContent = 'Field is mandatory.';
  } else if (input.validity.patternMismatch) {
    switch (input.id) {
      case 'email':
        input.previousElementSibling.textContent = 'Please input a valid email address.';
        break;
      case 'country':
        input.previousElementSibling.textContent = 'Please input a valid country.';
        break;
      case 'postal-code':
        input.previousElementSibling.textContent = 'Please input a valid postal code.';
        break;
      // remaining 2 inputs ids are password and password-confirmation
      default:
        input.previousElementSibling.textContent = 'Please input a valid password.';
        break;
    }
  } else if (input.validity.tooShort) {
    if (input.id === 'country') {
      input.previousElementSibling.textContent = 'Country must be a min. of 3 characters';
    }
  }

  if (input.id === 'password-confirm') {
    console.log('test');
    if (!password.validity.valueMissing && input.value !== password.value) {
      input.previousElementSibling.textContent = 'Password does not match!';
    }
  }
}

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.validity.valid) {
      input.previousElementSibling.textContent = '';
    } else {
      showError(input);
    }
  });
});

form.addEventListener('submit', (event) => {
  inputs.forEach((input) => {
    if (!input.validity.valid) {
      showError(input);
      input.classList.toggle('highlight');
    }
  });
  event.preventDefault();
});