import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import "./Row.css";
import MovieModal from "./MovieModal";
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Row = ({ title, fetchUrl, id, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [movieSelected, setMovieSelected] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log("request", request);
    setMovies(request.data.results);
    return request;
  };

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div id={id} className="row_posters">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            navigation
            breakpoints={{
              1378: {
                slidesPerView: `${isLargeRow ?  7 : 6}`,
                slidesPerGroup: `${isLargeRow ?  7 : 6}`
              },
              998: {
                slidesPerView: `${isLargeRow ?  6 : 5}`,
                slidesPerGroup: `${isLargeRow ?  6 : 5}`
              },
              625: {
                slidesPerView: `${isLargeRow ?  5 : 4}`,
                slidesPerGroup: `${isLargeRow ?  5 : 4}`
              },
              0: {
                slidesPerView: `${isLargeRow ?  4 : 3}`,
                slidesPerGroup: `${isLargeRow ?  4 : 3}`
              },
            }}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <img
                  className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
};

export default Row;
