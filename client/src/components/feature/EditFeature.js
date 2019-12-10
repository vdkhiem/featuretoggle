import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { createFeature, getFeatureById } from "../../actions/feature";
import { connect } from "react-redux";

// import PropTypes from "prop-types";

const EditFeature = ({
  feature: { feature, loading },
  createFeature,
  getFeatureById,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    enabled: false,
    createdBy: "khiem",
    createdDate: Date.now()
  });

  const { code, name, enabled } = formData;

  useEffect(() => {
    getFeatureById(match.params.id);
    if (feature === null) return;
    setFormData({
      code: loading || !feature.code ? "" : feature.code,
      name: loading || !feature.name ? "" : feature.name,
      enabled: loading || !feature.enabled ? "" : feature.enabled,
      createdBy: loading || !feature.createdBy ? "" : feature.createdBy,
      createdDate: loading || !feature.createdDate ? "" : feature.createdDate,
      updatedBy: loading || !feature.updatedBy ? "" : feature.updatedBy,
      updatedDate: loading || !feature.updatedDate ? "" : feature.updatedDate
    });
  }, [loading, getFeatureById, feature, match.params.id]);

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    createFeature(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Feature</h1>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Code"
            name="code"
            value={code}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Code</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Code</small>
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            name="enabled"
            checked={enabled}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Enable/Disable feature toggle</small>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/feature">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

// CreateFeature.propTypes = {};

const mapStateToProps = state => {
  return {
    feature: state.feature
  };
};

export default connect(mapStateToProps, { createFeature, getFeatureById })(
  withRouter(EditFeature)
); // withRouter allows to use 'history'
