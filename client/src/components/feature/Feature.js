import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getFeatures } from "../../actions/feature";
import Spinner from "../layout/Spinner";
import ProfileItem from "./FeatureItem";
import PropTypes from "prop-types";

const Feature = ({ getFeatures, feature }) => {
  // props destructure into {getFeatures, feature}
  useEffect(() => {
    console.log("useEffect");
    getFeatures();
  }, [getFeatures]); // use [] so it will trigger only once

  return (
    <Fragment>
      {feature.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to={`/createfeature`} className="btn btn-primary">
            Create Feature
          </Link>
          <div className="profiles"></div>
          {feature.features.length > 0 ? (
            feature.features.map(feature => {
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

Feature.propTypes = {
  getFeatures: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    feature: state.feature
  };
};

export default connect(mapStateToProps, { getFeatures })(Feature);
