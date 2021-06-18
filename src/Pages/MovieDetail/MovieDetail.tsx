import { MovieDetailHooks } from "./MovieDetailHooks";
import appConfig from "../../config/application";

export const MovieDetail = (props: any) => {
  if (appConfig.environment === "context") {
    return <MovieDetailHooks {...props} />;
  }
  // redux component here
  return null;
};
