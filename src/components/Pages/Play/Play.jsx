import React from 'react';
import { Hangman } from './Hangman';
import { Answer } from './Answer';
import { Letters } from './Letters';

export const Play = () => (
  <main className="page page--play">
    <Hangman />
    <Answer />
    <Letters />
  </main>
);
