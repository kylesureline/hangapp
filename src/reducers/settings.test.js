import { initialState, reducer } from "./settings";
import {
  CHANGE_MODE,
  CHANGE_DICTIONARY_SETTINGS,
  CHANGE_CATEGORIES
} from "./actions";

describe("tests the settings reducer and actions", () => {
  it("should change mode from dictionary to categories and back", () => {
    const newMode = "categories";
    const newState = reducer(initialState, CHANGE_MODE(newMode));
    expect(newState).toEqual({ ...initialState, mode: newMode });

    const originalMode = "dictionary";
    const originalState = reducer(newState, CHANGE_MODE(originalMode));
    expect(originalState).toEqual(initialState);
  });

  it("should change dictionary settings", () => {
    const showWordType = false;
    let state = reducer(
      initialState,
      CHANGE_DICTIONARY_SETTINGS({ showWordType })
    );
    expect(state.dictionary.showWordType).toBe(showWordType);

    const showDefinition = true;
    state = reducer(state, CHANGE_DICTIONARY_SETTINGS({ showDefinition }));
    expect(state.dictionary.showDefinition).toBe(showDefinition);

    const skipWithoutDefinition = false;
    state = reducer(
      state,
      CHANGE_DICTIONARY_SETTINGS({ skipWithoutDefinition })
    );
    expect(state.dictionary.skipWithoutDefinition).toBe(skipWithoutDefinition);

    const minLength = 5;
    state = reducer(state, CHANGE_DICTIONARY_SETTINGS({ minLength }));
    expect(state.dictionary.minLength).toEqual(minLength);
  });

  it("should change categories", () => {
    const addedCategory = "vegetables";
    const newState = reducer(initialState, CHANGE_CATEGORIES(addedCategory));
    // adds it if it's not there
    expect(newState.categories.includes(addedCategory)).toBe(true);

    // removes it if it's there already
    const originalState = reducer(newState, CHANGE_CATEGORIES(addedCategory));
    expect(originalState).toEqual(initialState);

    // shouldn't remove it if it only has one category selected
    expect(originalState.categories).toEqual(initialState.categories);
    const finalState = reducer(originalState, CHANGE_CATEGORIES("recipes"));
    expect(finalState).toEqual(initialState);
  });
});
