import React from 'react';
import API from '../util/api';
import bgColors from '../util/colorValues';
import MovieInfoCard from '../components/movie-info-card.component';
class Listing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            backColor:[]
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

    componentDidMount() {
        this.loadMovies();
    }

    render() {
        return (
            <div className="flex flex-col w-full h-auto bg-gray-100">
                <div className="flex py-10 justify-center items-center text-3xl font-bold">
                    Movies
                </div>
                <div className="flex flex-wrap w-full h-auto p-4  justify-around items-center">
                    {
                        this.state.movies.map((m, index) => (
                            <MovieInfoCard key={index} movie={m} backColor={this.state.backColor[index]} />
                        ))
                    }
                </div>
            </div>
            
        )
    }
}



export default Listing;