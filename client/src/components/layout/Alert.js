// prop type component
import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

const Alert = props =>
  props.alerts !== null &&
  props.alerts.length > 0 &&
  props.alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert // state.alert came from reducer/index.js combineReducers
});

// In this componenr we try to read state (redux)
export default connect(
  mapStateToProps,
  null
)(Alert);
