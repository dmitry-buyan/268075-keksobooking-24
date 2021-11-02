import { deactivateForm, activateForm, addFormValidation } from './form.js';
import { generatePins } from './mock/pins.js';
import { renderMarkers } from './map.js';
import './map.js';


const PINS_COUNT = 10;

deactivateForm();
activateForm();
addFormValidation();
renderMarkers(generatePins(PINS_COUNT));

