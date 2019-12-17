import React from 'react';
import './card.scss';

export default class Card extends React.PureComponent {

	render() {
		const { image, onClick, isSelected } = this.props;
		return (
			<div className={`card-container ${isSelected ? 'selected' : ''}`} onClick={onClick}><img src={image} /></div>
		);
	}
}