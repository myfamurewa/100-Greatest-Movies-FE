import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {MovieList, Movie, MovieChar, MovieChars, TitleCard} from './movieListElements'
import Navbar from "./Navbar"
import Stars from "./Stars"
import axios from 'axios'
export default function Home() {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState()
    const [ratings, setRatings] = useState([])
    
    useEffect(() => {
       axios.get("http://localhost:5000/movies/").then(res => {
           console.log(res)
           setMovies(res.data)
       }).catch(err => {
           console.log(err)
           setError(err)
       })

       axios.get("http://localhost:5000/ratings/").then(res => {
           console.log("ratings", res)
           setRatings(res.data)
       }).catch(err => {
           console.log("ratings error", err)
       })
    }, []) 
    return ( 
        <>
            <Navbar/>
            {error && <span>An error has occurred {error}</span>}
            <MovieList>
            {movies.map(movie => (
                 <Movie className="movies" key={movie.id}>
                    <Link to={`/movies/${movie.id}`} ><TitleCard>{movie.id}. {movie.name}</TitleCard></Link>
                    <MovieChars>
                    <MovieChar>({movie.year})</MovieChar>
                    {movie.categories.split(",").map(category => (
                        <MovieChar>{category}</MovieChar>
                    ))}
                    </MovieChars>
                    <p>{movie.runtime} minutes</p>
                    {/* <p>Summary: {movie.summary}</p> */}
                    <Stars size={25} ratingFactor={ratings.filter(rating => rating.movie_id === movie.id).reduce((acc, cv) => {
                        return acc + cv.rating
                    }, 0) / ratings.filter(rating => rating.movie_id === movie.id).length}></Stars>
                    </Movie>
            ))}
            </MovieList>
        </>
    )
}
