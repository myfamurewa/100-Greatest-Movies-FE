import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";
export default function Movie() {
  const { id } = useParams();
  const history = useHistory();
  const [commenting, setCommenting] = useState(false);
  const [comment, setNewComment] = useState({
    text: "",
    movie_id: id
  });
  const [movie, setMovie] = useState({
    id: 1,
    name: "Dummy Data",
    year: 2020,
    summary: "Dummy had a good day",
    runtime: 175,
    categories: "Comedy, Drama",
    rating: null,
  });
  const [rating, setRating] = useState([]);
  const [comments, setComments] = useState([]);
  const handleChange = e => {
    setNewComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };
  const submitComment = () => {
      axios.post(`http://localhost:5000/movies/${id}/comments`, comment)
      .then(res => {
          console.log("a comment was made successfully")
          setCommenting(false)
          setComments([
              ...comments,
              comment
          ])
      })
      .catch(err => {
          console.log("something went wrong while trying to post your comment")
      })
  }
  useEffect(() => {
    axios
      .get(`http://localhost:5000/movies/${id}`)
      .then((res) => {
        console.log(res);
        setMovie(res.data);
      })
      .catch(({ name, code, stack }) => {
        console.log("name", name, "code", code, "stack", stack);
      });
    axios
      .get(`http://localhost:5000/ratings/${id}`)
      .then((res) => {
        console.log("ratings", res);
        setRating(res.data);
      })
      .catch((err) => {
        console.log("ratings error", err);
      });

    axios
      .get(`http://localhost:5000/movies/${id}/comments`)
      .then((res) => {
        console.log("comments", res);
        setComments(res.data);
      })
      .catch((err) => {
        console.log("comments error", err);
      });
  }, []);
  return (
    <div>
      <div className="movies" key={movie.id}>
        <h1>
          {movie.id}. {movie.name}
        </h1>
        <h4>Year: {movie.year}</h4>
        <ul>
          {movie.categories.split(",").map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
        <p>Runtime: {movie.runtime}</p>
        <p>Summary: {movie.summary}</p>
        <p>
          Rating:{" "}
          {Math.round(
            rating.reduce((acc, cv) => {
              return acc + cv.rating;
            }, 0) / rating.length
          )}
          ⭐'s
        </p>
      </div>
      <div className="comment-Section">
        <h2>Comments:</h2>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <button onClick={()=> setCommenting(true)}>Comment</button>
      </div>
      {commenting && (
        <div>
        <textarea name="text" value={comment.text} placeholder="comment here" onChange={handleChange}/>
        <br></br>
        <button onClick={()=> submitComment()} >Submit Comment</button>
        <button onClick={()=> setCommenting(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
