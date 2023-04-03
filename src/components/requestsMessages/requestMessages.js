export function createRequestMessage(type, message, parentTag) {
  const messageWrapper = document.createElement('div');
  messageWrapper.classList.add('requestMessage');
  messageWrapper.classList.add(
    `${type === 'error' ? 'requestMessage__error' : 'requestMessage__success'}`
  );
  messageWrapper.textContent = message;
  parentTag.append(messageWrapper);

  const closeButton = document.createElement('button');
  closeButton.classList.add('requestMessage__button');
  messageWrapper.append(closeButton);

  closeButton.addEventListener('click', () => {
    messageWrapper.remove();
  });

  setTimeout(() => messageWrapper.remove(), 3000);
}
