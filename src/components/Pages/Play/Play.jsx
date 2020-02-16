import React from 'react';
import { Hangman } from './Hangman';
import { Letters } from './Letters';

export const Play = () => (
  <main className="page page--play">
    <Hangman />
    <Letters />
  </main>
);
