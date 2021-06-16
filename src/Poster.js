import React from 'react';
import { Link } from 'react-router-dom';

const Poster = (props) => {
  const posterPath = props.show.poster_path === null ? "image-not-available.jpg" : "https://image.tmdb.org/t/p/w500" + props.show.poster_path;

  return (
    <div className="movie">
      <Link to={`/details/${props.show.id}`}>
        <img src={posterPath} alt="Movie poster" />
        <div className="overlay">
          <div className="title">{props.show.name}</div>
          <div className="rating">{props.show.vote_average}/10</div>
          <div className="plot">{props.show.overview}</div>
        </div>
      </Link>
      <div data-toggled={!!props.watchlist.find(item => item.id === props.show.id)} className="listToggle" onClick={() => props.toggleWatchlist(props.show)}>
        <div>
          <i className="fa fa-fw fa-plus"></i>
          <i className="fa fa-fw fa-check"></i>
        </div>
      </div>
    </div>
  );
}

export default Poster;
