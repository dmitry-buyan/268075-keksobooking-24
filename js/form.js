const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE = 5000;
const MAX_PRICE = 1000000;
const MIN_ROOMS = 0;
const MAX_ROOMS = 100;

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const formTitle = adForm.querySelector('#title');
const formPrice = adForm.querySelector('#price');

const adFormNodes = Array.from(adForm.children);
const filterFormNodes = Array.from(filterForm.children);
const formsNodes = adFormNodes.concat(filterFormNodes);

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
 * Callback on price change
 * @param {Object} - event
 */

const onPriceInput = (evt) => {
  const priceValue = evt.target.value;

  if (priceValue > MAX_PRICE) {
    evt.target.setCustomValidity(`Максимальная сумма не должна превышать ${MAX_PRICE}`);
  } else if (priceValue < MIN_PRICE) {
    evt.target.setCustomValidity(`Минимальная сумма должная быть не ниже ${MIN_PRICE}`);
  } else {
    evt.target.setCustomValidity('');
  }

  evt.target.reportValidity();
};

formTitle.addEventListener('input', onTitleInput);
formPrice.addEventListener('input', onPriceInput);

const roomsNumberSelect = adForm.querySelector('#room_number');
const guestsNumberSelect = adForm.querySelector('#capacity');

/**
 * Check user select rooms
 * - 1 room - "for 1 guest";
 * - 2 rooms - "for 2 guests" or "for 1 guest";
 * - 3 rooms - "for 3 guests", "for 2 guests" or "for 1 guest";
 * - 100 rooms - "not for guests".
 */

const onRoomsChange = () => {
  if (roomsNumberSelect.value === MAX_ROOMS.toString() && guestsNumberSelect.value !== MIN_ROOMS.toString()) {
    roomsNumberSelect.setCustomValidity('100 комнат - не для гостей');
  } else if (roomsNumberSelect.value < guestsNumberSelect.value) {
    roomsNumberSelect.setCustomValidity('Количество гостей не должно превышать количество комнат');
  } else if (roomsNumberSelect.value !== MAX_ROOMS.toString() && guestsNumberSelect.value === MIN_ROOMS.toString()) {
    roomsNumberSelect.setCustomValidity('Не для гостей только 100 комнат');
  } else {
    roomsNumberSelect.setCustomValidity('');
  }

  roomsNumberSelect.reportValidity();
};

adForm.addEventListener('change', () => onRoomsChange());

export { deactivateForm, activateForm };
