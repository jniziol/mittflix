import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Poster from './Poster';

const Search = (props) => {
  const [shows, setShows] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const getShows = async () => {
      const API_KEY = "0b941991fb739be72fed42ae5e2a4891";
      const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&watch_region=CA&api_key=${API_KEY}`)
      const shows = await response.json();
      setShows(shows.results);
    };

    getShows();
  }, [query]);

  return (
    <div className="titleList">
      <div className="title">
        <h1>Results</h1>
        <div className="titles-wrapper">
          {shows.map(show => (
            <Poster show={show} key={show.id + show.name} toggleWatchlist={props.toggleWatchlist} watchlist={props.watchlist}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;