import { addFormHandlers, deactivateForm, activateForm } from './form.js';
import { initMap, renderMarkers } from './map.js';
import { getData } from './api.js';
import { showLoadErrorMessage } from './popup.js';

const PINS_COUNT = 10;

deactivateForm();
initMap();
addFormHandlers();

getData(
  (pins) => {
    activateForm();
    renderMarkers(pins.slice(0, PINS_COUNT));
  },
  showLoadErrorMessage,
);
