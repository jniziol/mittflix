import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Details = (props) => {
  const [showDetails, setShowDetails] = useState({});
  let { id } = useParams();

  useEffect(() => {
    const getShow = async () => {
      const API_KEY = "0b941991fb739be72fed42ae5e2a4891";
      const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`);
      const results = await response.json();
      setShowDetails(results);
    }

    getShow();
  }, []);

  return (
    <>
      <div className="show-details">
        <img src={showDetails.backdrop_path !== null ? `https://image.tmdb.org/t/p/original${showDetails.backdrop_path}` : ""} alt="" />
        <div className="show-details-inner">
          <h1>{showDetails.name}</h1>
          <div className="description">{showDetails.overview}</div>
          {
            props.watchlist.find(item => item.id == id) === undefined ?
            <button className="add-to-watchlist" onClick={() => props.toggleWatchlist(showDetails)}>+ Add to watch list</button>
            :
            <button className="remove-to-watchlist" onClick={() => props.toggleWatchlist(showDetails)}>- Remove from watch list</button>
          }
        </div>
      </div>
    </>
  );
}

export default Details;