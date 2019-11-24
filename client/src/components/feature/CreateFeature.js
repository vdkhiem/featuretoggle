import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { createFeature } from "../../actions/feature";
import { connect } from "react-redux";

// import PropTypes from "prop-types";

const CreateFeature = ({ createFeature, history }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    enabled: false,
    createdBy: "khiem",
    createdDate: Date.now()
  });

  const { code, name, enabled } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    createFeature(formData, history, false);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create New Feature</h1>
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

export default connect(mapStateToProps, { createFeature })(
  withRouter(CreateFeature)
); // withRouter allows to use 'history'
