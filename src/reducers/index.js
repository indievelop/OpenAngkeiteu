import authentication from './authentication';
import angkeiteu from './angkeiteu';
import comment from './comment';
import search from './search';
import { combineReducers } from 'redux';

export default combineReducers({
  authentication, angkeiteu, comment, search
});
