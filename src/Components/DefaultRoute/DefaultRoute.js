import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const DefaultRoute = ({ component: Component, ...rest }) => {
  const useUpdateRoute = () => {
    window.scrollTo(0, 0);
    // document.title = `${rest.metaTitle} - Movies Stockbit | PT. Stockbit`;
  };

  useEffect(useUpdateRoute, [rest.location.pathname]);

  return <Route {...rest} render={props => <Component {...props} />} />;
};

DefaultRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default DefaultRoute;
