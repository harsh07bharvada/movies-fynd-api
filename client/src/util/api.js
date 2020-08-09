import axios from 'axios';

export default {

	// Gets all movies
	getBooks: function() {
		return axios.get('/books');
	}
};