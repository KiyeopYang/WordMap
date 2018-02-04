import { combineReducers } from 'redux';
import data from './data/reducer';
import addWord from './scene/AddWord/reducer';
import wordList from './scene/WordList/reducer';
import exam from './scene/Exam/reducer';

export default combineReducers({
  data,
  addWord,
  wordList,
  exam,
});
