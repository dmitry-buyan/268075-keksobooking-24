import { debounce } from './utils/debounce.js';

const MAX_PINS_COUNT = 10;
const ANY_VALUE = 'any';

const filterForm = document.querySelector('.map__filters');

const mapPrice = {
  low: {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: Infinity,
  },
};

const filters = Array.from(document.querySelector('.map__filters').children);

const filterRules = {
  'housing-type': ({offer}, filter) => filter.value === offer.type,

  'housing-price': ({offer}, filter) => offer.price >= mapPrice[filter.value].start && offer.price < mapPrice[filter.value].end,

  'housing-rooms': ({offer}, filter) => filter.value === offer.rooms.toString(),

  'housing-guests': ({offer}, filter) => filter.value === offer.guests.toString(),

  'housing-features': ({offer}, filter) => {
    if (offer.features) {
      const checkListElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));
      return checkListElements.every((checkListElement) => offer.features.some((feature) => feature === checkListElement.value));
    } else {
      return false;
    }
  },
};

const filterPins = (pins) => {
  const filteredAdverts = [];
  let i = 0;
  let result;

  while (i < pins.length && filteredAdverts.length < MAX_PINS_COUNT) {
    result = filters.every((filter) => (filter.value === ANY_VALUE ? true : filterRules[filter.id](pins[i], filter)));

    if (result) {
      filteredAdverts.push(pins[i]);
    }
    i++;
  }
  return filteredAdverts;
};

const setFilterFormChange = (cb) => {
  filterForm.addEventListener('change', debounce(cb));
};

export { filterPins, setFilterFormChange };
