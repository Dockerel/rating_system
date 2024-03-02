"use client";
import React from "react";
import Rating from "./Rating";
import "./styles.css";
export default function Home() {
  const [rating, setRating] = React.useState(0);
  return (
    <div className="App">
      <h1>별점 평가를 해보자.</h1>
      <div>
        <Rating
          count={5}
          value={rating}
          onChange={(value) => setRating(value)}
        />
        <p>평점 : {rating} </p>
      </div>
    </div>
  );
}
