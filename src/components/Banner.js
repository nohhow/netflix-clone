import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import requests from "../api/requests";
import "./Banner.css";
import styled from "styled-components";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //현재 상영중인 영화 정보 가져오기 (여러 영화)
    const request = await axios.get(requests.fetchNowPlaying); // await을 사용하지 않으면 데이터를 처리하는 시간차를 고려하지 않게 되어 빈 값을 리턴받게 될 수 있다.
    // await : await 문은 Promise가 fulfill되거나 reject 될 때까지 async 함수의 실행을 일시 정지하고, Promise가 fulfill되면 async 함수를 일시 정지한 부분부터 실행합니다. 이때  await 문의 반환값은 Promise 에서 fulfill된 값이 됩니다.
    // 여러 영화 중 하나만 가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함하여)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    }); //data:movieDetail = 가져온 데이터 에서 data 항목만 받아서 저장하겠다는 뜻 movieDetail로 받아서 movieDetail.data를 리턴하는 것과 같음
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className="banner_buttons">
            <button
              className="banner_button play"
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className="banner_button info">More Information</button>
          </div>
          <h1 className="banner_description">
            {truncate(movie?.overview, 100)}
          </h1>
        </div>
        <div className="banner_fadeBottom" />
      </header>
    );
  } else {
    return (
      <div>
        <Container>
          <HomeContainer>
            <Iframe
              width="650"
              height="340"
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              frameborder="0"
              allow="autoplay; fullscreen"
            ></Iframe>
          </HomeContainer>
        </Container>
      </div>
    );
  }
};

export default Banner;

const Container = styled.div`
    display = flex;
    justify-content: center;
    align-items: centerl
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.85;
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
