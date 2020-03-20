import React from "react";
import { render as testingLibraryRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "../store/configureStore";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

const TestProvider = ({ store, children }) => (
  <Provider store={store}>{children}</Provider>
);

// for basic snapshots
export const snapshotRender = (jsx, { store }) =>
  toJson(mount(<TestProvider store={store}>{jsx}</TestProvider>));

// for interacting with the component
export const testRender = (jsx, { store, ...otherOpts }) =>
  testingLibraryRender(
    <TestProvider store={store}>{jsx}</TestProvider>,
    otherOpts
  );

export const configureTestStore = (opts = {}) => {
  const store = configureStore(opts);
  const origDispatch = store.dispatch;
  store.dispatch = jest.fn(origDispatch);
  return store;
};
