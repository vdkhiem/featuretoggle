import {
  GET_FEATURES,
  GET_FEATURE,
  CLEAR_FEATURE
} from "../actions/actionTypes";

const initalState = {
  feature: null,
  features: [],
  loading: false,
  error: {}
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_FEATURE:
      return {
        ...state,
        feature: action.payload,
        loading: false
      };
    case GET_FEATURES:
      return {
        ...state,
        features: action.payload,
        loading: false
      };
    case CLEAR_FEATURE:
      return initalState;
    default:
      return state;
  }
}
