import React from "react";
import { useMovieDetailHooks } from "./useMovieDetailHooks";
import { Text } from "../../Components/Text/Text";
import { Popup } from "../../Components/Popup/Popup";
import { ImageTag } from "../../Components/ImageTag/ImageTag";
import { Header } from "../../Components/Header/Header";
import styles from "./MovieDetail.module.css";
import imdb from "../../assets/icons/imdb.png";
import rt from "../../assets/icons/rt.png";
import mc from "../../assets/icons/mc.svg";

const RatingComponent = (props: any) => {
  const { source, value, key } = props;
  return (
    <div className={styles["detail_rating"]} key={key}>
      <img
        src={
          source === "Internet Movie Database"
            ? imdb
            : source === "Rotten Tomatoes"
            ? rt
            : mc
        }
        alt={source}
      />
      <Text>{value}</Text>
    </div>
  );
};

export const MovieDetailHooks = (props: any) => {
  const { modalOpen, movieDetail, handleModal } = useMovieDetailHooks(props);
  return (
    <div data-cy="movie_detail_frame">
      <Header {...props} />
      <div className="desktop-boxed">
        <div className={styles["movie_detail_container"]}>
          <div className={styles["detail_top_section"]}>
            <div
              className={styles["top_detail_poster"]}
              data-cy="detail_poster"
            >
              <ImageTag
                src={movieDetail.Poster}
                alt={movieDetail.Title}
                onClick={handleModal}
              />
            </div>
            <div className={styles["top_detail_reviews"]}>
              <div
                className={styles["top_detail_header"]}
                data-cy="detail_title"
              >
                <Text variant="h1">
                  {movieDetail.Title}
                  <span>( {movieDetail.Year} )</span>
                </Text>
              </div>
              <div
                className={styles["top_detail_subheader"]}
                data-cy="detail_genre"
              >
                <Text>{movieDetail.Runtime}</Text>
                <Text>{movieDetail.Genre}</Text>
              </div>
              <div className={styles["detail_content"]}>
                <Text>{movieDetail.Plot}</Text>
                <div className={styles["detail_content_information"]}>
                  <ul className={styles["pair_text_container"]}>
                    <li className={styles["pair_text"]}>
                      <span className={styles["pair_text_label"]}>Rating </span>{" "}
                      <span className={styles["pair_text_multiline"]}>
                        {movieDetail.Rated || "-"}
                      </span>
                    </li>
                    <li className={styles["pair_text"]}>
                      <span className={styles["pair_text_label"]}>
                        Language{" "}
                      </span>{" "}
                      <span className={styles["pair_text_multiline"]}>
                        {movieDetail.Language || "-"}
                      </span>
                    </li>
                    <li className={styles["pair_text"]}>
                      <span className={styles["pair_text_label"]}>
                        Directed By{" "}
                      </span>{" "}
                      <span className={styles["pair_text_multiline"]}>
                        {movieDetail.Director || "-"}
                      </span>
                    </li>
                    <li className={styles["pair_text"]}>
                      <span className={styles["pair_text_label"]}>
                        Written By{" "}
                      </span>{" "}
                      <span className={styles["pair_text_multiline"]}>
                        {movieDetail.Writer || "-"}
                      </span>
                    </li>
                    <li className={styles["pair_text"]}>
                      <span className={styles["pair_text_label"]}>
                        Production By{" "}
                      </span>{" "}
                      <span className={styles["pair_text_multiline"]}>
                        {movieDetail.Production || "-"}
                      </span>
                    </li>
                    <li className={styles["pair_text"]}>
                      <span className={styles["pair_text_label"]}>
                        Release Date{" "}
                      </span>{" "}
                      <span className={styles["pair_text_multiline"]}>
                        {movieDetail.Released || "-"}
                      </span>
                    </li>
                    <li className={styles["pair_text"]}>
                      <span className={styles["pair_text_label"]}>
                        Box Office{" "}
                      </span>{" "}
                      <span className={styles["pair_text_multiline"]}>
                        {movieDetail.BoxOffice || "-"}
                      </span>
                    </li>
                    <li className={styles["pair_text"]}>
                      <span className={styles["pair_text_label"]}>Awards </span>{" "}
                      <span className={styles["pair_text_multiline"]}>
                        {movieDetail.Awards || "-"}
                      </span>
                    </li>
                    <li className={styles["pair_text"]}>
                      <span className={styles["pair_text_label"]}>Cast</span>
                      <span className={styles["pair_text_multiline"]}>
                        {movieDetail.Actors || "-"}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className={styles["detail_review_container"]}>
                  {!!movieDetail.Ratings &&
                    movieDetail.Ratings.map((data: any, index: number) => (
                      <div key={index}>
                        <RatingComponent
                          source={data.Source}
                          value={data.Value}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          {modalOpen && (
            <Popup closePopup={handleModal} contentImage={movieDetail.Poster} />
          )}
        </div>
      </div>
    </div>
  );
};
