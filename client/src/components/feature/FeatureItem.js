import React from "react";
import { Link } from "react-router-dom";

//import PropTypes from 'prop-types';

const ProfileItem = props => {
  return (
    <div className="profile bg-light" key={props.feature._id}>
      <div>
        <h2>{props.feature.code}</h2>
        <p>{props.feature.name}</p>
        <p>{props.feature.enabled}</p>
        <Link to={`/feature/${props.feature._id}`} className="btn btn-primary">
          Edit Feature
        </Link>
      </div>
      <div>
        <Link to={`/feature/${props.feature._id}`} className="btn btn-primary">
          Enable
        </Link>
      </div>
    </div>
  );
};

// ProfileItem.propTypes = {

// };

export default ProfileItem;
