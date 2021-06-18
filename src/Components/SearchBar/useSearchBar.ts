import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ServiceActionsContext } from "../../Contexts/ServiceContext";
import {
  MoviesListSearchContext,
  MoviesListSearchActionsContext
} from "../../Contexts/MoviesListContext";
import { ToasterActionsContext } from "../../Contexts/ToasterContext";

export const useSearchBar = (props: any) => {
  const signal = axios.CancelToken.source();
  const { history } = props;
  const { getAxios } = useContext(ServiceActionsContext);
  const { moviesListSearch } = useContext(MoviesListSearchContext);
  const { fillMoviesListSearch, fillMoviesListSearchTotal } = useContext(
    MoviesListSearchActionsContext
  );
  const { addToastr } = useContext(ToasterActionsContext);
  const [singleSearchInput, setSingleSearchInput] = useState<string>("");
  const [selectedOptionSearch, setSelectedOptionSearch] = useState<string>(
    "Title"
  );
  const [selectedOptionValue, setSelectedOptionValue] = useState<string>(
    "title"
  );
  const [moviesResponse, setMoviesResponse] = useState<any>([]);
  const [moviesSuggestion, setMoviesSuggestion] = useState<any>([]);
  const [isSuggestion, setIsSuggestion] = useState<boolean>(false);
  const searchOption = [
    {
      label: "Title",
      value: "title"
    },
    {
      label: "ID",
      value: "id"
    }
  ];
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeSingleSearchInput = (data: string) => {
    setSingleSearchInput(data);
    setIsSuggestion(true);
  };

  const leaveInput = () => {
    setIsSuggestion(false);
  };

  const handleChangeSelectOption = (data: string, dataLabel?: any) => {
    setSelectedOptionValue(data);
    setMoviesResponse([]);
    setMoviesSuggestion([]);
  };

  const submitMovie = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setIsSuggestion(false);
    const data = await searchMovies();
    fillMoviesListSearchTotal(data.totalResults);
    return fillMoviesListSearch(data.Search);
  };

  const searchMovies = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    const advancedSearchUrl = "";
    const singleSearchUrl =
      selectedOptionValue === "title"
        ? "&s=" + singleSearchInput + "&page=1"
        : "&i=" + singleSearchInput + "&page=1";
    const combinedUrl = singleSearchInput ? singleSearchUrl : advancedSearchUrl;
    try {
      const { data } = await getAxios(combinedUrl, signal.token);
      if (data.Response !== "False") {
        setIsLoading(false);
        if (!data.Search) {
          setMoviesResponse(new Array(data));
          return data;
        }
        setMoviesResponse(data.Search);
        return data;
      } else {
        addToastr("Gagal", "Gagal menemukan film", "danger");
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
    // if with no advanced search
    const timeout = setTimeout(() => {
      if (!!singleSearchInput && singleSearchInput.length > 2) {
        searchMovies();
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [singleSearchInput]);

  useEffect(() => {
    if (!!moviesResponse.length) {
      const maxSuggestion =
        moviesResponse.length > 5 ? 5 : moviesResponse.length;
      const moviesSuggestionSlice = moviesResponse.slice(0, maxSuggestion);
      setMoviesSuggestion(moviesSuggestionSlice);
    }
  }, [moviesResponse]);

  useEffect(() => {
    if (!!moviesListSearch.length && !!moviesResponse.length) {
      const singleSearchUrl =
        selectedOptionValue === "title"
          ? "s=" + singleSearchInput
          : "i=" + singleSearchInput;
      history.push("/movies-list/" + singleSearchUrl);
    }
  }, [moviesListSearch, moviesResponse]);

  useEffect(() => {
    if (!singleSearchInput.length) {
      setIsSuggestion(false);
    }
  }, [singleSearchInput]);

  const searchBarValue: any = {
    isLoading,
    singleSearchInput,
    searchOption,
    selectedOptionSearch,
    setSelectedOptionSearch,
    handleChangeSelectOption,
    onChangeSingleSearchInput,
    leaveInput,
    moviesSuggestion,
    isSuggestion,
    toMovieDetail,
    submitMovie
  };

  return searchBarValue;
};
