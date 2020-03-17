import React from 'react';
import { testRender, configureTestStore } from '../tests/testUtils';
import { LoadingIndicator } from './LoadingIndicator';
import {
  UPDATE_WORDS_WITH_DEF,
  UPDATE_CATEGORY
} from '../reducers/actions';

describe('<LoadingIndicator />', () => {
  let store, wrapper;
  beforeEach(() => {
    store = configureTestStore();
    wrapper = testRender(<LoadingIndicator />, { store });
  })
  it('shows loading state', () => {
    expect(wrapper.queryByTitle('Loading...')).toBeTruthy();
    expect(wrapper.queryByTitle('Database loaded')).not.toBeTruthy();
  });

  it('shows loaded state', () => {
    store.dispatch(UPDATE_WORDS_WITH_DEF([...Array(50)].map((_, i) => i)));
    store.dispatch(UPDATE_CATEGORY('recipes', ([...Array(50)].map((_, i) => i))));
    store.dispatch(UPDATE_CATEGORY('dogs', ([...Array(50)].map((_, i) => i))));
    store.dispatch(UPDATE_CATEGORY('cats', ([...Array(50)].map((_, i) => i))));

    expect(wrapper.queryByTitle('Loading...')).not.toBeTruthy();
    expect(wrapper.queryByTitle('Database loaded')).toBeTruthy();
  })
})
