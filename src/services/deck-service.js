const API_URL = 'https://deckofcardsapi.com/api/';

export default {
	getDeckId: async () => {
		const deckResponse = await fetch(`${API_URL}deck/new/shuffle/?deck_count=1`);
		const deckData = await deckResponse.json();
		return deckData;
	},
	getDeckCards: async (deckId, totalCards) => {
		const allCardsResponse = await fetch(`${API_URL}deck/${deckId}/draw/?count=${totalCards}`);
		const allCardsData = await allCardsResponse.json();
		return allCardsData;
	},
};