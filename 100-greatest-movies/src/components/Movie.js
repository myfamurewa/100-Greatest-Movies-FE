import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
export default function Movie() {
    const {id} = useParams()
    const history = useHistory()
    const [movie, setMovie] = useState({})
    const [rating, setRating] = useState([])
    useEffect(() => {
       axios.get(`http://localhost5000/movies/${id}`).then( res =>{
           console.log(res)
           setMovie(res.data)
    }).catch(err => {
        console.log(err)
    })

    axios.get(`http://localhost:5000/ratings/${id}`).then(res => {
        console.log("ratings", res)
        setRating(res.data)
    }).catch(err => {
        console.log("ratings error", err)
    })
    }, [])
    return (
        <div>
            <div className="movies" key={movie.id}>
                    <h1>{movie.id}. {movie.name}</h1>
                    <h4>Year: {movie.year}</h4>
                    <ul>
                    {movie.categories.split(",").map(category => (
                        <li>{category}</li>
                    ))}
                    </ul>
                    <p>Runtime: {movie.runtime}</p>
                    <p>Summary: {movie.summary}</p>
                    <p>Rating: {Math.round(rating.reduce((acc, cv) => {
                        return acc + cv.rating
                    }, 0) / rating.length)}⭐'s</p>
                    </div>
        </div>
    )
}
