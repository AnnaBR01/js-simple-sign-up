import { sendUserDataToServer } from '../../utils.js';

const signUpForm = document.getElementById('signUpForm');
const signUp = document.querySelector('.signUp');
const allInputs = signUpForm.querySelectorAll('.inputContainer__input');
const password = document.getElementById('password');
const keys = signUpForm.querySelectorAll('.inputContainer__key');

signUpForm.addEventListener('submit', sendUserData);

allInputs.forEach((element) => {
  element.addEventListener('blur', () => {
    validateInputs(element);
  }),
    element.addEventListener('input', () => {
      clearMessages(element);
    });
});

keys.forEach((element) => {
  element.addEventListener('click', () => {
    const input = element.parentElement.querySelector('.inputContainer__input');
    const inputType = input.getAttribute('type');
    if (inputType === 'password') {
      input.setAttribute('type', 'text');
    } else input.setAttribute('type', 'password');
  });
});

function setError(el, message) {
  const inputContainer = el.parentElement;
  if (inputContainer.querySelector('.inputContainer__errorMessage')) {
    return;
  }

  const errorMessage = document.createElement('div');
  errorMessage.classList.add('inputContainer__errorMessage');
  errorMessage.textContent = message;
  inputContainer.append(errorMessage);

  el.classList.remove('inputContainer__success');
  el.classList.add('inputContainer__error');
}

function setSuccess(el) {
  const inputContainer = el.parentElement;
  const errorMessage = inputContainer.querySelector(
    '.inputContainer__errorMessage'
  );
  if (errorMessage) {
    errorMessage.remove();
  }

  el.classList.remove('inputContainer__error');
  el.classList.add('inputContainer__success');
}

function validateInputs(el) {
  if (el.value === '') {
    setError(el, 'Field is required');
  } else {
    const attributeName = el.getAttribute('name');
    if (attributeName === 'firstName' || attributeName === 'lastName') {
      checkNames(el);
      return;
    }

    if (attributeName === 'birthDate') {
      checkDateInMask(el);
      return;
    }

    if (attributeName === 'email') {
      checkEmail(el);
      return;
    }

    if (attributeName === 'password') {
      checkPassword(el);
      return;
    }

    if (attributeName === 'confirmPassword') {
      password.value === el.value
        ? setSuccess(el)
        : setError(el, 'Passwords did not match');
      return;
    }

    setSuccess(el);
  }
}

function clearMessages(el) {
  const inputContainer = el.parentElement;
  const errorMessage = inputContainer.querySelector(
    '.inputContainer__errorMessage'
  );
  if (errorMessage) {
    errorMessage.remove();
  }

  el.classList.remove('inputContainer__error');
  el.classList.remove('inputContainer__success');
}

function sendUserData(e) {
  e.preventDefault();
  allInputs.forEach((element) => validateInputs(element));

  if (signUpForm.querySelector('.inputContainer__errorMessage')) {
    return;
  } else {
    const body = {};
    allInputs.forEach((field) => {
      body[field.name] = field.value;
    });
    console.log(body);

    sendUserDataToServer(
      body,
      signUpForm,
      allInputs,
      'inputContainer__success',
      signUp
    );
  }
}

// Check fields by rules

function checkNames(el) {
  el.value.length < 2
    ? setError(el, 'Min length is 2 chars')
    : el.value.length > 25
    ? setError(el, 'Max length is 25 chars')
    : setSuccess(el);
}

function checkDateInMask(el) {
  el.value.length < 10 ? setError(el, 'Example: 01.01.2000') : setSuccess(el);
}

function checkEmail(el) {
  const re =
    /^[_a-z0-9-+-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,})$/i;

  re.test(String(el.value).toLocaleLowerCase())
    ? setSuccess(el)
    : setError(el, 'Email address is invalid');
}

function checkPassword(el) {
  const re = /(?=.*[0-9])(?=.*[!@#$%])(?=.*[A-Z]){8,}/g;

  re.test(String(el.value))
    ? setSuccess(el)
    : setError(
        el,
        'Your password must include UPPER letter, number, one of these special characters: !@#$%, and be at least 8 chars'
      );
}
