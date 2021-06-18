import { useState, useEffect, useContext, useRef, useCallback } from "react";
import axios from "axios";
import { ServiceActionsContext } from "../../Contexts/ServiceContext";
import {
  MoviesListSearchContext,
  MoviesListSearchActionsContext
} from "../../Contexts/MoviesListContext";

export const useMoviesListHooks = (props: any) => {
  const signal = axios.CancelToken.source();
  const {
    match: { params },
    history
  } = props;
  const observer = useRef<any>(null);
  const { moviesListSearch } = useContext(MoviesListSearchContext);
  const { fillMoviesListSearch, fillMoviesListSearchTotal } = useContext(
    MoviesListSearchActionsContext
  );
  const { getAxios } = useContext(ServiceActionsContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);

  const lastElementRef = useCallback(
    node => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const toMovieDetail = async (data: any) => {
    const { imdbID } = data;
    const combinedUrl = "&i=" + imdbID;
    history.push("/movie-detail/" + combinedUrl);
  };

  const getMovieList = async (param: string) => {
    setIsLoading(true);
    try {
      const { data } = await getAxios("&" + param, signal.token);
      if (data.Response !== "False") {
        const newMoviesListArr = [...moviesListSearch, ...data.Search];
        setHasMore(newMoviesListArr.length < data.totalResults);
        fillMoviesListSearchTotal(data.totalResults);
        setIsLoading(false);
        return fillMoviesListSearch(newMoviesListArr);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!moviesListSearch.length) {
      const paramUrl = params.params + "&page=" + pageNum;
      getMovieList(paramUrl);
    } else {
      setHasMore(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pageNum > 1) {
      const paramUrl = params.params + "&page=" + pageNum;
      getMovieList(paramUrl);
    }
  }, [pageNum]);

  const moviesListHooksValue = {
    lastElementRef,
    isLoading,
    toMovieDetail,
    moviesListSearch
  };

  return moviesListHooksValue;
};
