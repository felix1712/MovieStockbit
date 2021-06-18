import React, { useState, useContext, IChildrenOnly } from "react";

interface IMoviesListSearchContext {
  moviesListSearch: any;
  moviesListSearchTotal: number;
}

interface IMoviesListSearchActionsContext {
  fillMoviesListSearch: (data: any) => void;
  fillMoviesListSearchTotal: (data: string) => void;
}
const IMoviesListSearchContextProperties = {
  moviesListSearch: null,
  moviesListSearchTotal: 0
};

const IMoviesListSearchActionsContextProperties = {
  fillMoviesListSearch: () => {},
  fillMoviesListSearchTotal: () => {}
};

export const MoviesListSearchContext = React.createContext<
  IMoviesListSearchContext
>(IMoviesListSearchContextProperties);
export const MoviesListSearchActionsContext = React.createContext<
  IMoviesListSearchActionsContext
>(IMoviesListSearchActionsContextProperties);

const MoviesListProvider = (props: IChildrenOnly) => {
  const { children } = props;
  const [moviesListSearch, setMoviesListSearch] = useState<any>([]);
  const [moviesListSearchTotal, setMoviesListSearchTotal] = useState<number>(0);

  const fillMoviesListSearch = (data: any) => {
    if (Array.isArray(data)) {
      setMoviesListSearch(data);
      return true;
    }

    return false;
  };

  const fillMoviesListSearchTotal = (data: string) => {
    setMoviesListSearchTotal(parseInt(data));
  };

  const moviesListSearchValue = { moviesListSearch, moviesListSearchTotal };

  const moviesListSearchActionsValue = {
    fillMoviesListSearch,
    fillMoviesListSearchTotal
  };

  return (
    <MoviesListSearchContext.Provider value={moviesListSearchValue}>
      <MoviesListSearchActionsContext.Provider
        value={moviesListSearchActionsValue}
      >
        {children}
      </MoviesListSearchActionsContext.Provider>
    </MoviesListSearchContext.Provider>
  );
};

export default MoviesListProvider;
