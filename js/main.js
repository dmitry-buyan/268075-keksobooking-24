import { addFormHandlers, deactivateForm, activateForm } from './form.js';
import { initMap, renderMarkers, saveAdsData } from './map.js';
import { getData } from './api.js';
import { showLoadErrorMessage } from './popup.js';
import { filterPins, setFilterFormChange } from './filter.js';

deactivateForm();

const getSimilarAds = () => {
  getData(
    (pins) => {
      saveAdsData(pins);
      renderMarkers(filterPins(pins));
      setFilterFormChange(() => renderMarkers(filterPins(pins)));
    },
    showLoadErrorMessage,
  );
};

initMap()
  .then(getSimilarAds)
  .then(activateForm)
  .then(addFormHandlers)
  .catch(showLoadErrorMessage);
