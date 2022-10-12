import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../helpers/APIFetch';
import DataContext from './DataContext';

function DataProvider({ children }) {
  const [planetData, setPlanetData] = useState([]);
  const [shouldRender, setRender] = useState(false);
  useEffect(() => {
    const dataFetchFormatter = () => {
      fetchPlanets()
        .then((result) => {
          console.log(result);
          setPlanetData(result);
          setRender(true);
        });
    };
    dataFetchFormatter();
  }, []);

  return (
    <DataContext.Provider value={ { planetData, shouldRender } }>
      { children }
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default DataProvider;
