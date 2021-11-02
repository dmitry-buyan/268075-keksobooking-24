import { deactivateForm, addFormHandlers } from './form.js';
import { generatePins } from './mock/pins.js';
import { renderMarkers } from './map.js';

const PINS_COUNT = 10;

deactivateForm();
addFormHandlers();
renderMarkers(generatePins(PINS_COUNT));

