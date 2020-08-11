import axios from 'axios';

export default {

	// Gets all movies
	getBooks :function() {
		return axios.get('/getMovies');
	},

	//Login using username & password data
	processLogin : function (credentials){
		 return axios.post('/signin',credentials);
		
	},
	processSignUp : function (credentials){
		 return axios.post('/signup',credentials);
		
	}
};