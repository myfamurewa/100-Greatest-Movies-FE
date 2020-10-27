import React, {useState} from "react";
import moment from "moment";
import axios from "axios"
export default function Comment(props) {
  const created = moment(props.comment.created_at);
  const now = moment(Date.now());
  const hours = Math.floor(
    Math.abs(moment.duration(now.diff(created)).asHours())
  );
  const [updatingComment, setUpdatingComment] = useState(false)
  const [updatedComment, setUpdatedComment] = useState(null)
  const editComment = () => {
    setUpdatingComment(true)
    setUpdatedComment(props.comment)
  }
  const deleteComment = () => {
    axios.delete(`http://localhost:5000/movies/${props.movie_id}/comments/${props.comment.id}`)
    .then(res => {
      console.log(res)
      console.log("successful deletion")
      props.setComments(props.comments.filter(comment => comment.id !== props.comment.id))
    }).catch(err => {
      console.log("something went wrong", err)
    })
  }

  const updateComment = () => {
    console.log("updated comment before submission", updatedComment)
    axios.put(`http://localhost:5000/movies/${props.movie_id}/comments/${props.comment.id}`, updatedComment)
    .then(res => {
      console.log(res)
      console.log("successful update of comment")
      setUpdatingComment(false)
    }).catch(err => {
      console.log("something went wrong while trying to update your post", err)
    })
  }
  const handleChange = e => {
    setUpdatedComment({
      ...updatedComment,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
     {updatingComment?(<div><textarea name="text" value={updatedComment.text} placeholder="comment here" onChange={handleChange}/>
        <button onClick={()=> updateComment()} >Submit Comment</button>
        <button onClick={()=> setUpdatingComment(false)}>Cancel</button></div>) :(<div><p>{props.comment.text}</p>
      <span>
        posted{" "}
        {hours > 24
          ? `${Math.floor(hours / 24)} ${
              Math.floor(hours / 24) > 1 ? "days" : "day"
            } ago`
          : `${hours} ${hours > 1 ? "hours" : "hour"}`}{" "}
        {props.comment.created_at !== props.comment.updated_at
          ? "(edited)"
          : ""}
      </span>
      <button onClick={() => deleteComment()}>Delete Comment</button>
      <button onClick={() => editComment()}>Edit Comment</button>
      </div>)}
    </div>
  );
}

