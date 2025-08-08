import axios from "axios";
import type { Movie } from "../types/movie";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_API_KEY
}`;

const url: string =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

interface GetMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export default async function fetchMovies(
  title: string,
  page: number
): Promise<GetMoviesResponse> {
  const response = await axios.get<GetMoviesResponse>(`${url}`, {
    params: {
      page,
      query: title,
    },
  });
  return response.data;
}
