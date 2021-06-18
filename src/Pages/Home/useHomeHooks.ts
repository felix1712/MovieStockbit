import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ServiceActionsContext } from "../../Contexts/ServiceContext";

export const useHomeHooks = (props: any) => {
  const { history } = props;
  const signal = axios.CancelToken.source();
  const { getAxios } = useContext(ServiceActionsContext);
  const [moviesResponse, setMoviesResponse] = useState<any>([]);

  const searchMovies = async () => {
    const combinedUrl = "&s=you&y=2021&page=1";
    try {
      const { data } = await getAxios(combinedUrl, signal.token);
      if (data.Response !== "False") {
        setMoviesResponse(data.Search);
        return data;
      }
    } catch (error) {
      throw error;
    }
    return false;
  };

  const toMovieDetail = (data: any) => {
    const { imdbID } = data;
    const combinedUrl = "&i=" + imdbID;
    history.push("/movie-detail/" + combinedUrl);
  };

  useEffect(() => {
    setMoviesResponse([]);
    searchMovies();
  }, []);

  const homeHooksValue: any = {
    moviesResponse,
    toMovieDetail
  };

  return homeHooksValue;
};
