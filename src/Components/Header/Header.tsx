import React from "react";
import { NavLink } from "react-router-dom";
import { Text } from "../Text/Text";
import { SearchBar } from "../SearchBar/SearchBar";
import styles from "./Header.module.css";

export const Header = (props: any) => {
  return (
    <header className={styles["main-header"]}>
      <div className={styles["header-container"]}>
        <NavLink to="/home">
          <Text>MoviesStockbit</Text>
        </NavLink>
        <div className={styles["header-searchbar"]}>
          <SearchBar {...props} />
        </div>
      </div>
    </header>
  );
};
