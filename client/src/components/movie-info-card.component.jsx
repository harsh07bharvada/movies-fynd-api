import React from 'react';
import ImdbIcon from '../assets/imdb.svg';


const MovieInfoCard = ({ movie, backColor }) => {

    const { name, username, popularity, genre, director, imdb_score } = movie;
    return (
        <div className="flex w-full h-auto md:w-1/4 md:h-auto py-3 px-4 text-center">
            <div style={{ backdropFilter: `blur(2px)`,backgroundImage:backColor }} className="flex flex-col w-full h-full bg-white shadow-lg rounded justify-around items-center">
                <div className="flex flex-col w-full h-full">
                    <div className="flex w-full h-auto justify-center items-center py-3 font-bold text-lg md:text-xl">
                        {name}
                    </div>
                    <div className="flex w-full h-auto justify-center items-center font-semibold text-gray-700">
                        Directed by: {director}
                    </div>
                    <div className="flex flex-wrap w-full h-auto justify-around items-center p-2">
                        {
                            genre.length>0 ?genre.map((g,index) => (
                                <div key={index} className="text-sm text-gray-700 bg-gray-200 p-1 m-1 rounded">
                                    {g}
                                </div>
                            )) :""
                        }
                    </div>
                </div>
                {username?
                    <div className="flex w-full h-auto p-2 justify-center items-center ">
                        Created by: {username}
                    </div>:""
                }
                
                <div className="flex w-full  rounded p-2 font-black text-lg justify-around items-center">
                    <img className="h-10" src={ImdbIcon} alt="imdb" /> {imdb_score} / 10
                </div>
                <div className="flex w-full bg-gray-900 rounded-b py-3 text-white font-bold justify-around items-center">
                    Popularity: {popularity} / 100
                </div>
                
                
            </div>
        </div>
    )
}

export default MovieInfoCard;