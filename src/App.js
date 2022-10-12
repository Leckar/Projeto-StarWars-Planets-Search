import React from 'react';
import DataProvider from './contexts/DataProvider';
import Table from './tests/components/Table';
import './App.css';

function App() {
  return (
    <main>
      <h1>Project: Star Wars Planets - Trybe</h1>
      <DataProvider>
        <Table />
      </DataProvider>
    </main>

  );
}

export default App;
