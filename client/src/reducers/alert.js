import { SET_ALERT, REMOVE_ALERT } from '../actions/actionTypes';
const initalState = [];

export default function(state = initalState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload]; // typical reducer returns a new state insite of a previous array and new payload.
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
}
