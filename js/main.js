import { generatePins } from './mock/pins.js';
import { renderCard } from './card.js';

const PINS_COUNT = 10;

renderCard(generatePins(PINS_COUNT)[0]);
