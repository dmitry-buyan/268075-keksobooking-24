const PINS_COUNT = 10;
const INTEGERS = {
  zero: 0,
  one: 1,
  five: 5,
  eight: 8,
  ten: 10,
};

const appartment = {
  types: ['palace', 'flat', 'house', 'bungalow', 'hotel',],
  times: ['12:00', '13:00', '14:00',],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator',],
  photos: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ],
};

const getRandomIntegerFromRange = (a, b, digits = 0) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const randomNumber = Math.random() * (upper - lower) + lower;

  return randomNumber.toFixed(digits);
};

const pad = (number) => number < INTEGERS.ten ? `${INTEGERS.zero}${number}` : number;

const shuffleArray = (array) => {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

const getAdvert = (data) => {
  const minImageNumber = INTEGERS.one;
  const maxImageNumber = INTEGERS.ten;

  const randomImageNumber = pad(getRandomIntegerFromRange(minImageNumber, maxImageNumber));

  const randomTypesIndex = getRandomIntegerFromRange(INTEGERS.zero, data.types.length - INTEGERS.one);
  const randomCheckin = getRandomIntegerFromRange(INTEGERS.zero, data.times.length - INTEGERS.one);
  const randomCheckout = getRandomIntegerFromRange(INTEGERS.zero, data.times.length - INTEGERS.one);

  const minPrice = 1000;
  const maxPrice = 20000;
  const randomPrice = getRandomIntegerFromRange(minPrice, maxPrice);

  const minRooms = INTEGERS.one;
  const maxRooms = INTEGERS.five;
  const randomRoomsNumber = getRandomIntegerFromRange(minRooms, maxRooms);

  const minGuests = INTEGERS.one;
  const maxGuests = INTEGERS.eight;
  const randomGuestsNumber = getRandomIntegerFromRange(minGuests, maxGuests);

  const randomFeaturesIndex = getRandomIntegerFromRange(INTEGERS.zero, data.features.length - INTEGERS.one);
  const randomFeatures = shuffleArray(data.features).slice(randomFeaturesIndex);

  const randomPhotosIndex = getRandomIntegerFromRange(INTEGERS.zero, data.photos.length - INTEGERS.one);
  const randomPhotos = shuffleArray(data.photos).slice(randomPhotosIndex);

  const latitudeStart = 35.65000;
  const latitudeEnd = 35.70000;
  const longitudeStart = 139.70000;
  const longitudeEnd = 139.80000;
  const locationDigits = INTEGERS.five;
  const randomLatitude = getRandomIntegerFromRange(latitudeStart, latitudeEnd, locationDigits);
  const randomLongitude = getRandomIntegerFromRange(longitudeStart, longitudeEnd, locationDigits);

  return {
    author: {
      avatar: `img/avatars/user${randomImageNumber}.png`
    },
    offer: {
      title: `Title ${getRandomIntegerFromRange(INTEGERS.one, INTEGERS.ten)}`,
      address: `${randomLatitude} ${randomLongitude}`,
      price: randomPrice,
      type: data.types[randomTypesIndex],
      rooms: randomRoomsNumber,
      guests: randomGuestsNumber,
      checkin: data.times[randomCheckin],
      checkout: data.times[randomCheckout],
      features: randomFeatures,
      description: 'description text',
      photos: randomPhotos,
    },
    location: {
      lat: randomLatitude,
      lng: randomLongitude,
    },
  }
};

const generatePins = (cb, data, amount) => {
  const pins = [];

  for (let i = 0; i < amount; i++) {
    pins.push(cb(data));
  }

  return pins;
};

generatePins(getAdvert, appartment, PINS_COUNT);
