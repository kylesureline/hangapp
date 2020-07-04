import React from "react";
import { testRender, configureTestStore } from "../../../tests/testUtils";
import { fireEvent, cleanup } from "@testing-library/react";
import { Mode } from "./Mode";

afterEach(cleanup);

describe("<Mode />", () => {
  let store;
  beforeEach(() => {
    store = configureTestStore();
  });
  it("renders correctly", () => {
    const options = ["dictionary", "categories"];
    const selectedOption = "dictionary";
    const onChange = jest.fn();

    const { queryByText } = testRender(
      <Mode
        options={options}
        selectedOption={selectedOption}
        onChange={onChange}
      />,
      { store }
    );

    // the checkbox for the selectedOption is checked
    expect(queryByText(selectedOption).nextSibling.checked).toBeTruthy();

    // both options are displayed
    options.forEach(option => {
      expect(queryByText(option)).toBeTruthy();
    });
  });
});
