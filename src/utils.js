import { createRequestMessage } from './components/requestMessages/requestMessages';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export function sendUserDataToServer(
  body,
  form,
  inputs,
  classListName,
  parentTag
) {
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json),
        form.reset(),
        inputs.forEach(
          (el) => el.classList.remove(classListName),
          createRequestMessage(
            'success',
            'Account created successfully!',
            parentTag
          )
        );
    })
    .catch((err) =>
      createRequestMessage(
        'error',
        'Something went wrong. Try again.',
        parentTag
      )
    );
}

let dateMask = IMask(document.getElementById('birthDate'), {
  mask: Date,
  min: new Date(1990, 0, 1),
  max: new Date(),
  lazy: true,
});
