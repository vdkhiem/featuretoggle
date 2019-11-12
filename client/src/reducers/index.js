import { combineReducers } from 'redux';
import alert from './alert';
import feature from './feature';

export default combineReducers({
  alert,
  feature
});
