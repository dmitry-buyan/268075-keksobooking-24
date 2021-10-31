import { setAddress } from './form.js';
import { renderCard } from './card.js';
import { generateAdvertisment } from './mock/pins.js';

const MapOptions = {
  ZOOM: 13,

  DEFAULT_COORDS: {
    lat: 35.658581,
    lng: 139.745438,
  },

  TILE: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};

const MarkersOptions = {
  PATH: './img/',
  MAIN_MARKER: {
    name: 'main-pin.svg',
    size: [52, 52],
    anchor: [26, 52],
  },
  DEFAULT_MARKER: {
    name: 'pin.svg',
    size: [40, 40],
    anchor: [20, 40],
  },
};

const map = L.map('map-canvas')
  .on('load', () => {
    setAddress(MapOptions.DEFAULT_COORDS);
  })
  .setView({
    lat: MapOptions.DEFAULT_COORDS.lat,
    lng: MapOptions.DEFAULT_COORDS.lng,
  }, MapOptions.ZOOM);

L.tileLayer(
  MapOptions.TILE.url,
  {
    attribution: MapOptions.TILE.attr,
  },
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: `${MarkersOptions.PATH}${MarkersOptions.MAIN_MARKER.name}`,
  iconSize: MarkersOptions.MAIN_MARKER.size,
  iconAnchor: MarkersOptions.MAIN_MARKER.anchor,
});

const defautlMarkerIcon = L.icon({
  iconUrl: `${MarkersOptions.PATH}${MarkersOptions.DEFAULT_MARKER.name}`,
  iconSize: MarkersOptions.DEFAULT_MARKER.size,
  iconAnchor: MarkersOptions.DEFAULT_MARKER.anchor,
});

const mainMarker = L.marker(
  {
    lat: MapOptions.DEFAULT_COORDS.lat,
    lng: MapOptions.DEFAULT_COORDS.lng,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('move', (evt) => {
  setAddress(evt.target.getLatLng());
});

const renderMarkers = (data) => {
  data.forEach(({location}) => {
    const currentAdvertisment = generateAdvertisment();

    const defaultMarker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: defautlMarkerIcon,
      },
    );

    defaultMarker
      .addTo(map)
      .bindPopup(renderCard(currentAdvertisment));
  });
};

export { renderMarkers };
