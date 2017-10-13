import login from './login';
import register from './register';
import getStatus from './getStatus';
import {combineReducers} from 'redux';

export default combineReducers({
  login, register, getStatus
});
