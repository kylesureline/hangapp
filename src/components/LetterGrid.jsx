import React from 'react';
import LetterGridItem from './LetterGridItem.jsx';

export const LetterGrid = () => (
  <div>
    {
      'abcdefghijklmnopqrstuvwxy'.split('').map((letter) => {
        return <LetterGridItem key={letter} letter={letter} />;
      })
    }
  </div>
);

export default LetterGrid;
