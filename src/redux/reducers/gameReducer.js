import { BUY_LICENSE, SELL_LICENSE } from '../actions/gameActions';
import { gamesData } from '../../components/data/gamesData';

const initialState = {
  games: gamesData,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_LICENSE:
      return {
        ...state,
        games: state.games.map(game =>
          game.id === action.payload.gameId
            ? {
                ...game,
                licensesAvailable: game.licensesAvailable - action.payload.quantity,
                licensesSold: game.licensesSold + action.payload.quantity,
              }
            : game
        ),
      };
    case SELL_LICENSE:
      return {
        ...state,
        games: state.games.map(game =>
          game.id === action.payload.gameId
            ? {
                ...game,
                licensesAvailable: game.licensesAvailable + action.payload.quantity,
                licensesSold: game.licensesSold - action.payload.quantity,
              }
            : game
        ),
      };
    default:
      return state;
  }
};

export default gameReducer;
