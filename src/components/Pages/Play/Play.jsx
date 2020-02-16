import React from 'react';
import { Hangman } from './Hangman';
import { Letters } from './Letters';

export const Play = () => (
  <main className="page">
    <Hangman />
    <Letters />
  </main>
);
