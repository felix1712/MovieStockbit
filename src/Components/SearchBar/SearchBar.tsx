import React from "react";
import { useSearchBar } from "./useSearchBar";
import { InputText } from "../InputText/InputText";
import { Select } from "../Select/Select";
import { Text } from "../Text/Text";
import { ImageTag } from "../ImageTag/ImageTag";
import { LoaderPartial } from "../LoaderPartial/LoaderPartial";
import searchIcon from "../../assets/icons/search.svg";
import styles from "./SearchBar.module.css";

export const SearchBar = (props: any) => {
  const {
    isLoading,
    singleSearchInput,
    searchOption,
    submitMovie,
    handleChangeSelectOption,
    onChangeSingleSearchInput,
    leaveInput,
    isSuggestion,
    toMovieDetail,
    moviesSuggestion
  } = useSearchBar(props);
  return (
    <div className={styles["search_frame"]}>
      <form onSubmit={e => submitMovie(e)}>
        <div className={styles["search_bar_container"]}>
          <div className={styles["search_bar_select"]}>
            <Select
              option={searchOption}
              selected={(data: any) => handleChangeSelectOption(data)}
            />
          </div>
          <div className={styles["search_bar_input"]}>
            <InputText
              placeholder="Enter your movie title"
              id="movie"
              value={singleSearchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeSingleSearchInput(e.target.value)
              }
              onBlur={leaveInput}
              cy="input_search"
            />
            <span
              className={styles["search_bar_icon"]}
              onClick={e => submitMovie(e)}
            >
              <img src={searchIcon} alt="search" onClick={undefined} />
            </span>
          </div>
        </div>
      </form>
      <div>
        {isSuggestion && (
          <div
            className={styles["search_suggestion_container"]}
            data-cy="search_suggestion_container"
          >
            {moviesSuggestion.map((data: any, index: number) => (
              <div
                className={styles["suggestion_item"]}
                key={index}
                onClick={() => toMovieDetail(data)}
                data-cy={"suggestion_item_" + index}
              >
                <div className={styles["suggestion_poster"]}>
                  <ImageTag src={data.Poster} alt={data.Title} />
                </div>
                <div className={styles["suggestion_description"]}>
                  <div className={styles["suggestion_title"]}>
                    <Text>{data.Title}</Text>
                  </div>
                  <div className={styles["suggestion_subtitle"]}>
                    <Text>{data.Type}</Text>
                    <Text>{data.Year}</Text>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={styles["loader_suggestion"]}>
                <LoaderPartial />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
