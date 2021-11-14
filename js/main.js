import { addFormHandlers, deactivateForm, activateForm } from './form.js';
import { initMap, renderMarkers } from './map.js';
import { getData } from './api.js';
import { showLoadErrorMessage } from './popup.js';
import { filterPins } from './filter.js';

deactivateForm();
initMap();
addFormHandlers();

getData(
  (pins) => {
    activateForm();
    console.log(filterPins(pins));
    renderMarkers(filterPins(pins));
  },
  showLoadErrorMessage,
);
