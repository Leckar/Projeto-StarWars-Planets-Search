import React from 'react';
import DataProvider from './contexts/DataProvider';
import Table from './components/Table';
import Filters from './components/Filters';
import './App.css';

function App() {
  return (
    <main>
      <h1>Project: Star Wars Planets - Trybe</h1>
      <DataProvider>
        <Filters />
        <Table />
      </DataProvider>
    </main>

  );
}

export default App;
