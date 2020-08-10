import React from 'react';
import API from '../util/api';
import bgColors from '../util/colorValues';
import Pill from '../components/Pill.component';
import Dropdown from '../components/Dropdown.component';
import SearchBox from '../components/SearchBox.component';
import MovieInfoCard from '../components/MovieInfoCard.component';
class Listing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            backColor: [],
            searchField: '',
            sortBy: '',
            filterBy: [],
            lastKeyPressTime: Date.now(),
            sortList: [{ option: 'Popularity', key: 'popularity',order:false }, { option: 'Director', key: 'director',order:true }, { option: 'Movie Name', key: 'name' ,order:true }],

        }
    }

    loadMovies = async () => {
        try {
            const { data: { result } = [] } = await API.getBooks();

            //Generate random numbers for random background colors
            const randomBackgroundIndices = Array.from({ length: result.length }, () => bgColors[Math.floor(Math.random() * 10)]);

            //Scoop out genres array from the movies
            let genres = result.map(d => d["genre"]);
            console.log(genres);
            //Flatten the genres array
            genres = [].concat.apply([], genres);
            
            //Remove duplicate genres
            genres = genres.map(g => g.trim()).filter((d, index) => genres.indexOf(d) === index).map(v=>({value:v,active:true}));
            console.log(genres);
            this.setState({ movies: result, backColor: randomBackgroundIndices, filterBy: genres });
        }
        catch (err) {
            console.log('Error while fetching movies!!!');
        }
    }

    handleSearchChange = e => {

        const { lastKeyPressTime } = this.state;
        if (Date.now() - lastKeyPressTime > 1000 || e.target.value === '')  {
            this.setState({ searchField: e.target.value, lastKeyPressTime: Date.now() });
        } else {
            this.setState({ lastKeyPressTime: Date.now() });
        }

    }

    sorting(first, second,sortBy) {

        let comparison = 0;
        if (first > second) {
            comparison = 1;
        } else if (first < second) {
            comparison = -1;
        }
        return sortBy['order']? comparison : -1 * comparison;
    }

    dropdownOnClick = e => {
        const obj = this.state.sortList.find(element => element['option'] === e.target.value);
        if(obj)
            this.setState({ sortBy: obj });
    }

    onPillClick = genreValue =>{
        let { filterBy } = this.state;
        filterBy = filterBy.map(genre=>{
            if(genre['value'] === genreValue){
                genre['active'] = !genre['active'];
            }
            return genre;
        });
        this.setState({filterBy: filterBy });
    }


    componentDidMount() {
        this.loadMovies();
    }

    render() {

        const { searchField, movies, backColor, filterBy, sortBy, sortList } = this.state;

        let filterGenres = filterBy.filter(g=>g['active']);
        //Filter based on search
        let filteredMovies = movies.filter(eachMovie => eachMovie.name.toLowerCase().includes(searchField.toLowerCase()) || eachMovie.director.toLowerCase().includes(searchField.toLowerCase()));
        
        //Filter based on sort
        filteredMovies.sort((a, b) => this.sorting(a[sortBy['key']], b[sortBy['key']], sortBy));

        //Filter based on Genre
        filteredMovies = filteredMovies.filter(movie=>{
            const currentGenres = movie['genre'].map(g=>g.trim());
            if(filterGenres.filter(({value,active})=>currentGenres.includes(value)).length){
                return true;
            }else
                return false;
        })

        return (
            <div className="flex flex-col w-full h-auto bg-gray-100 justify-center items-center">
                <div className="flex pt-10 justify-center items-center text-5xl font-bold">
                    Movies
                </div>
                <div className="flex w-full h-auto py-10 px-4 justify-center items-center ">
                    
                    <SearchBox placeholder="Search for your favourite movies / directors..." handleSearchChange={this.handleSearchChange} />

                    <Dropdown name="sortList" values={sortList.map(s => s['option'])} dropdownOnClick={this.dropdownOnClick} />

                </div>
                <div className="flex flex-wrap w-4/5 h-auto py-5 justify-center items-center">
                    {
                        filterBy.map((genre,index)=>(
                            <Pill key={index} data={genre} onPillClick={this.onPillClick}   />
                        ))
                    }
                </div>
                <div className="flex flex-wrap w-full h-auto p-4  justify-around items-center">
                    {
                        filteredMovies.map((m, index) => (
                            <MovieInfoCard key={index} movie={m} backColor={backColor[index]} />
                        ))
                    }
                </div>
            </div>

        )
    }
}



export default Listing;