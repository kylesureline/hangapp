import React, { useState } from 'react';
import { Search } from './Search';
import { List } from './List';
import { useSelector } from 'react-redux';
import DocumentTitle from 'react-document-title';

export const Database = () => {
  const [search, setSearch] = useState('');
  const { isOver } = useSelector(state => state.game);

  return (
    <DocumentTitle title={`${process.env.REACT_APP_NAME} | Database`}>
      <main className="page page--database">
        <Search value={search} setValue={setSearch} isOver={isOver} />
        <List search={search} isOver={isOver} />
      </main>
    </DocumentTitle>
  );
};
