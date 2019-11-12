import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFeatures } from '../../actions/feature';
import Spinner from '../layout/Spinner';
import ProfileItem from './FeatureItem';
// import PropTypes from 'prop-types';

const Feature = props => {
  useEffect(() => {
    console.log('useEffect');
    props.getFeatures();
  }, []); // use [] so it will trigger only once

  return (
    <Fragment>
      {props.feature.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="profiles"></div>
          {props.feature.features.length > 0 ? (
            props.feature.features.map(feature => {
              return <ProfileItem key={feature._id} feature={feature} />;
            })
          ) : (
            <h4>No features found</h4>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

// Profile.propTypes = {};

const mapStateToProps = state => {
  return {
    feature: state.feature
  };
};

export default connect(
  mapStateToProps,
  { getFeatures }
)(Feature);
