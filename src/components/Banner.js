import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //현재 상영중인 영화정보 가져오기 (여러영화)
    const request = await axios.get(requests.fetchNowPlaying);
    console.log(request);
    // 여러개의 영화중 하나의 ID를 가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    //특정 영화의 더 상세한 정보를 가져오기 (비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    }); //🔥🔥append_to_response 가 videos 값이 있다면 나오게 하는것
    setMovie(movieDetail);
  };
  // overview가 길어지면 100까지만 짤라주는 함수
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }; // str? 이거에 의미 (str.length하면 안돼?) => str이 정의되어 있을때만 length를 구하는 것임
  //str 이 없는데 length   길이를 구하려고 하다가 undefined 에러가 나게 된다.

  console.log("movie", movie);
  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("http://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}{" "}
          </h1>
          <div className="banner__buttons">
            <button
              className="banner__button play"
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className="banner__button info">More Information</button>
          </div>

          <h1 className="banner__description">
            {truncate(movie?.overview, 100)}
          </h1>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  } else {
    return (
      <div>
        <Cotainer>
          <HomeContainer>
            <Iframe
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              title="YouTube video player"
              frameborder="0"
              allow="autoplay; fullscreen"
              allowfullscreen
            ></Iframe>
          </HomeContainer>
        </Cotainer>
      </div>
    );
  }
}
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Cotainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
