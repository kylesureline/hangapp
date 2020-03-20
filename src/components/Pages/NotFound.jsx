import React from "react";
import DocumentTitle from "react-document-title";

export const NotFound = () => (
  <DocumentTitle title={`${process.env.REACT_APP_NAME} | Page Not Found`}>
    <main>404</main>
  </DocumentTitle>
);
