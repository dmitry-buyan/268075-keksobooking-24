const Photos = {
  WIDTH: '45px',
  HEIGHT: '40px',
  ALT: 'Фотография жилья',
  CLASSNAME: 'popup__photo',
};

const TextLines = {
  PRICE: '₽/ночь',
  ROOMS: 'комнаты для',
  GUESTS: 'гостей',
  CHECKIN: 'Заезд после',
  CHECKOUT: 'выезд до',
};

const housingTypeTranslation = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const map = document.querySelector('#map-canvas');
const popup = document.querySelector('#card').content.querySelector('.popup');

/**
 * Render features
 * @param {Array} features
 * @returns innerHTML of features container
 */

const renderFeatures = (features) => {
  const featuresContainer = popup.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');

  featuresList.forEach((featureItem) => {
    const isFeatureAvailable = features.some((feature) => featureItem.classList.contains(`popup__feature--${feature}`));

    isFeatureAvailable ? true : featureItem.remove();
  });

  return featuresContainer.innerHTML;
};

/**
 * Render photos
 * @param {Array} photos
 * @returns innerHTML of photos container
 */

const renderPhotos = (photos) => {
  const photosContainer = popup.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();

  photos.forEach((image) => {
    const imageElement = document.createElement('img');
    imageElement.src = image;
    imageElement.classList.add(Photos.CLASSNAME);
    imageElement.style.width = Photos.WIDTH;
    imageElement.style.height = Photos.HEIGHT;
    imageElement.alt = Photos.ALT;
    fragment.append(imageElement);
  });

  photosContainer.append(fragment);

  return photosContainer.innerHTML;
};

/**
 * Render one card
 * @param {Object} - destructured object
 * append card element into map
 */

const renderCard = ({author, offer}) => {
  const cardElement = popup.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ${TextLines.PRICE}`;
  cardElement.querySelector('.popup__type').textContent = housingTypeTranslation[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${TextLines.ROOMS} ${offer.guests} ${TextLines.GUESTS}`;
  cardElement.querySelector('.popup__text--time').textContent = `${TextLines.CHECKIN} ${offer.checkin}, ${TextLines.CHECKOUT} ${offer.checkout}`;
  cardElement.querySelector('.popup__features').innerHTML = renderFeatures(offer.features);
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = renderPhotos(offer.photos);

  map.append(cardElement);
};

export { renderCard };
