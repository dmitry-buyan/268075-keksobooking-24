import { generatePins } from './mock/pins.js';
import { renderCards } from './card.js';

const PINS_COUNT = 10;

renderCards(generatePins(PINS_COUNT));
