import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { saveToLS } from "../utils";
import { ServiceWorker } from "./ServiceWorker";

export const Database = ({ children }) => {
  const settings = useSelector(state => state.settings);

  // sync settings to localStorage
  useEffect(() => {
    saveToLS("settings", settings);
  }, [settings]);

  return <ServiceWorker>{children}</ServiceWorker>;
};
