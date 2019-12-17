export const actionTypes = {
	SET_PLAYERS: 'SET_PLAYERS',
	SET_TOTAL_PLAYERS: 'SET_TOTAL_PLAYERS',
	SET_WINNERS: 'SET_WINNERS',
	SET_PLAYER_CARDS: 'SET_PLAYER_CARDS',
};

export const setPlayers = players => ({
	type: actionTypes.SET_PLAYERS,
	players,
});

export const setTotalPlayers = totalPlayers => ({
	type: actionTypes.SET_TOTAL_PLAYERS,
	totalPlayers,
});

export const setWinners = winners => ({
	type: actionTypes.SET_WINNERS,
	winners,
});

export const setPlayerCards = playerCards => ({
	type: actionTypes.SET_PLAYER_CARDS,
	playerCards,
});