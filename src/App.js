import React, { useEffect, useState } from "react";
import Poster from "./Poster";
import Details from "./Details";
import Header from "./Header.js";
import { Switch, Route } from 'react-router-dom';
import Search from './Search';

const App = () => {
  const API_KEY = "0b941991fb739be72fed42ae5e2a4891";
  const providers = [
    {name: "Netflix", id: 8},
    {name: "Crave", id: 230},
    {name: "Disney", id: 337},
    {name: "Apple Plus", id: 350},
  ]

  const [shows, setShows] = useState(providers.map(provider => ({ name: provider.name, shows: [] })));
  const [watchlist, setWatchlist] = useState(JSON.parse(window.localStorage.getItem('watchlist')) || []);

  useEffect(() => {
    const loadShows = async () => {
      const shows = await Promise.all(
        providers.map(async provider => {
          const response = await fetch(`https://api.themoviedb.org/3/discover/tv?&sort_by=popularity.desc&with_watch_providers=${provider.id}&watch_region=CA&api_key=${API_KEY}`)
          const shows = await response.json()
          return {shows: shows.results, name: provider.name}
        })
      );

      setShows(shows);
    };

    loadShows();
  }, []);

  const toggleWatchlist = (show) => {
    setWatchlist(currentList => {
      const foundShow = currentList.find(item => item.id === show.id);
      let newState;

      if (foundShow) {
        newState = currentList.filter(item => item.id !== show.id)
      } else {
        newState = [...currentList, show]
      }

      localStorage.setItem('watchlist', JSON.stringify(newState))
      return newState
    })

  }

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          {shows.map(provider => (
            <div key={provider.name} className="titleList">
              <div className="title">
                <h1>{provider.name}</h1>
                <div className="titles-wrapper">
                  {provider.shows.map(show => (
                    <Poster show={show} key={show.id + show.name} toggleWatchlist={toggleWatchlist} watchlist={watchlist}/>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Route>

        <Route path="/details/:id">
          <Details toggleWatchlist={toggleWatchlist} watchlist={watchlist}/>
        </Route>

        <Route path="/search">
          <Search toggleWatchlist={toggleWatchlist} watchlist={watchlist}/>
        </Route>

        <Route path="/my-watch-list">
          <div className="titleList">
            <div className="title">
              <h1>My Watch List</h1>
              <div className="titles-wrapper">
                {watchlist.map(show => (
                  <Poster show={show} key={show.id + show.name} toggleWatchlist={toggleWatchlist} watchlist={watchlist}/>
                ))}
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </>
  );
};

export default App;
