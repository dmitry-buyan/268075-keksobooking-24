const PHOTO = {
  width: '45',
  height: '40',
  altText: 'Фотография жилья',
  className: 'popup__photo',
};

const FEATURE_CLASS_NAME = 'popup__feature';

const TextLines = {
  PRICE: '₽/ночь',
  ROOMS: 'комнаты для',
  GUESTS: 'гостей',
  CHECKIN: 'Заезд после',
  CHECKOUT: 'выезд до',
};

const housingTypeTranslation = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const map = document.querySelector('#map-canvas');
const popup = document.querySelector('#card').content.querySelector('.popup');

const renderFeatures = (arr) => {
  const featuresContainer = popup.querySelector('.popup__features');
  featuresContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();

  arr.forEach((item) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add(`${FEATURE_CLASS_NAME}`, `${FEATURE_CLASS_NAME}--${item}`);
    fragment.append(featureElement);
  });

  featuresContainer.append(fragment);

  return featuresContainer.innerHTML;
};

const renderPhotos = (arr) => {
  const photosContainer = popup.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();

  arr.forEach((image) => {
    const imageElement = document.createElement('img');
    imageElement.src = image;
    imageElement.classList.add(PHOTO.className);
    imageElement.style.width = PHOTO.width;
    imageElement.style.height = PHOTO.height;
    imageElement.alt = PHOTO.altText;
    fragment.append(imageElement);
  });

  photosContainer.append(fragment);

  return photosContainer.innerHTML;
};

const renderCard = (data) => {
  const fragment = document.createDocumentFragment();
  const cardElement = popup.cloneNode(true);

  const { author, offer } = data;

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>${TextLines.PRICE}</span>`;
  cardElement.querySelector('.popup__type').textContent = housingTypeTranslation[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${TextLines.ROOMS} ${offer.guests} ${TextLines.GUESTS}`;
  cardElement.querySelector('.popup__text--time').textContent = `${TextLines.CHECKIN} ${offer.checkin}, ${TextLines.CHECKOUT} ${offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__features').innerHTML = renderFeatures(offer.features);
  cardElement.querySelector('.popup__photos').innerHTML = renderPhotos(offer.photos);

  fragment.appendChild(cardElement);

  return cardElement;
};

const renderCards = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((item) => fragment.append(renderCard(item)));

  map.append(fragment);
};

export { renderCards };
