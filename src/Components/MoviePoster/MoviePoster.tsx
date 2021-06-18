import React from "react";
import { Text } from "../Text/Text";
import { ImageTag } from "../ImageTag/ImageTag";
import styles from "./MoviePoster.module.css";

interface IMoviePoster {
  poster?: string;
  title: string;
  type?: string;
  year?: string;
}

export const MoviePoster = (props: IMoviePoster) => {
  const { poster, title, type, year } = props;

  return (
    <>
      <div className={styles["item_poster_container"]}>
        <ImageTag src={poster} alt={title} />
      </div>
      <div className={styles["item_description"]}>
        <Text bold>{title}</Text>
        <div className={styles["item_subdescription"]}>
          <Text variant="subtitle">{type}</Text>
          <Text variant="subtitle" bold>
            {year}
          </Text>
        </div>
      </div>
    </>
  );
};
