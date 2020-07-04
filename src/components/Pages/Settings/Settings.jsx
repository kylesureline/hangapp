import React from "react";
import { Mode } from "./Mode";
import { Dictionary } from "./Dictionary";
import { Categories } from "./Categories";
import { useSelector, useDispatch } from "react-redux";
import {
  CHANGE_MODE,
  CHANGE_DICTIONARY_SETTINGS,
  CHANGE_CATEGORIES
} from "../../../reducers/actions";
import DocumentTitle from "react-document-title";

export const Settings = () => {
  const { mode, dictionary, categories } = useSelector(state => state.settings);
  const isOver = useSelector(state => state.game.isOver);
  const dispatch = useDispatch();
  const handleModeChange = e => {
    const { value } = e.target;
    dispatch(CHANGE_MODE(value));
  };

  const handleWordsSettings = obj => {
    dispatch(CHANGE_DICTIONARY_SETTINGS(obj));
  };

  const handleCategoriesSettings = category => {
    dispatch(CHANGE_CATEGORIES(category));
  };

  return (
    <DocumentTitle title={`${process.env.REACT_APP_NAME} | Settings`}>
      <main
        className={`page page--settings${
          isOver ? "" : " page--game-is-not-over"
        }`}
      >
        <form>
          <Mode
            options={["dictionary", "categories"]}
            selectedOption={mode}
            onChange={handleModeChange}
          />
          {mode === "dictionary" && (
            <Dictionary
              onChange={handleWordsSettings}
              dictionary={dictionary}
            />
          )}
          {mode === "categories" && (
            <Categories
              onChange={handleCategoriesSettings}
              activeCategories={categories}
              availableCategories={["recipes", "dogs", "cats"]}
            />
          )}
        </form>
      </main>
    </DocumentTitle>
  );
};
