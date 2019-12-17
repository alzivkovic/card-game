export const getRandomPlayers = totalPlayers => {
	const playerNames = ['Me', 'Ola', 'Rosetta', 'Carolyn'];
	const players = [];
	for(let i=0; i < totalPlayers; i++) {
		players.push({
			playerId: Math.random().toString(36).substring(7),
			name: playerNames[i],
			score: 0,
			isMe: i === 0,
		});
	}
	return players;
};