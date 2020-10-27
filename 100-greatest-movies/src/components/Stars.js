import React from 'react'
import { FaStar } from "react-icons/fa";
export default function Stars(props) {
    return (
        <div>
            {Array(5)
            .fill("")
            .map((_, i) => (
                <FaStar
                  className="star"
                  color={i < Math.round(props.ratingFactor)? "gold": "gray"}
                  size={props.size}
                />
            ))}
            
        </div>
    )
}
