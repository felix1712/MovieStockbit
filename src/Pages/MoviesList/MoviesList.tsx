import { MoviesListHooks } from "./MoviesListHooks";
import appConfig from "../../config/application";

export const MoviesList = (props: any) => {
  if (appConfig.environment === "context") {
    return <MoviesListHooks {...props} />;
  }
  // redux component here
  return null;
};
