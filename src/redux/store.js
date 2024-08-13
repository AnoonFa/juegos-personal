import { createStore, combineReducers } from 'redux';
import gameReducer from './reducers/gameReducer';

const rootReducer = combineReducers({
  games: gameReducer,
  // otros reducers si los hay
});

const store = createStore(rootReducer);

export default store;
