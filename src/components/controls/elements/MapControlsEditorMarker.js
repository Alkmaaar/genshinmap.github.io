import _ from 'lodash';
import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';

import Tooltip from 'react-tooltip';

import './MapControlsEditor.css';
import { removeElement, setElementProperty } from '../../../redux/ducks/editor';
import { setEditorHighlight, setPositionAndZoom } from '../../../redux/ducks/ui';
import { f, t } from '../../Localization';
import MapControlsEditorImageUploader from './MapControlsEditorImageUploader';

const _MapControlsEditorMarker = ({
  markerId,
  markerTitle,
  markerContent,
  markerImage,
  highlighted,
  highlightMarker,
  setMarkerTitle,
  setMarkerContent,
  setMarkerImage,
  deleteMarker,
}) => {
  return (
    <div className={clsx('map-controls-editor-element')}>
      <div className={clsx('map-controls-editor-element-row')}>
        <div
          data-tip="Highlight"
          onClick={highlightMarker}
          onKeyDown={highlightMarker}
          role="button"
          aria-label="highlight"
          tabIndex={0}
          className={clsx(
            'nf',
            'nf-mdi-crosshairs_gps',
            'map-controls-editor-element-button',
            highlighted
              ? 'map-controls-editor-element-highlight-on'
              : 'map-controls-editor-element-highlight'
          )}
        />

        <span className={clsx('map-controls-editor-element-label')}>
          {f('marker-id', { id: markerId })}
        </span>

        <Tooltip />

        <div
          data-tip="Delete"
          onClick={deleteMarker}
          onKeyDown={deleteMarker}
          role="button"
          aria-label="Delete"
          tabIndex={0}
          className={clsx(
            'nf',
            'nf-fa-trash',
            'map-controls-editor-element-button',
            'map-controls-editor-element-trash'
          )}
        />
      </div>
      <div className={clsx('map-controls-editor-element-row')}>
        <span className={clsx('map-controls-editor-element-label')}>{t('marker-title')}</span>
        <input
          placeholder={t('editor-title-placeholder')}
          value={markerTitle}
          onChange={(event) => setMarkerTitle(event.target.value)}
        />
      </div>
      <div className={clsx('map-controls-editor-element-row')}>
        <span className={clsx('map-controls-editor-element-label')}>{t('marker-content')}</span>
        <textarea
          placeholder={t('editor-content-placeholder')}
          value={markerContent}
          onChange={(event) => setMarkerContent(event.target.value)}
        />
      </div>
      <MapControlsEditorImageUploader markerImage={markerImage} setMarkerImage={setMarkerImage} />
    </div>
  );
};

const mapStateToProps = (state, { marker }) => ({
  highlighted: state.editorHighlight === marker.id,
  markerId: marker.id,
  markerTitle: marker.properties.popupTitle.en,
  markerContent: marker.properties.popupContent.en,
  markerImage: marker.properties.popupImage,
});
const mapDispatchToProps = (dispatch, { marker }) => ({
  setMarkerTitle: (value) => {
    dispatch(setElementProperty(marker, 'properties.popupTitle.en', value));
  },
  setMarkerContent: (value) => {
    dispatch(setElementProperty(marker, 'properties.popupContent.en', value));
  },
  setMarkerImage: (value) => {
    dispatch(setElementProperty(marker, 'properties.popupImage', value));
  },

  deleteMarker: () => dispatch(removeElement(marker)),

  highlightMarker: () => {
    const HIGHLIGHT_ZOOM_LEVEL = 8;

    dispatch(setEditorHighlight(marker.id));
    dispatch(
      setPositionAndZoom(
        {
          lat: marker.geometry.coordinates[0],
          lng: marker.geometry.coordinates[1],
        },
        HIGHLIGHT_ZOOM_LEVEL
      )
    );
  },
});
const MapControlsEditorMarker = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MapControlsEditorMarker);

export default MapControlsEditorMarker;
