import { isEscapeKey } from './utils.js';

const showMessage = (messageClass) => {
  const messageTemplate = document.querySelector(`#${messageClass}`).content.querySelector(`.${messageClass}`);
  const message = messageTemplate.cloneNode(true);
  const errorButton = messageTemplate.querySelector('.error__button');
  document.querySelector('main').append(message);

  const onPageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onPageClick = () => {
    closeMessage();
  };

  function closeMessage () {
    document.querySelector('main').removeChild(message);
    document.removeEventListener('keydown', onPageEscKeydown);
    document.removeEventListener('click', onPageClick);
  }

  document.addEventListener('keydown', onPageEscKeydown);
  document.addEventListener('click', onPageClick);

  if (errorButton) {
    errorButton.addEventListener('click', onPageClick);
  }
};

const showLoadErrorMessage = () => {
  const messageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const message = messageTemplate.cloneNode(true);
  message.style.background = 'red';
  document.body.insertAdjacentElement('afterbegin', message);
};

export { showMessage, showLoadErrorMessage };
