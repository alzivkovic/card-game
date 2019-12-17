import React from 'react';
import { Link } from 'react-router-dom';
import './select-players.scss';

const totalPlayerOptions = [2, 3, 4];

export const SelectPlayers = () => (
	<div className="select-players">
		<span className="title">Select Number Of Players</span>
		{totalPlayerOptions.map(playersNumber => (
			<Link to={`/game/${playersNumber}`} className="simple-button" key={playersNumber}>
				{`${playersNumber} players`}
			</Link>
		))}
	</div>
);