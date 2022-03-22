import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";

const SearchPage = () => {

  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  //현재 url 받아오기
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q"); // 현재 url의 q params를 받아와서 저장
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?inlcude_adult=false&query=${searchTerm}`
      );
      console.log(request);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const resultSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div className="movie_column-poster" onClick={()=>navigate(`/${movie.id}`)}>
                  <img
                    src={movieImageUrl}
                    alt="movie"
                    className="movie_poster"
                  />
                </div>
              </div>
            );
          } else {
              return (<div></div>);
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-result_text">
          <p>찾고자 하는 검색어"{debouncedSearchTerm}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  };

  return resultSearchResults();
};

export default SearchPage;
