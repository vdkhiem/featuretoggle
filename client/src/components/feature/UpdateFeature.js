import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getFeatureById } from "../../actions/feature";
import Spinner from "../layout/Spinner";

// import PropTypes from "prop-types";

const UpdateFeature = ({
  getFeatureById,
  feature: { feature, loading },
  match
}) => {
  useEffect(() => {
    getFeatureById(match.params.id);
    console.log("getFeatureById", feature);
  }, [getFeatureById, feature, match.params.id]);
  return (
    <Fragment>
      {feature === null || loading ? (
        <Spinner />
      ) : (
        <div>
          {feature.code} - {feature.name}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => {
  console.log("mapStateToProps", state.feature);
  return {
    feature: state.feature
  };
};

// UpdateFeature.propTypes = {};

export default connect(mapStateToProps, { getFeatureById })(UpdateFeature);
