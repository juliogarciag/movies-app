import qs from "qs";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "f4f0761161c9b775480c5b3a1a934fe2";

export async function fetchMovies() {
  const response = await fetch(
    buildUrl("/discover/movie", { sort_by: "popularity.desc" })
  );
  const { results } = await response.json();
  return results;
}

export async function searchMovies(query) {
  const response = await fetch(buildUrl("/search/movie", { query }));
  const { results } = await response.json();
  return results;
}

export async function getMovie(id) {
  const response = await fetch(buildUrl(`/movie/${id}`));
  return await response.json();
}

function buildUrl(path, givenParams = {}) {
  const queryLessUrl = `${BASE_URL}${path}`;
  let queryParams = {};

  if (Object.keys(givenParams).length > 0) {
    queryParams = { ...queryParams, ...givenParams };
  }

  const queryString = qs.stringify({
    api_key: API_KEY,
    ...queryParams,
  });

  return `${queryLessUrl}?${queryString}`;
}
