import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie } from "./moviesApi";
import Loading from "./Loading";

function MoviePage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovie(id).then((movie) => {
      setMovie(movie);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="p-2 bg-gray-200 h-screen">
        <Link to="/" className="underline">
          Go back to Discover
        </Link>
        <div className="mt-4">
          <img
            alt={`Backdrop for ${movie.title}`}
            src={`https://image.tmdb.org/t/p/w400/${movie.backdrop_path}`}
          />
          <h1 className="text-3xl">{movie.original_title}</h1>
          <h2 className="text-2xl text-gray-700">
            <em>{movie.tagline}</em>
          </h2>
          <div>
            <span>Score: </span>
            <strong className="text-xl">{movie.vote_average}</strong>
          </div>
          <p className="mt-2 w-1/2">{movie.overview}</p>
        </div>
      </div>
    );
  }
}

export default MoviePage;
