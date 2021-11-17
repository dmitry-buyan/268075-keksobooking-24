const DEFAULT_AVATAR = './img/avatars/default.png';

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

const popup = document.querySelector('#card').content.querySelector('.popup');

const isValue = (value, element) => value || element.remove();

/**
 * Render features
 * @param {Array} features
 * @returns innerHTML of features container
 */

const renderFeatures = (features, popupCard) => {
  const featuresElement = popupCard.querySelector('.popup__features');
  const featuresList = featuresElement.querySelectorAll('.popup__feature');

  if (features) {
    featuresList.forEach((featureItem) => {
      const isFeatureAvailable = features.some((feature) => featureItem.classList.contains(`popup__feature--${feature}`));

      if (!isFeatureAvailable) {
        featureItem.remove();
      }

    });
  } else {
    featuresElement.remove();
  }
};

/**
 * Render photos
 * @param {Array} photos
 * @returns innerHTML of photos container
 *
 */
const renderPhotos = (photos, popupPhotos) => {
  const photosElement = popupPhotos.querySelector('.popup__photos');
  photosElement.innerHTML = '';
  const fragment = document.createDocumentFragment();

  if (photos) {
    photos.forEach((image) => {
      const imageElement = document.createElement('img');
      imageElement.src = image;
      imageElement.classList.add(Photos.CLASSNAME);
      imageElement.style.width = Photos.WIDTH;
      imageElement.style.height = Photos.HEIGHT;
      imageElement.alt = Photos.ALT;
      fragment.append(imageElement);
    });

    photosElement.append(fragment);
  } else {
    photosElement.remove();
  }
};

/**
 * Render one card
 * @param {Object} - destructured object
 * append card element into map
 */
const renderCard = ({author, offer}) => {
  const cardElement = popup.cloneNode(true);

  const adAvatar = cardElement.querySelector('.popup__avatar');
  const adTitle = cardElement.querySelector('.popup__title');
  const adAddress = cardElement.querySelector('.popup__text--address');
  const adPrice = cardElement.querySelector('.popup__text--price');
  const adType = cardElement.querySelector('.popup__type');
  const adCapacity = cardElement.querySelector('.popup__text--capacity');
  const adTime = cardElement.querySelector('.popup__text--time');
  const adDescription = cardElement.querySelector('.popup__description');

  adAvatar.src = author.avatar || DEFAULT_AVATAR;
  adTitle.textContent = isValue(offer.title, adTitle);
  adAddress.textContent = isValue(offer.address, adAddress);
  adPrice.textContent = isValue(`${offer.price} ${TextLines.PRICE}`, adPrice);
  adType.textContent = isValue(housingTypeTranslation[offer.type], adType);
  adCapacity.textContent = `${offer.rooms} ${TextLines.ROOMS} ${offer.guests} ${TextLines.GUESTS}`;
  adTime.textContent = `${TextLines.CHECKIN} ${offer.checkin}, ${TextLines.CHECKOUT} ${offer.checkout}`;
  adDescription.textContent = isValue(offer.description, adDescription);
  renderFeatures(offer.features, cardElement);
  renderPhotos(offer.photos, cardElement);

  return cardElement;
};

export { renderCard };
