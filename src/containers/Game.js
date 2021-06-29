import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchOneGame, fetchPlayers } from '../actions/games/fetch';
import { deleteGamesFrom } from '../actions/games/delete';
import { connect as subscribeToWebsocket } from '../actions/websocket';
import JoinGameDialog from '../components/games/JoinGameDialog';
import Board from '../components/ticTacToe/Board';
import makeMove from '../actions/makeMove';
import { hasWinner } from '../functions';
import './Game.css';

const playerShape = PropTypes.shape({
	userId: PropTypes.string.isRequired,
	pairs: PropTypes.arrayOf(PropTypes.string).isRequired,
	name: PropTypes.string,
});

class Game extends PureComponent {
	static propTypes = {
		fetchOneGame: PropTypes.func.isRequired,
		fetchPlayers: PropTypes.func.isRequired,
		deleteGamesFrom: PropTypes.func.isRequired,
		subscribeToWebsocket: PropTypes.func.isRequired,
		game: PropTypes.shape({
			_id: PropTypes.string.isRequired,
			userId: PropTypes.string.isRequired,
			players: PropTypes.arrayOf(playerShape),
			updatedAt: PropTypes.string.isRequired,
			createdAt: PropTypes.string.isRequired,
			started: PropTypes.bool,
			turn: PropTypes.number.isRequired,
			board: PropTypes.arrayOf(PropTypes.string),
		}),
		currentPlayer: playerShape,
		isPlayer: PropTypes.bool,
		isJoinable: PropTypes.bool,
		hasTurn: PropTypes.bool,
	};

	goToLobby(id) {
		this.props.deleteGamesFrom(id);
		setTimeout(() => {
			this.props.push(`/`);
		}, 1000);
	}

	componentWillMount() {
		const { game, fetchOneGame, subscribeToWebsocket } = this.props;
		const { gameId } = this.props.match.params;

		if (!game) {
			fetchOneGame(gameId);
		}
		subscribeToWebsocket();
	}

	componentWillReceiveProps(nextProps) {
		const { game } = nextProps;

		if (game && !game.players[0].name) {
			this.props.fetchPlayers(game);
		}
	}

	handleClick(position) {
		const { game, isPlayer, hasTurn } = this.props;

		if (game.players.length < 2) return;

		let moveType = game.turn === 0 ? 'X' : 'O';

		if (hasTurn && isPlayer && game.board[position] === '-') {
			let updatedGame = game;
			updatedGame.board[position] = moveType;
			updatedGame.turn = game.turn === 0 ? 1 : 0;
			this.props.makeMove(updatedGame);
		}
	}

	render() {
		const { game } = this.props;

		if (!game) return null;

		const title = game.players
			.map(p => p.name || null)
			.filter(n => !!n)
			.join(' vs ');

		const winner = hasWinner(game.board);

		if (winner !== '') {
			return (
				<h1>
					{winner} HAS WON
					{this.goToLobby(game._id)}
				</h1>
			);
		}

		return (
			<div>
				<h1>Game!</h1>
				<p className="game_title">
					{title}
				</p>

				<Board board={game.board} clickAction={this.handleClick.bind(this)} />

				<JoinGameDialog gameId={game._id} />
			</div>
		);
	}
}

const mapStateToProps = ({ currentUser, games }, { match }) => {
	const game = games.filter(g => g._id === match.params.gameId)[0];
	const currentPlayer =
		game && game.players.filter(p => p.userId === currentUser._id)[0];
	const hasTurn =
		!!currentPlayer && game.players[game.turn].userId === currentUser._id;
	return {
		currentPlayer,
		game,
		isPlayer: !!currentPlayer,
		hasTurn,
		isJoinable: game && !currentPlayer && game.players.length < 2,
	};
};

export default connect(mapStateToProps, {
	subscribeToWebsocket,
	fetchOneGame,
	fetchPlayers,
	deleteGamesFrom,
	makeMove,
	push,
})(Game);
