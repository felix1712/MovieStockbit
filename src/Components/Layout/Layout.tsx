import React, { Suspense, useRef } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import DefaultRoute from "../DefaultRoute/DefaultRoute";

const Home = React.lazy(() =>
  import("../../Pages/Home/Home").then(module => ({
    default: module.Home
  }))
);

const MoviesList = React.lazy(() =>
  import("../../Pages/MoviesList/MoviesList").then(module => ({
    default: module.MoviesList
  }))
);

const MovieDetail = React.lazy(() =>
  import("../../Pages/MovieDetail/MovieDetail").then(module => ({
    default: module.MovieDetail
  }))
);

const LayoutDesktop = () => {
  const containerWrapper = useRef(null);
  const RootApp = (props: any) => (
    <Redirect
      {...props}
      to={{
        pathname: "/home"
      }}
    />
  );
  return (
    <div>
      <Router>
        <Suspense fallback="Loading...">
          <div id="containerWrapper" ref={containerWrapper}>
            <div id="desktopContainer">
              <Switch>
                <DefaultRoute
                  exact
                  path="/"
                  component={(props: any) => <RootApp {...props} />}
                  metaTitle="Home"
                />
                <DefaultRoute
                  path="/home"
                  component={(props: any) => <Home {...props} />}
                  metaTitle="Home"
                />
                <DefaultRoute
                  exact
                  path="/movies-list/:params?"
                  component={(props: any) => <MoviesList {...props} />}
                  metaTitle="Movies List"
                />
                <DefaultRoute
                  exact
                  path="/movie-detail/:paramDetails?"
                  component={(props: any) => <MovieDetail {...props} />}
                  metaTitle="Movies Detail"
                />
              </Switch>
            </div>
          </div>
        </Suspense>
      </Router>
    </div>
  );
};

export default LayoutDesktop;
