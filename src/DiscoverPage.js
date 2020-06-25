import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchMovies, searchMovies } from "./moviesApi";
import Loading from "./Loading";

function MovieItem({ movie: { id, title, vote_average, backdrop_path } }) {
  return (
    <Link to={`/movies/${id}`}>
      <div
        className="relative"
        style={{
          width: "400px",
          height: "200px",
          backgroundImage: `url(https://image.tmdb.org/t/p/w400/${backdrop_path})`,
        }}
      >
        <div className="absolute inset-x-0 bottom-0 bg-gray-700 bg-opacity-75 p-2">
          <h2
            className="text-gray-100"
            style={{
              textOverflow: "ellipsis",
              maxHeight: "72px",
              overflow: "hidden",
            }}
          >
            {title}
          </h2>
          <p className="text-white font-bold">{vote_average}</p>
        </div>
      </div>
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
    <div className="p-2">
      <form onSubmit={handleSubmit}>
        <label className="p-2" htmlFor="search-input">
          Search movies:
        </label>
        <input
          id="search-input"
          className="rounded-md pl-1 pr-1"
          type="text"
          value={query}
          onChange={handleChange}
        />
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
        <button
          className="mr-1"
          style={{
            outline: "none",
          }}
          key={star}
          onClick={() => selectStar(star)}
        >
          {stars >= star ? starOn : starOff}
        </button>
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
      <div className="bg-gray-300 flex items-center">
        <SearchBar onSearch={handleSearch} />
        <StarFilter
          starFilter={currentStarFilter}
          onFilter={setCurrentFilter}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {filteredMovies.length === 0 && <div>No movies found</div>}
          <div className="flex flex-wrap">
            {filteredMovies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default DiscoverPage;
