import React from "react";

import ServiceProvider from "./Contexts/ServiceContext";
import MoviesListProvider from "./Contexts/MoviesListContext";
import ToasterProvider from "./Contexts/ToasterContext";
import Layout from "./Components/Layout/Layout";

const AppHooks = () => (
  <ToasterProvider>
    <ServiceProvider>
      <MoviesListProvider>
        <Layout />
      </MoviesListProvider>
    </ServiceProvider>
  </ToasterProvider>
);

export default AppHooks;
