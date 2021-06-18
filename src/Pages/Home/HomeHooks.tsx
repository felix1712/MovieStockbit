import React, { FC } from "react";
import { useHomeHooks } from "./useHomeHooks";
import { SearchBar } from "../../Components/SearchBar/SearchBar";
import { Text } from "../../Components/Text/Text";
import { MoviePoster } from "../../Components/MoviePoster/MoviePoster";
import styles from "./Home.module.css";

export const HomeHooks: FC<any> = (props: any) => {
  const { moviesResponse, toMovieDetail } = useHomeHooks(props);
  return (
    <div>
      <div className={styles["full_landing_page"]}>
        <div className={styles["landing_page_title"]}>
          <Text variant="h1">
            Find <b>Perfect</b> Movies For You
          </Text>
        </div>
        <div className={styles["landing_page_search"]}>
          <SearchBar {...props} />
        </div>
      </div>
      <div className="desktop-boxed">
        <div className={styles["new_relese_movie"]}>
          <Text variant="h3">New Release</Text>
          <div className={styles["home_movies_list"]}>
            {moviesResponse.map((data: any, index: number) => (
              <div
                className={styles["movies_list_item"]}
                key={index}
                onClick={() => toMovieDetail(data)}
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
        </div>
      </div>
    </div>
  );
};
