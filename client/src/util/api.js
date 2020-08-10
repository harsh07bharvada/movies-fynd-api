import axios from 'axios';

export default {

	// Gets all movies
	getBooks :function() {
		return axios.get('/getMovies');
	},

	//Login using username & password data
	processLogin : function (credentials){
		console.log(`credentials : ${JSON.stringify(credentials)}`);
		 return axios.post('/signin',credentials);
		
	}
};