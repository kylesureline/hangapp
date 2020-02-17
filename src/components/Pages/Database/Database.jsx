import React, { useState } from 'react';
import { Search } from './Search';

export const Database = () => {
  const [search, setSearch] = useState('');

  return (
    <main className="page page--database">
      <Search value={search} setValue={setSearch} />
    </main>
  );
};
