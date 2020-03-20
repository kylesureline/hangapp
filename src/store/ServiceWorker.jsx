import { useEffect } from "react";
import * as serviceWorker from "../serviceWorker";

export const ServiceWorker = ({ children }) => {
  const handleNewVersion = () => {
    global.alert(
      `You've downloaded a new version of this app. Please restart to update.`
    );
  };

  useEffect(() => {
    serviceWorker.register(undefined, handleNewVersion);
  }, []);

  return children;
};
