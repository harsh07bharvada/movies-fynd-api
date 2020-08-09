import React from 'react';
import API from '../util/api';
import SearchBox from '../components/searchBox.component';
import bgColors from '../util/colorValues';
import MovieInfoCard from '../components/movie-info-card.component';
class Listing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            backColor:[],
            searchField:'',
            lastKeyPressTime : Date.now(),
            
        }
    }

    loadMovies = async () => {
        try {
            const { data: { result } = [] } = await API.getBooks();
            const randomBackgroundIndices = Array.from({length: result.length}, () => bgColors[Math.floor(Math.random() * 10)]);
            this.setState({ movies: result, backColor: randomBackgroundIndices });
        }
        catch (err) {

        }
    }

    handleSearchChange = e =>{
        
        if(Date.now() - this.state.lastKeyPressTime > 1000){
            this.setState({searchField:e.target.value,lastKeyPressTime:Date.now()});
        }else{
            this.setState({lastKeyPressTime:Date.now()});
        }
        
    }

    componentDidMount() {
        this.loadMovies();
    }

    render() {

        const {searchField, movies} = this.state;
        console.log(`Search Field main component : ${searchField}`)
        const filteredMovies = movies.filter(eachMovie=> eachMovie.name.toLowerCase().includes(searchField.toLowerCase()) || eachMovie.director.toLowerCase().includes(searchField.toLowerCase()));
        return (
            <div className="flex flex-col w-full h-auto bg-gray-100">
                <div className="flex py-10 justify-center items-center text-5xl font-bold">
                    Movies
                </div>
                <div className="flex py-10 justify-center items-center ">
                    <SearchBox placeholder="Search for your favourite movies / directors..."
                    handleSearchChange={this.handleSearchChange} />
                </div>
                <div className="flex flex-wrap w-full h-auto p-4  justify-around items-center">
                    {
                        filteredMovies.map((m, index) => (
                            <MovieInfoCard key={index} movie={m} backColor={this.state.backColor[index]} />
                        ))
                    }
                </div>
            </div>
            
        )
    }
}



export default Listing;