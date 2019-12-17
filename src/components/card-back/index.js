import React from 'react';
import './card-back.scss';

export default class CardBack extends React.PureComponent {

	render() {
		const { index } = this.props;
		return (
			<div className="card-back" style={{ left: `${index === 0 ? 0 : index/0.8}em`}} />
		);
	}
}