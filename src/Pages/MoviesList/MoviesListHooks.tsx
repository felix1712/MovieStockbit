import React from "react";
import { useMoviesListHooks } from "./useMoviesListHooks";
import { Header } from "../../Components/Header/Header";
import { MoviePoster } from "../../Components/MoviePoster/MoviePoster";
import styles from "./MoviesList.module.css";
import { LoaderPartial } from "../../Components/LoaderPartial/LoaderPartial";

export const MoviesListHooks = (props: any) => {
  const {
    lastElementRef,
    isLoading,
    toMovieDetail,
    moviesListSearch
  } = useMoviesListHooks(props);
  return (
    <div data-cy="movies_list_frame">
      <Header {...props} />
      <div className="desktop-boxed">
        <div
          className={styles["movies_list_container"]}
          data-cy="movies_list_container"
        >
          {moviesListSearch.map((data: any, index: number) => (
            <div
              onClick={() => toMovieDetail(data)}
              key={index}
              ref={
                moviesListSearch.length === index + 1 ? lastElementRef : null
              }
              className={styles["movies_list_item"]}
              data-cy={"list_item_" + index}
            >
              <MoviePoster
                poster={data.Poster}
                title={data.Title}
                type={data.Type}
                year={data.Year}
              />
            </div>
          ))}
        </div>
        <div className={styles["loader_container"]}>
          {isLoading && <LoaderPartial />}
        </div>
      </div>
    </div>
  );
};
