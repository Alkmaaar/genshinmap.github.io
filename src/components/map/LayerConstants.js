import _ from 'lodash';

import L from 'leaflet';
// Its very presence changes the behavior of L.
import 'leaflet-editable';
import 'leaflet-textpath';
import 'leaflet.pattern';

import { displayUnixTimestamp, f } from '../Localization';

import './MapLayers.css';

export const editorMarker = L.icon({
  className: `map-marker-editor`,
  iconUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', // Transparent pixel.
  shadowUrl: require('../../images/icons/map_base/marker.svg').default, // Default value. Use options to override.
  iconSize: [24, 23], // size of the icon
  shadowSize: [40, 40], // size of the shadow
  iconAnchor: [12, 34.5], // point of the icon which will correspond to marker's location
  shadowAnchor: [20, 40], // the same for the shadow
  popupAnchor: [0, -34.5], // point from which the popup should open relative to the iconAnchor
});

export const editorMarkerHighlight = L.icon({
  className: `map-marker-editor`,
  iconUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', // Transparent pixel.
  shadowUrl: require('../../images/icons/map_done/marker.png').default, // Default value. Use options to override.
  iconSize: [24, 23], // size of the icon
  shadowSize: [40, 40], // size of the shadow
  iconAnchor: [12, 34.5], // point of the icon which will correspond to marker's location
  shadowAnchor: [20, 40], // the same for the shadow
  popupAnchor: [0, -34.5], // point from which the popup should open relative to the iconAnchor
});

export const lineProperties = {
  color: '#d32f2f',
};
export const lineTextProperties = {
  repeat: true,
  attributes: { dy: 6, fill: '#d32f2f', class: 'leaflet-map-route-text' },
};

export const linePropertiesHighlight = {
  color: '#f57c00',
};
export const lineTextPropertiesHighlight = {
  repeat: true,
  attributes: { dy: 6, fill: '#f57c00', class: 'leaflet-map-route-text' },
};

export const buildPopup = (feature, imgExt = 'png', completionTime = -1) => {
  let text = '';
  if (!feature) return text;

  if (feature.properties.popupTitle)
    text = `${text}<b class="map-marker-popup-title">${feature.properties.popupTitle}</b>`;

  if (feature.properties.popupImage) {
    text = feature.properties.popupImage.startsWith('http')
      ? `${text}<img class="map-marker-popup-image" src="${feature.properties.popupImage}.${imgExt}"/>`
      : `${text}<img class="map-marker-popup-image" src="/comments/${feature.properties.popupImage}.${imgExt}"/>`;
  }

  if (feature.properties.popupContent)
    text = `${text}<span class="map-marker-popup-content">${feature.properties.popupContent}</span>`;

  if (completionTime !== -1)
    text = `${text}<span class="map-marker-popup-completion-time">${f('popup-completed', {
      time: displayUnixTimestamp(completionTime),
    })}</span>`;

  return text;
};
