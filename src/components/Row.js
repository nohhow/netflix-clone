import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import "./Row.css";
import MovieModal from "./MovieModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
        <div className="slider_arrow_left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>
        <div id={id} className="row_posters">
          <Swiper slidesPerView={`${isLargeRow ? "7" : "6"}`} spaceBetween={20}>
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
        <div className="slider_arrow_right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
};

export default Row;
