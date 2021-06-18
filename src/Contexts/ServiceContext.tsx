import React, { IChildrenOnly, IServiceActionsContext } from "react";
import axios, { AxiosRequestConfig, CancelToken } from "axios";

const IServiceContextProperties = {
  getAxios: () => {},
  postAxios: () => {},
  javaLogger: () => {},
  insertLogActivity: () => {}
};

export const ServiceActionsContext = React.createContext<
  IServiceActionsContext
>(IServiceContextProperties);

const ServiceProvider = (props: IChildrenOnly) => {
  const { children } = props;

  const endpointUrl = (url: string) => {
    return "http://www.omdbapi.com?apikey=faf7e5bb" + url;
  };

  const getAxios = async (
    url: string,
    cancelToken: CancelToken,
    arrayBuffer?: string
  ) => {
    let config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json"
      },
      cancelToken
    };

    if (!!arrayBuffer) config.responseType = "arraybuffer";

    const combinedUrl = endpointUrl(url)!;

    try {
      const response = await axios.get(combinedUrl, config);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const postAxios = async (
    url: string,
    payload: any,
    cancelToken: CancelToken
  ) => {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json"
      },
      cancelToken
    };

    if (!payload) payload = {};

    const combinedUrl = endpointUrl(url)!;

    try {
      const response = await axios.post(combinedUrl, payload, config);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const serviceActionsValue = {
    getAxios,
    postAxios
  };

  return (
    <ServiceActionsContext.Provider value={serviceActionsValue}>
      {children}
    </ServiceActionsContext.Provider>
  );
};

export default ServiceProvider;
