/**
 * Provides the view which displays the About > Summary tab of the map controls.
 */

import clsx from 'clsx';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '~/components/i18n/Localization';
import { useImageExtension } from '~/components/interface/Image';
import MapControlSummaryFeature from '~/components/views/controls/about/summary/MapControlsSummaryFeature';

import './MapControlsSummary.css';

/**
 * Displays features which are both:
 * A) Currently visible on the map, and
 * B) Have at least one feature marked as completed.
 */
const _MapControlSummary = ({ displayed, displayedFeatures }) => {
  const ext = useImageExtension();

  return (
    <div
      className={clsx(
        'map-controls-about-summary-container',
        `map-controls-about-summary-container-${ext}`,
        displayed ? '' : 'display-none'
      )}
    >
      <span className={clsx('map-controls-about-summary-header')}>
        {t('map-controls-tab-summary')}
      </span>
      <span className={clsx('map-controls-about-summary-subtitle')}>
        {t('map-summary-subtitle')}
      </span>
      <div className={clsx('map-controls-about-summary-feature-container')}>
        {displayedFeatures.map((featureKey) => (
          <MapControlSummaryFeature key={featureKey} featureKey={featureKey} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, { feature }) => ({
  doesExpire: (feature?.respawn ?? -1) !== -1,
  displayedFeatures: _.keys(state.displayed.features),
  displayed: state.controlsTab === 'summary',
});
const mapDispatchToProps = (_dispatch) => ({});
const MapControlSummary = connect(mapStateToProps, mapDispatchToProps)(_MapControlSummary);

export default MapControlSummary;