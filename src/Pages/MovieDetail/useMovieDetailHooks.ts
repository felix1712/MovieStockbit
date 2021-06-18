import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ServiceActionsContext } from "../../Contexts/ServiceContext";

export const useMovieDetailHooks = (props: any) => {
  const {
    match: { params }
  } = props;
  const signal = axios.CancelToken.source();
  const { getAxios } = useContext(ServiceActionsContext);
  const [movieDetail, setMovieDetail] = useState<any>({});
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const getDetailMovie = async () => {
    try {
      const { data } = await getAxios(params.paramDetails, signal.token);
      if (data.Response !== "False") {
        return setMovieDetail(data);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };
  const movieDetailHooksValue = {
    modalOpen,
    handleModal,
    movieDetail
  };

  useEffect(() => {
    if (params) {
      getDetailMovie();
    }
  }, []);

  return movieDetailHooksValue;
};
