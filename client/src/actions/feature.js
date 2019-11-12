import { FEATURE_ERROR, GET_FEATURES, CLEAR_FEATURE } from './actionTypes';
import axios from 'axios';

// Fetch all features
export const getFeatures = () => async dispatch => {
  dispatch({ type: CLEAR_FEATURE });
  try {
    const res = await axios('/api/features');
    console.log(res.data);
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
