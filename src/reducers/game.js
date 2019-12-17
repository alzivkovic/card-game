import { actionTypes } from "../actions";

const INITIAL_STATE = {
	players: [],
	totalPlayers: 0,
	winners: [],
	playerCards: {},
};

const game = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.SET_PLAYERS:
			return {
				...state,
				players: action.players,
			};
		case actionTypes.SET_TOTAL_PLAYERS:
			return {
				...state,
				totalPlayers: action.totalPlayers,
			};
		case actionTypes.SET_WINNERS:
			return {
				...state,
				winners: action.winners,
			};
		case actionTypes.SET_PLAYER_CARDS:
			return {
				...state,
				playerCards: action.playerCards,
			};
		default:
			return state
	}
};

export default game;