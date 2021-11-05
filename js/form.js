import { sendData } from './api.js';
import { onError } from './utils.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MIN_DIGITS = 5;

const appartmentMinPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const roomsGuests = {
  1: {
    correct: [1],
    error: 'Для одной комнаты только один гость',
  },
  2: {
    correct: [1, 2],
    error: 'Для двух комнат - один или два гостя',
  },
  3: {
    correct: [1, 2, 3],
    error: 'Для трёх комнат — один, два или три гостя',
  },
  100: {
    correct: [0],
    error: 'Не для гостей',
  },
};

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const appartmentTitle = adForm.querySelector('#title');
const appartmentType = adForm.querySelector('#type');
const appartmentPrice = adForm.querySelector('#price');
const addressField = adForm.querySelector('#address');

const adFormNodes = Array.from(adForm.children);
const filterFormNodes = Array.from(filterForm.children);
const formsNodes = adFormNodes.concat(filterFormNodes);

const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');
const timeinSelectOptions = Array.from(timeinSelect.querySelectorAll('option'));
const timeoutSelectOptions = Array.from(timeoutSelect.querySelectorAll('option'));

const roomsNumberSelect = adForm.querySelector('#room_number');
const guestsNumberSelect = adForm.querySelector('#capacity');

const setAddress = ({lat, lng}) => {
  addressField.value = `${lat.toFixed(MIN_DIGITS)} ${lng.toFixed(MIN_DIGITS)}`;
};
/**
 * Deactivate form
 */
const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  filterForm.classList.add('ad-form--disabled');
  formsNodes.forEach((node) => node.setAttribute('disabled', ''));
};

/**
 * Activate form
 */
const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  filterForm.classList.remove('ad-form--disabled');
  formsNodes.forEach((node) => node.removeAttribute('disabled'));
};

/**
 * Callback on title change
 * @param {Object} - event
 */
const onTitleInput = (evt) => {
  const titleLength = evt.target.value.length;

  if (titleLength < MIN_TITLE_LENGTH) {
    evt.target.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    evt.target.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    evt.target.setCustomValidity('');
  }

  evt.target.reportValidity();
};

/**
 * Callback on appartment change
 * @param {Object} - event
 */
const onAppartmentTypeChange = (evt) => {
  const appartmentTypes = Object.keys(appartmentMinPrices);
  appartmentPrice.placeholder = appartmentMinPrices[appartmentTypes.find((type) => type.includes(evt.target.value))];
  appartmentPrice.min = appartmentPrice.placeholder;
};

/**
 * Callback on price change
 * @param {Object} - event
 */
const onPriceInput = (evt) => {
  const priceValue = evt.target.min;

  if (priceValue > MAX_PRICE) {
    evt.target.setCustomValidity(`Максимальная сумма не должна превышать ${MAX_PRICE}`);
  } else if (priceValue < evt.target.min) {
    evt.target.setCustomValidity(`Минимальная сумма должная быть не ниже ${evt.target.min}`);
  } else {
    evt.target.setCustomValidity('');
  }

  evt.target.reportValidity();
};

/**
 * Check user select rooms
 * - 1 room - "for 1 guest";
 * - 2 rooms - "for 2 guests" or "for 1 guest";
 * - 3 rooms - "for 3 guests", "for 2 guests" or "for 1 guest";
 * - 100 rooms - "not for guests".
 */
const onRoomsChange = (evt) => {
  const rooms = Number(roomsNumberSelect.value);
  const guests = Number(guestsNumberSelect.value);

  if (!roomsGuests[rooms].correct.includes(guests)) {
    evt.target.setCustomValidity(roomsGuests[rooms].error);
  } else {
    evt.target.setCustomValidity('');
  }

  evt.target.reportValidity();
};

const getTimeSelectValue = (evt, options) => {
  options.find((option) => option.value.includes(evt.target.value)).selected = true;
};

const addFormHandlers = () => {
  appartmentType.addEventListener('change', onAppartmentTypeChange);
  appartmentTitle.addEventListener('input', onTitleInput);
  appartmentPrice.addEventListener('input', onPriceInput);
  timeinSelect.addEventListener('change', (evt) => getTimeSelectValue(evt, timeoutSelectOptions));
  timeoutSelect.addEventListener('change', (evt) => getTimeSelectValue(evt, timeinSelectOptions));
  roomsNumberSelect.addEventListener('change', onRoomsChange);
  guestsNumberSelect.addEventListener('change', onRoomsChange);
};

const resetForm = () => {
  adForm.reset();
  filterForm.reset();
  deactivateForm();
};

const setFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    );
  });
};

export {
  setAddress,
  deactivateForm,
  activateForm,
  resetForm,
  addFormHandlers,
  setFormSubmit
};
