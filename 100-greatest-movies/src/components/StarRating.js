import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios"
import "./starRating.css"
export default function StarRating(props) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const sendRating = () => {
      const movieRating = {
          movie_id: props.id,
          rating: rating
      }
      axios.post(`http://localhost:5000/ratings/`, movieRating)
      .then(res =>{
          console.log(res)
          console.log("successful rating")
          setRating(0)
      }).catch(err => {
          console.log(err)
      })
  }
  return (
    <div>
      {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                key={i}
                onClick={() => setRating(ratingValue)}
              />
                <FaStar
                  key={ratingValue}
                  className="star"
                  color={ratingValue <= (hover || rating) ? "gold" : "gray"}
                  size={50}
                  onMouseEnter={() => setHover(ratingValue) }
                onMouseLeave={() => setHover(null)}
                />
            </label>
          );
        })}
      <br></br>
      <button onClick={()=> sendRating()}>Submit Rating</button>
    </div>
  );
}
