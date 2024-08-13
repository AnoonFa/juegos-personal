import { createStore, combineReducers } from 'redux';
import gameReducer from './reducers/gameReducer';

const rootReducer = combineReducers({
  games: gameReducer,
});

const store = createStore(rootReducer);

export default store;
