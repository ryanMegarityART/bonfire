"use client";

import { useState, useEffect } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    console.log("likes", likes);
  }, [likes]);

  function handleClick() {
    setLikes(likes + 1);
  }

  return <button onClick={handleClick}>Like ({likes})</button>;
}
