import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setPlayers, setTotalPlayers, setWinners, setPlayerCards } from '../../actions';
import { getRandomPlayers } from '../../utils';
import Card from '../../components/card';
import CardBack from '../../components/card-back';
import { cardValues } from '../../consts';
import DeckService from '../../services/deck-service';
import './card-game.scss';

const WAIT_TIME = 600;

class CardGame extends React.PureComponent {

	constructor(params) {
		super(params);

		this.state = {
			preventActions: false,
			isGameOver: false,
			selectedCards: {},
		};
	}

	componentDidMount() {
		const totalPlayers = Number(this.props.match.params.totalPlayers);
		this.props.setTotalPlayers(Number(this.props.match.params.totalPlayers));
		this.props.setPlayers(getRandomPlayers(totalPlayers));
		this.getData();
	}

	async getData() {
		const deckData = await DeckService.getDeckId();
		const { totalPlayers } = this.props;
		const totalCards = totalPlayers * 10;
		const allCardsData = await DeckService.getDeckCards(deckData.deck_id, totalCards);
		const playerCards = {};
		for(let i = 0; i < totalPlayers; ++i) {
			playerCards[this.props.players[i].playerId] = (allCardsData.cards.splice(0, 10));
		}
		this.props.setPlayerCards(playerCards);
	}

	wait(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	makeAMove(player) {
		const playerCards = this.props.playerCards[player.playerId];
		const randomCardIndex = Math.round(Math.random() * (playerCards.length - 1));
		return playerCards[randomCardIndex];
	}

	async calculateAndAddScore() {
		const sortedScores = Object.entries(this.state.selectedCards).map(card => ({
			playerId: card[0],
			value: cardValues[card[1].value],
		})).sort((selectedCardA, selectedCardB) => {
			return selectedCardA.value > selectedCardB.value ? -1 : 1;
		});
		let winner = sortedScores[0];
		for(let i = 1; i < sortedScores.length; i++) {
			if(sortedScores[i-1].value === sortedScores[i].value) {
				winner = sortedScores[i];
			} else {
				break;
			}
		}
		const players = [ ...this.props.players ];
		const player = players.find(player => player.playerId === winner.playerId);
		sortedScores.forEach(score => {
			player.score += score.value;
		});
		await this.setState({
			players,
		});
	}

	async selectCard(card) {
		if(this.state.preventActions) {
			return;
		}
		await this.setState({
			preventActions: true,
		});
		const selectedCards = {};
		const myId = this.props.players.find(player => player.isMe).playerId;
		selectedCards[myId] = card;
		await this.setState({
			selectedCards,
		});
		for(let i = 1; i < this.props.players.length; i++) {
			await this.wait(WAIT_TIME);
			const selectedCards = { ...this.state.selectedCards};
			selectedCards[this.props.players[i].playerId] = this.makeAMove(this.props.players[i]);
			await this.setState({
				selectedCards,
			});
		}
		await this.wait(WAIT_TIME * 1.5);
		await this.calculateAndAddScore();

		const playerCards = { ...this.props.playerCards };
		Object.keys(playerCards).forEach(key => {
			playerCards[key] = playerCards[key].filter(card => card.code !== this.state.selectedCards[key].code);
		});
		const isGameOver = playerCards[Object.keys(playerCards)[0]].length === 0;
		if (isGameOver) {
			this.setWinners();
		}
		this.props.setPlayerCards(playerCards);
		this.setState({
			isGameOver,
			selectedCards: {},
			preventActions: false,
		});
	}

	setWinners() {
		let winners = [];
		this.props.players.forEach(player => {
			if(winners.length === 0) {
				winners = [player];
			} else if(winners[0].score < player.score) {
				winners = [player];
			} else if(winners[0].score === player.score) {
				winners.push(player);
			}
		});
		this.props.setWinners(winners);
	}

	render() {
		const { selectedCards, isGameOver } = this.state;
		const { players, winners, playerCards } = this.props;
		return (
			<div className="card-game-container">
				{isGameOver && (
					<div className="game-over-container">
						<div className="title">GAME OVER</div>
						<div>{winners.map(winner => winner.name).join(', ')} won with {winners[0].score} points</div>
						<Link to={`/`} className="">New Game</Link>
					</div>
				)}
				{!isGameOver && players.map((player, index) => (
					<div className={`player-container position-${index}`} key={index}>
						<div className="player-name">{player.name}</div>
						<div className="player-score">Score: {player.score}</div>
						<div  className="player-cards">{playerCards[player.playerId] && playerCards[player.playerId].map((card, cardIndex) => (
							player.isMe || selectedCards[player.playerId] === card
								? <Card
									{...card}
									onClick={() => this.selectCard(card)}
									isSelected={selectedCards[player.playerId] === card}
									key={cardIndex} />
								: <CardBack
									index={cardIndex}
									key={cardIndex} />
						))}</div>
					</div>
				))}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	players: state.game.players,
	totalPlayers: state.game.totalPlayers,
	winners: state.game.winners,
	playerCards: state.game.playerCards,
});

const mapDispatchToProps = dispatch => ({
	setPlayers: players => dispatch(setPlayers(players)),
	setTotalPlayers: totalPlayers => dispatch(setTotalPlayers(totalPlayers)),
	setWinners: winners => dispatch(setWinners(winners)),
	setPlayerCards: playerCards => dispatch(setPlayerCards(playerCards)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CardGame)