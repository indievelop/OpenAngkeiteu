import authentication from './authentication';
import angkeiteu from './angkeiteu';
import search from './search';
import { combineReducers } from 'redux';

export default combineReducers({
  authentication, angkeiteu, search
});
