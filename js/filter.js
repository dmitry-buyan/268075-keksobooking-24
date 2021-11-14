const MIN_PINS_COUNT = 0;
const MAX_PINS_COUNT = 10;
const ANY_VALUE = 'any';

const filterForm = document.querySelector('.map__filters');

const HouseFilter = {
  TYPE: filterForm.querySelector('#housing-type'),
  PRICE: filterForm.querySelector('#housing-price'),
  ROOMS: filterForm.querySelector('#housing-rooms'),
  GUESTS: filterForm.querySelector('#housing-guests'),
  FEATURES: filterForm.querySelector('#housing-features'),
};

const FilterPrices = {
  MIN: 10000,
  MAX: 50000,
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const getHouseTypeValue = ({offer}) => offer.type === HouseFilter.TYPE.value || HouseFilter.TYPE.value === ANY_VALUE;

const getHousePriceValue = ({offer}) => {
  switch (HouseFilter.PRICE.value) {
    case FilterPrices.LOW:
      return offer.price < FilterPrices.MIN;
    case FilterPrices.MIDDLE:
      return offer.price >= FilterPrices.MIN && offer.price < FilterPrices.MAX;
    case FilterPrices.HIGH:
      return offer.price >= FilterPrices.MAX;
    default:
      return true;
  }
};

const getHouseRoomsValue = ({offer}) => offer.rooms === Number(HouseFilter.ROOMS.value) || HouseFilter.ROOMS.value === ANY_VALUE;

const getHouseGuestsValue = ({offer}) => offer.guests === Number(HouseFilter.GUESTS.value) || HouseFilter.GUESTS.value === ANY_VALUE;

const getHouseFeaturesValue = ({offer}) => {
  const checkedFeatures = Array.from(HouseFilter.FEATURES.querySelectorAll('input:checked'));

  return checkedFeatures.every((feature) => {
    offer.features.includes(feature.value);
  });
};

const filterPins = (pins) => {
  const filteredPins = pins
    .filter((pin) => {
      getHouseTypeValue(pin) &&
      getHousePriceValue(pin) &&
      getHouseRoomsValue(pin) &&
      getHouseGuestsValue(pin) &&
      getHouseFeaturesValue(pin);
    })
    .slice(MIN_PINS_COUNT, MAX_PINS_COUNT);

  return filteredPins;
};

export { filterPins };
