import { getRandomIntegerFromRange, getFormattedInteger, getRandomShuffledArray } from './utils.js';

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
  const randomImageNumber = getFormattedInteger(getRandomIntegerFromRange(ImageNumbers.MIN, ImageNumbers.MAX));
  const randomTypesIndex = getRandomIntegerFromRange(0, appartment.types.length - 1);
  const randomCheckin = getRandomIntegerFromRange(0, appartment.times.length - 1);
  const randomCheckout = getRandomIntegerFromRange(0, appartment.times.length - 1);
  const randomPrice = getRandomIntegerFromRange(Prices.MIN, Prices.MAX);
  const randomRoomsNumber = getRandomIntegerFromRange(Rooms.MIN, Rooms.MAX);
  const randomGuestsNumber = getRandomIntegerFromRange(Guests.MIN, Guests.MAX);
  const randomFeatures = getRandomShuffledArray(appartment.features);
  const randomPhotos = getRandomShuffledArray(appartment.photos);
  const randomLatitude = getRandomIntegerFromRange(Locations.LATITUDE_START, Locations.LATITUDE_END, Locations.PRECISION);
  const randomLongitude = getRandomIntegerFromRange(Locations.LONGITUDE_START, Locations.LONGITUDE_END, Locations.PRECISION);

  return {
    author: {
      avatar: `img/avatars/user${randomImageNumber}.png`,
    },
    offer: {
      title: `Title ${getRandomIntegerFromRange(1, 10)}`,
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

export { generatePins };
