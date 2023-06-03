import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal";
import "./Row.css";
export default function Row({ isLargeRow, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected,setMovieSelected] = useState({});
  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true); // modal true로 만들기 위한 것
    setMovieSelected(movie); //movie 정보 가져오는 것
  };
  // console.log("movie",movies)
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
              //onClick하면 상세 설명 나오게 만들기 *modal
              onClick={()=>{handleClick(movie)}}
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
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )

      }
    </section>
  );
}
