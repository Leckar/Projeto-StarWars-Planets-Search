import React from 'react';
import DataProvider from './contexts/DataProvider';
import Table from './tests/components/Table';
import './App.css';

function App() {
  return (
    <main>
      <DataProvider>
        <Table />
      </DataProvider>
    </main>

  );
}

export default App;
