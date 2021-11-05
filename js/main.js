import { addFormHandlers, deactivateForm, setFormSubmit } from './form.js';
import { mapInit, renderMarkers } from './map.js';
import { getData } from './api.js';

const PINS_COUNT = 10;

deactivateForm();
mapInit();
addFormHandlers();
setFormSubmit();

getData((pins) => {
  renderMarkers(pins.slice(0, PINS_COUNT));
});
