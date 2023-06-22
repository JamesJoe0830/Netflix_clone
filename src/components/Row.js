import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal";
import "./Row.css";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
        {/* <div className="slider__arrow-left">
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
        </div> */}
            <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      loop={true}
      // spaceBetween={50}
      // slidesPerView={5}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        1378: {
          slidesPerView:6,
          slidesPerGroup:6,
        },
        998: {
          slidesPerView:5,
          slidesPerGroup:5,
        },
        625: {
          slidesPerView:4,
          slidesPerGroup:4,
        },
        0: {
          slidesPerView:3,
          slidesPerGroup:3,
        },
      }}
      // scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <SwiperSlide>
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
            </SwiperSlide>
          ))}
        </div>
    </Swiper>
        {/* <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
              //🔥🔥 document.getElementById(id).scrollLeft를 활용해서 슬라이드 기능 구현
              // scrollRight는 없어서 scrollLeft '-' '+'부분을 통해서 구분 
            }}
          >
            {">"}
          </span>
        </div> */}
      </div>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )

      }
    </section>
  );
}
