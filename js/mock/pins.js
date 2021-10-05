import * as utils from 'utils.js';

const PINS_COUNT = 10;

const Prices = {
  MIN: 1000,
  MAX: 20000,
};

const Locations = {
  LATITUDE_START: 35.65000,
  LATITUDE_END: 35.70000,
  LONGITUDE_START: 139.70000,
  LONGITUDE_END: 139.80000,
  PRECISION: 5,
};

const Rooms = {
  MIN: 1,
  MAX: 5,
};

const Guests = {
  MIN: 1,
  MAX: 8,
};

const ImageNumbers = {
  MIN: 1,
  MAX: 10,
};

const appartment = {
  types: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  times: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'],
  photos: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ],
};

const generateAdvertisment = () => {
  const randomImageNumber = utils.getFormattedInteger(utils.getRandomIntegerFromRange(ImageNumbers.MIN, ImageNumbers.MAX));
  const randomTypesIndex = utils.getRandomIntegerFromRange(0, appartment.types.length - 1);
  const randomCheckin = utils.getRandomIntegerFromRange(0, appartment.times.length - 1);
  const randomCheckout = utils.getRandomIntegerFromRange(0, appartment.times.length - 1);
  const randomPrice = utils.getRandomIntegerFromRange(Prices.MIN, Prices.MAX);
  const randomRoomsNumber = utils.getRandomIntegerFromRange(Rooms.MIN, Rooms.MAX);
  const randomGuestsNumber = utils.getRandomIntegerFromRange(Guests.MIN, Guests.MAX);
  const randomFeaturesIndex = utils.getRandomIntegerFromRange(0, appartment.features.length - 1);
  const randomFeatures = utils.getArrayFromAnother(appartment.features).slice(randomFeaturesIndex);
  const randomPhotosIndex = utils.getRandomIntegerFromRange(0, appartment.photos.length - 1);
  const randomPhotos = utils.getArrayFromAnother(appartment.photos).slice(randomPhotosIndex);
  const randomLatitude = utils.getRandomIntegerFromRange(Locations.LATITUDE_START, Locations.LATITUDE_END, Locations.PRECISION);
  const randomLongitude = utils.getRandomIntegerFromRange(Locations.LONGITUDE_START, Locations.LONGITUDE_END, Locations.PRECISION);

  return {
    author: {
      avatar: `img/avatars/user${randomImageNumber}.png`,
    },
    offer: {
      title: `Title ${utils.getRandomIntegerFromRange(1, 10)}`,
      address: `${randomLatitude} ${randomLongitude}`,
      price: randomPrice,
      type: appartment.types[randomTypesIndex],
      rooms: randomRoomsNumber,
      guests: randomGuestsNumber,
      checkin: appartment.times[randomCheckin],
      checkout: appartment.times[randomCheckout],
      features: randomFeatures,
      description: 'description text',
      photos: randomPhotos,
    },
    location: {
      lat: randomLatitude,
      lng: randomLongitude,
    },
  };
};


const generatePins = (count) => [...Array(count)].map(generateAdvertisment);

generatePins(PINS_COUNT);
