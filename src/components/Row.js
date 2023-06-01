import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";
export default function Row({ isLargeRow, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };
  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
              //🔥🔥 document.getElementById(id).scrollLeft를 활용해서 슬라이드 기능 구현
              console.log(document.getElementById(id).scrollLeft);
            }}
          >
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"} `}
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              // poster path는 넷플릭스 original제공하는 부분이고 // isLarge가 false일 경우에 path.backdrop.path이다.
              alt={movie.name}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
              //🔥🔥 document.getElementById(id).scrollLeft를 활용해서 슬라이드 기능 구현
            }}
          >
            {">"}
          </span>
        </div>
      </div>
    </section>
  );
}
