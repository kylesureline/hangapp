import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { NotFound } from "./NotFound";

describe("<NotFound />", () => {
  it("matches snapshot", () => {
    expect(toJson(mount(<NotFound />))).toMatchSnapshot();
  });
});
