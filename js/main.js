import { addFormHandlers, deactivateForm, setFormSubmit, resetForm } from './form.js';
import { mapInit, renderMarkers } from './map.js';
import { getData } from './api.js';

const PINS_COUNT = 10;

deactivateForm();
addFormHandlers();
setFormSubmit(resetForm);

getData((pins) => {
  mapInit();
  renderMarkers(pins.slice(0, PINS_COUNT));
});
