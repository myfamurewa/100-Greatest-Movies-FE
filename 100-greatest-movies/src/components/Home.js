import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
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
        <div>
            {error && <span>An error has occurred {error}</span>}
            {movies.map(movie => (
                 <div className="movies" key={movie.id}>
                    <Link to={`/movies/${movie.id}`} ><h1>{movie.id}. {movie.name}</h1></Link>
                    <h4>Year: {movie.year}</h4>
                    <ul>
                    {movie.categories.split(",").map(category => (
                        <li>{category}</li>
                    ))}
                    </ul>
                    <p>Runtime: {movie.runtime}</p>
                    <p>Summary: {movie.summary}</p>
                    <Stars size={25} ratingFactor={ratings.filter(rating => rating.movie_id === movie.id).reduce((acc, cv) => {
                        return acc + cv.rating
                    }, 0) / ratings.filter(rating => rating.movie_id === movie.id).length}></Stars>
                    </div>
            ))}
        </div>
    )
}
