import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import './Banner.css';
export default function Banner() {
  const [movie, setMovie] = useState([]);

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
    });
    setMovie(movieDetail);
  };
  // overview가 길어지면 100까지만 짤라주는 함수 
  const truncate = (str,n) =>{
    return str?.length > n ? str.substr(0,n-1)+ "..." :str;
  };// str? 이거에 의미 (str.length하면 안돼?) => str이 정의되어 있을때만 length를 구하는 것임
  //str 이 없는데 length   길이를 구하려고 하다가 undefined 에러가 나게 된다.

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
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name} </h1>
        <div className="banner__buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button info">More Information</button>
        </div>
        
        <h1 className="banner__description">{truncate(movie?.overview,100)}</h1>
        </div>
        <div className="banner--fadeBottom" />
      
    </header>
  );
}
