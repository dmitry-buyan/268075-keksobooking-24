import { renderCard } from './card.js';
import { setAddress } from './form.js';

const mapOptions = {
  zoom: 13,

  defaultCoords: {
    lat: 35.658581,
    lng: 139.745438,
  },

  tile: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};

const markersOptions = {
  path: './img/',
  mainMarker: {
    name: 'main-pin.svg',
    size: [52, 52],
    anchor: [26, 52],
  },
  defautlMarker: {
    name: 'pin.svg',
    size: [40, 40],
    anchor: [20, 40],
  },
};

const map = L.map('map-canvas');

const initMap = async() => {
  map.on('load', () => {
    setAddress(mapOptions.defaultCoords);
  })
    .setView({
      lat: mapOptions.defaultCoords.lat,
      lng: mapOptions.defaultCoords.lng,
    }, mapOptions.zoom);
};

L.tileLayer(
  mapOptions.tile.url,
  {
    attribution: mapOptions.tile.attr,
  },
).addTo(map);

const resetMap = () => {
  map.setView(mapOptions.defaultCoords, mapOptions.zoom);
};

const mainMarkerIcon = L.icon({
  iconUrl: `${markersOptions.path}${markersOptions.mainMarker.name}`,
  iconSize: markersOptions.mainMarker.size,
  iconAnchor: markersOptions.mainMarker.anchor,
});

const defautlMarkerIcon = L.icon({
  iconUrl: `${markersOptions.path}${markersOptions.defautlMarker.name}`,
  iconSize: markersOptions.defautlMarker.size,
  iconAnchor: markersOptions.defautlMarker.anchor,
});

const mainMarker = L.marker(
  {
    lat: mapOptions.defaultCoords.lat,
    lng: mapOptions.defaultCoords.lng,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

const resetMainMarker = () => mainMarker.setLatLng(mapOptions.defaultCoords);

mainMarker.addTo(map);

mainMarker.on('move', (evt) => {
  setAddress(evt.target.getLatLng());
});

const markerGroup = L.layerGroup().addTo(map);

const renderMarkers = (pins) => {
  pins.forEach((pin) => {
    L.marker(
      pin.location,
      {
        icon: defautlMarkerIcon,
      },
    )
      .addTo(markerGroup)
      .bindPopup(renderCard(pin));
  });
};

const removePopup = () => {
  const popupConainer = document.querySelector('.leaflet-popup-pane');

  while(popupConainer.firstChild) {
    popupConainer.removeChild(popupConainer.firstChild);
  }
};

export { mapOptions, initMap, renderMarkers, resetMainMarker, resetMap, removePopup };
