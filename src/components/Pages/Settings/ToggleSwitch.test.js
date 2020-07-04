import React from "react";
import { testRender, configureTestStore } from "../../../tests/testUtils";
import { fireEvent } from "@testing-library/react";
import { ToggleSwitch } from "./ToggleSwitch";

describe("<ToggleSwitch />", () => {
  let store;
  beforeEach(() => {
    store = configureTestStore();
  });
  it("renders checked correctly", () => {
    const onChange = jest.fn();
    const { queryByRole } = testRender(
      <ToggleSwitch checked={true} onChange={onChange} />,
      { store }
    );

    expect(queryByRole("checkbox")).toBeTruthy();

    fireEvent.click(queryByRole("checkbox"));

    expect(onChange).toHaveBeenCalled();
  });
});
