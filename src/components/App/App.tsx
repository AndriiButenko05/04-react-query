import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import css from "./App.module.css";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [title, setTitle] = useState<string>("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", title, currentPage],
    queryFn: () => fetchMovies(title, currentPage),
    enabled: title !== "",
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.total_pages || 0;
  function handleSearch(title: string) {
    setCurrentPage(1);
    if (data?.results.length === 0) {
      toast.error("No movies found");
      return;
    }
    setTitle(title);
  }
  function openModal(movie: Movie) {
    setMovie(movie);
  }
  function closeModal() {
    setMovie(null);
  }
  return (
    <div>
      <SearchBar onSubmit={handleSearch}></SearchBar>
      <Toaster position="top-center" reverseOrder={false} />
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isLoading && <Loader></Loader>}
      {isError && <ErrorMessage></ErrorMessage>}
      {data && <MovieGrid movies={data.results} onSelect={openModal} />}
      {movie && <MovieModal onClose={closeModal} movie={movie} />}
    </div>
  );
}
