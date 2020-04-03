import wordBank from "../db/wordBank";
import { withDef } from "../db/withDef";
import { recipes } from "../db/recipes";
import { dogs } from "../db/dogs";
import { cats } from "../db/cats";

export const initialState = {
  dictionary: {
    withoutDef: wordBank,
    withDef
  },
  categories: {
    recipes,
    dogs,
    cats
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
