import authentication from './authentication';
import angkeiteu from './angkeiteu';
import comment from './comment';
import search from './search';
import file from './file';
import chartFilter from './chartFilter';
import angkeiteuExplorer from './angkeiteuExplorer';
import angkeiteuCreator from './angkeiteuCreator';
import imageViewer from './imageViewer';
import modal from './modal'
import { combineReducers } from 'redux';

export default combineReducers({
  authentication, angkeiteu, comment, search, file, chartFilter,
  angkeiteuExplorer, angkeiteuCreator, imageViewer, modal
});
