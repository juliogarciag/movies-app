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
      <div>
        <Link to="/">Go back to Discover</Link>
        <div>
          <h1>{movie.original_title}</h1>
          <p>{movie.overview}</p>
        </div>
      </div>
    );
  }
}

export default MoviePage;
