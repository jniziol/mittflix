import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");

  const search = e => {
    e.preventDefault();
    history.push({
      pathname: "/search",
      search: `query=${searchInput}`
    });
  }

  return (
    <header className="header">
      <Link to="/">
        <img
          src="https://fontmeme.com/permalink/190707/fd4735271a0d997cbe19a04408c896fc.png"
          alt="netflix-font"
          border="0"
        />
      </Link>
      <div id="navigation" className="navigation">
        <nav>
          <ul>
            <li><Link to="/my-watch-list">Watch List</Link></li>
          </ul>
        </nav>
      </div>
      <form id="search" className="search" onSubmit={search}>
        <input type="search" placeholder="Search for a title..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
        <div className="searchResults"></div>
      </form>
    </header>
  );

}

export default Header;