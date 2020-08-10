import React from 'react';
import GenrePill from './genrePill.component';

const GenreList = ({genres}) =>{
    return(
        genres.length>0 ? genres.map((g,index) => ( <GenrePill key={index} genre={g} /> )) :""
    )
}

export default GenreList;