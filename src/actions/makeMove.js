import ApiClient from '../api/client';
export const MAKE_MOVE = 'MAKE_MOVE';

const api = new ApiClient();

export default updatedGame => {
	return dispatch => {
		api.put(`/games/${updatedGame._id}`, updatedGame).then(() => {
			dispatch({ type: MAKE_MOVE });
		});
	};
};
