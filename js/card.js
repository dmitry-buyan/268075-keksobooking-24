const PHOTO = {
  width: '45px',
  height: '40px',
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
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const map = document.querySelector('#map-canvas');
const popup = document.querySelector('#card').content.querySelector('.popup');

const renderFeatures = (features) => {
  const featuresContainer = popup.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');

  featuresList.forEach((featureItem) => {
    const isFeatureAvailable = features.some((feature) => featureItem.classList.contains(`${FEATURE_CLASS_NAME}--${feature}`));

    if (!isFeatureAvailable) {
      featureItem.remove();
    }

    isFeatureAvailable ? true : featureItem.remove();
  });

  return featuresContainer.innerHTML;
};

const renderPhotos = (photos) => {
  const photosContainer = popup.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();

  photos.forEach((image) => {
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
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ${TextLines.PRICE}`;
  cardElement.querySelector('.popup__type').textContent = housingTypeTranslation[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${TextLines.ROOMS} ${offer.guests} ${TextLines.GUESTS}`;
  cardElement.querySelector('.popup__text--time').textContent = `${TextLines.CHECKIN} ${offer.checkin}, ${TextLines.CHECKOUT} ${offer.checkout}`;
  cardElement.querySelector('.popup__features').innerHTML = renderFeatures(offer.features);
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = renderPhotos(offer.photos);

  fragment.append(cardElement);
  map.append(fragment);
};

export { renderCard };
