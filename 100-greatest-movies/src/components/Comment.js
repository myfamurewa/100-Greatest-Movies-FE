import React from "react";
import moment from "moment";
export default function Comment(props) {
  const created = moment(props.comment.created_at);
  const now = moment(Date.now());
  const hours = Math.floor(
    Math.abs(moment.duration(now.diff(created)).asHours())
  );

  return (
    <div>
      <p>{props.comment.text}</p>
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
    </div>
  );
}

