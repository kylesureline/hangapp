import React, { useState } from 'react';
import { Search } from './Search';
import { List } from './List';

export const Database = () => {
  const [search, setSearch] = useState('');

  return (
    <main className="page page--database">
      <Search value={search} setValue={setSearch} />
      <List search={search} />
    </main>
  );
};
