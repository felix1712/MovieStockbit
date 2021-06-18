import { HomeHooks } from "./HomeHooks";
import appConfig from "../../config/application";

export const Home = (props: any) => {
  console.log(appConfig);
  if (appConfig.environment === "context") {
    return <HomeHooks {...props} />;
  }
  // redux component here
  return null;
};
