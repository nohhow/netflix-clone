import React from "react";
import requests from "../../api/requests";
import Banner from "../../components/Banner";
import Row from "../../components/Row";

const MainPage = () => {
  return (
    <div>
      <Banner />

      <Row
        fetchUrl={requests.fetchNetflixOriginals}
        title="NETFLIX ORIGINALS"
        id="NO"
        isLargeRow
      />

      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movie" id="AM" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movie" id="CM" fetchUrl={requests.fetchComedyMovies} />
    </div>
  );
};

export default MainPage;
