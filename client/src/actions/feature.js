import {
  FEATURE_ERROR,
  GET_FEATURES,
  CLEAR_FEATURE,
  GET_FEATURE
} from "./actionTypes";
import axios from "axios";
import { setAlert } from "./alert";

// Fetch all features
export const getFeatures = () => async dispatch => {
  dispatch({ type: CLEAR_FEATURE });
  try {
    const res = await axios("/api/features");
    dispatch({
      type: GET_FEATURES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FEATURE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Create/Update a new feature
// edit: determine it is add/update
export const createFeature = (
  formData,
  history, //history allow to redirect
  edit = false
) => async dispatch => {
  try {
    const res = await axios.post("/api/features", formData);
    dispatch({
      type: GET_FEATURE,
      payload: res.data
    });

    console.log("dispatch alert");
    dispatch(setAlert(edit ? "Feature updated" : "Feature created"));

    if (!edit) {
      console.log("redirect to feature page");
      history.push("/feature");
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: FEATURE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getFeatureById = id => async dispatch => {
  try {
    const res = await axios(`/api/features/${id}`);
    dispatch({
      type: GET_FEATURE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FEATURE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Fetch features by selected project
export const getFeaturesByProjectId = projectId => async dispatch => {
  dispatch({ type: CLEAR_FEATURE });
  try {
    const res = await axios(`/api/features/project/${projectId}`);
    dispatch({
      type: GET_FEATURES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FEATURE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
