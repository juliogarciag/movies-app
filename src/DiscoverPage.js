import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchMovies, searchMovies } from "./moviesApi";
import Loading from "./Loading";

function MovieItem({ movie: { id, original_title, vote_average } }) {
  return (
    <Link to={`/movies/${id}`}>
      <h2>{original_title}</h2>
      <p>{vote_average}</p>
    </Link>
  );
}

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="search" value={query} onChange={handleChange} />
      </form>
    </div>
  );
}

const starOn = "★";
const starOff = "☆";

function StarFilter({ starFilter, onFilter }) {
  const stars = starFilter || 0;
  const oneToFive = [1, 2, 3, 4, 5];

  const selectStar = (star) => {
    if (starFilter === star) {
      onFilter(null);
    } else {
      onFilter(star);
    }
  };

  return (
    <div>
      {oneToFive.map((star) => (
        <span key={star} onClick={() => selectStar(star)}>
          {stars >= star ? starOn : starOff}
        </span>
      ))}
    </div>
  );
}

function starsToRatingRange(stars) {
  const right = stars * 2;
  const left = right - 2;
  return [left, right];
}

function DiscoverPage() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentStarFilter, setCurrentFilter] = useState(null);

  const handleSearch = (query) => {
    const loadMovies =
      !query || query.trim() === "" ? fetchMovies : searchMovies;

    setLoading(true);
    loadMovies(query).then((movies) => {
      setMovies(movies);
      setLoading(false);
    });
  };

  const filteredMovies = useMemo(() => {
    if (currentStarFilter === null) {
      return movies;
    } else {
      const [leftRating, rightRating] = starsToRatingRange(currentStarFilter);
      return movies.filter(({ vote_average }) => {
        return vote_average > leftRating && vote_average <= rightRating;
      });
    }
  }, [movies, currentStarFilter]);

  useEffect(() => {
    setLoading(true);
    fetchMovies().then((movies) => {
      setMovies(movies);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <StarFilter starFilter={currentStarFilter} onFilter={setCurrentFilter} />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {filteredMovies.length === 0 && <div>No movies found</div>}
          {filteredMovies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DiscoverPage;
